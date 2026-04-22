package ogs

import (
	"context"
	"encoding/base64"
	"fmt"
	"html"
	htmltemplate "html/template"
	"net/url"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"

	"portfolio/generator/internal/notes"
)

const (
	siteName        = "Francis Ignacio"
	siteDescription = "Software Engineer and Technical Lead with 4+ years of experience designing and operating scalable backend systems, distributed architectures, and AI-powered products across startups and academia. Proven track record of owning end-to-end delivery, from architecture and cloud infrastructure to observability and growth, migrating legacy stacks, cutting latency, and enabling data-driven decisions for engineering, product, and business teams."
	viewportWidth   = 1200
	viewportHeight  = 630
	readingWPM      = 200
)

type Generator struct {
	workingDir string
}

type noteRecord struct {
	Slug        string
	Frontmatter notes.Frontmatter
	Source      string
	PreviewPath string
}

type renderContext struct {
	SiteName     string
	VariantClass string
	Title        string
	Description  string
	Date         string
	ReadingTime  string
	TagsMarkup   htmltemplate.HTML
	FontFaceCss  htmltemplate.CSS
}

func NewGenerator(workingDir string) *Generator {
	return &Generator{workingDir: workingDir}
}

func (g *Generator) Generate() error {
	ctx := context.Background()

	notesDir := filepath.Join(g.workingDir, "contents", "notes")
	templateFile := filepath.Join(g.workingDir, "templates", "og.html")
	fontDir := filepath.Join(g.workingDir, "public", "fonts", "dm-sans")
	previewRootDir := filepath.Join(g.workingDir, "public", "og", "notes")
	webPublicDir := filepath.Join(g.workingDir, "..", "web", "public")
	siteOgFile := filepath.Join(webPublicDir, "og.webp")
	legacySiteOgPngFile := filepath.Join(webPublicDir, "og.png")

	template, err := htmltemplate.ParseFiles(templateFile)
	if err != nil {
		return fmt.Errorf("Parse og template: %w", err)
	}

	fontFaceCss, err := buildFontFaceCSS(fontDir)
	if err != nil {
		return fmt.Errorf("Build font face css: %w", err)
	}

	records, err := loadNotes(notesDir)
	if err != nil {
		return fmt.Errorf("Load notes: %w", err)
	}

	if err := os.RemoveAll(previewRootDir); err != nil {
		return fmt.Errorf("Clean og output: %w", err)
	}

	if err := os.Remove(siteOgFile); err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("Remove site og: %w", err)
	}

	if err := os.Remove(legacySiteOgPngFile); err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("Remove legacy site og: %w", err)
	}

	if err := os.MkdirAll(previewRootDir, 0o755); err != nil {
		return fmt.Errorf("Create og output dir: %w", err)
	}

	browserExec, err := g.ensureBrowserExecutable(ctx)
	if err != nil {
		return err
	}

	allocatorOptions := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.ExecPath(browserExec),
		chromedp.Headless,
		chromedp.NoFirstRun,
		chromedp.NoDefaultBrowserCheck,
		chromedp.WindowSize(viewportWidth, viewportHeight),
		chromedp.Flag("hide-scrollbars", true),
		chromedp.Flag("disable-gpu", true),
		chromedp.Flag("allow-file-access-from-files", true),
	)

	allocCtx, allocCancel := chromedp.NewExecAllocator(ctx, allocatorOptions...)
	defer allocCancel()

	browserCtx, browserCancel := chromedp.NewContext(allocCtx)
	defer browserCancel()

	if err := g.renderToFile(browserCtx, template, renderContext{
		SiteName:     siteName,
		VariantClass: "variant-site",
		Title:        siteName,
		Description:  siteDescription,
		Date:         "Current",
		ReadingTime:  "Minimal portfolio",
		TagsMarkup:   htmltemplate.HTML(buildTagsMarkup([]string{"Software Engineer", "AI Engineer"})),
		FontFaceCss:  htmltemplate.CSS(fontFaceCss),
	}, siteOgFile, page.CaptureScreenshotFormatWebp); err != nil {
		return fmt.Errorf("Render site og: %w", err)
	}

	for _, record := range records {
		if err := g.renderToFile(browserCtx, template, renderContext{
			SiteName:     siteName,
			VariantClass: "variant-note",
			Title:        record.Frontmatter.Title,
			Description:  record.Frontmatter.Description,
			Date:         formatDate(record.Frontmatter.Date),
			ReadingTime:  estimateReadingTimeMinutes(record.Source),
			TagsMarkup:   htmltemplate.HTML(buildTagsMarkup(tagsForNote(record.Frontmatter.Tags))),
			FontFaceCss:  htmltemplate.CSS(fontFaceCss),
		}, record.PreviewPath, page.CaptureScreenshotFormatPng); err != nil {
			return fmt.Errorf("Render note og %s: %w", record.Slug, err)
		}

		fmt.Printf("%s: %s\n", record.Slug, record.PreviewPath)
	}

	fmt.Println("site: /og.webp")
	return nil
}

func (g *Generator) ensureBrowserExecutable(ctx context.Context) (string, error) {
	if executable, ok := findBrowserExecutable(); ok {
		return executable, nil
	}

	if err := g.runCommand(ctx, "bunx", "playwright", "install", "chromium"); err != nil {
		return "", fmt.Errorf("install playwright browser: %w", err)
	}

	if executable, ok := findBrowserExecutable(); ok {
		return executable, nil
	}

	return "", fmt.Errorf("unable to locate the Playwright Chromium executable")
}

func (g *Generator) runCommand(ctx context.Context, name string, args ...string) error {
	cmd := exec.CommandContext(ctx, name, args...)
	cmd.Dir = g.workingDir
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		return fmt.Errorf("%s %v: %w", name, args, err)
	}

	return nil
}

func (g *Generator) renderToFile(parentCtx context.Context, template *htmltemplate.Template, data renderContext, outputPath string, format page.CaptureScreenshotFormat) error {
	renderedHTML, err := renderTemplate(template, data)
	if err != nil {
		return err
	}

	pageCtx, cancel := chromedp.NewContext(parentCtx)
	defer cancel()

	pageURL := "data:text/html;charset=utf-8," + url.PathEscape(renderedHTML)
	var screenshot []byte

	tasks := chromedp.Tasks{
		chromedp.Navigate(pageURL),
		chromedp.WaitReady("body", chromedp.ByQuery),
		chromedp.Sleep(150 * time.Millisecond),
		chromedp.ActionFunc(func(ctx context.Context) error {
			capture := page.CaptureScreenshot().WithFormat(format)
			if format != page.CaptureScreenshotFormatPng {
				capture = capture.WithQuality(90)
			}

			data, err := capture.Do(ctx)
			if err != nil {
				return err
			}

			screenshot = data
			return nil
		}),
	}

	if err := chromedp.Run(pageCtx, tasks...); err != nil {
		return err
	}

	if err := os.MkdirAll(filepath.Dir(outputPath), 0o755); err != nil {
		return fmt.Errorf("Create og output dir for %s: %w", outputPath, err)
	}

	if err := os.WriteFile(outputPath, screenshot, 0o644); err != nil {
		return fmt.Errorf("Write og file %s: %w", outputPath, err)
	}

	return nil
}

func renderTemplate(template *htmltemplate.Template, data renderContext) (string, error) {
	var builder strings.Builder
	if err := template.Execute(&builder, data); err != nil {
		return "", fmt.Errorf("Execute template: %w", err)
	}

	return builder.String(), nil
}

func loadNotes(notesDir string) ([]noteRecord, error) {
	files, err := notes.ParseDirectory(notesDir)
	if err != nil {
		return nil, err
	}

	records := make([]noteRecord, 0, len(files))
	for _, file := range files {
		records = append(records, noteRecord{
			Slug:        file.Slug,
			Frontmatter: file.Frontmatter,
			Source:      file.Source,
			PreviewPath: filepath.Join("public", "og", "notes", file.Slug+".png"),
		})
	}

	return records, nil
}

func tagsForNote(tags []string) []string {
	if len(tags) == 0 {
		return []string{"No tags"}
	}

	return tags
}

func buildFontFaceCSS(fontDir string) (string, error) {
	latinExtBytes, err := os.ReadFile(filepath.Join(fontDir, "dm-sans-latin-ext.woff2"))
	if err != nil {
		return "", fmt.Errorf("Read latin-ext font: %w", err)
	}

	latinBytes, err := os.ReadFile(filepath.Join(fontDir, "dm-sans-latin.woff2"))
	if err != nil {
		return "", fmt.Errorf("Read latin font: %w", err)
	}

	latinExtDataURL := "data:font/woff2;base64," + toBase64(latinExtBytes)
	latinDataURL := "data:font/woff2;base64," + toBase64(latinBytes)

	return strings.Join([]string{
		"@font-face {",
		"  font-family: DM Sans;",
		"  font-style: normal;",
		"  font-weight: 400;",
		"  font-display: swap;",
		`  src: url("` + latinExtDataURL + `") format("woff2");`,
		"  unicode-range: U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;",
		"}",
		"",
		"@font-face {",
		"  font-family: DM Sans;",
		"  font-style: normal;",
		"  font-weight: 400;",
		"  font-display: swap;",
		`  src: url("` + latinDataURL + `") format("woff2");`,
		"  unicode-range: U+??, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+304, U+308, U+329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;",
		"}",
		"",
		"@font-face {",
		"  font-family: DM Sans;",
		"  font-style: normal;",
		"  font-weight: 500;",
		"  font-display: swap;",
		`  src: url("` + latinExtDataURL + `") format("woff2");`,
		"  unicode-range: U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;",
		"}",
		"",
		"@font-face {",
		"  font-family: DM Sans;",
		"  font-style: normal;",
		"  font-weight: 500;",
		"  font-display: swap;",
		`  src: url("` + latinDataURL + `") format("woff2");`,
		"  unicode-range: U+??, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+304, U+308, U+329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;",
		"}",
		"",
		"@font-face {",
		"  font-family: DM Sans;",
		"  font-style: normal;",
		"  font-weight: 700;",
		"  font-display: swap;",
		`  src: url("` + latinExtDataURL + `") format("woff2");`,
		"  unicode-range: U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;",
		"}",
		"",
		"@font-face {",
		"  font-family: DM Sans;",
		"  font-style: normal;",
		"  font-weight: 700;",
		"  font-display: swap;",
		`  src: url("` + latinDataURL + `") format("woff2");`,
		"  unicode-range: U+??, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+304, U+308, U+329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;",
		"}",
		"",
		"@font-face {",
		"  font-family: DM Sans Fallback;",
		"  src: local(Arial);",
		"  ascent-override: 94.9%;",
		"  descent-override: 29.66%;",
		"  line-gap-override: 0.0%;",
		"  size-adjust: 104.53%;",
		"}",
		"",
		".dm_sans_fallback {",
		"  font-family: DM Sans, DM Sans Fallback;",
		"  font-style: normal;",
		"}",
	}, "\n"), nil
}

func buildTagsMarkup(tags []string) string {
	limited := tags
	if len(limited) > 4 {
		limited = limited[:4]
	}

	var builder strings.Builder
	for _, tag := range limited {
		builder.WriteString(`<span class="tag">`)
		builder.WriteString(html.EscapeString(tag))
		builder.WriteString(`</span>`)
	}

	return builder.String()
}

func formatDate(date string) string {
	parsed := time.Time{}
	if t, err := time.Parse(time.RFC3339, date); err == nil {
		parsed = t
	} else if t, err := time.Parse("2006-01-02", date); err == nil {
		parsed = t
	} else {
		return date
	}

	return parsed.UTC().Format("Jan 2, 2006")
}

func estimateReadingTimeMinutes(source string) string {
	normalizedSource := strings.NewReplacer(
		"```", " ",
		"`", " ",
	).Replace(source)
	normalizedSource = stripMarkdownArtifacts(normalizedSource)

	wordCount := len(strings.Fields(normalizedSource))
	if wordCount == 0 {
		wordCount = 1
	}

	return fmt.Sprintf("%d min read", max(1, (wordCount+readingWPM-1)/readingWPM))
}

func stripMarkdownArtifacts(source string) string {
	replacers := []struct{ old, new string }{
		{"![[", " "},
		{"[", " "},
		{"](", " "},
		{")", " "},
		{"<", " "},
		{">", " "},
		{"#", " "},
		{"*", " "},
		{"_", " "},
		{"~", " "},
		{"-", " "},
	}

	result := source
	for _, repl := range replacers {
		result = strings.ReplaceAll(result, repl.old, repl.new)
	}

	return result
}

func toBase64(data []byte) string {
	return base64.StdEncoding.EncodeToString(data)
}

func findBrowserExecutable() (string, bool) {
	candidates := browserSearchRoots()
	for _, root := range candidates {
		found := ""
		filepath.WalkDir(root, func(path string, entry os.DirEntry, err error) error {
			if err != nil || found != "" {
				return nil
			}

			if entry.IsDir() {
				return nil
			}

			if entry.Name() != "chrome-headless-shell" {
				return nil
			}

			info, err := entry.Info()
			if err != nil {
				return nil
			}

			if info.Mode()&0o111 == 0 {
				return nil
			}

			found = path
			return nil
		})

		if found != "" {
			return found, true
		}
	}

	return "", false
}

func browserSearchRoots() []string {
	roots := make([]string, 0, 3)

	if cacheDir, err := os.UserCacheDir(); err == nil {
		roots = append(roots, filepath.Join(cacheDir, "ms-playwright"))
	}

	if homeDir, err := os.UserHomeDir(); err == nil {
		roots = append(roots,
			filepath.Join(homeDir, ".cache", "ms-playwright"),
			filepath.Join(homeDir, "Library", "Caches", "ms-playwright"),
		)
	}

	return roots
}

func max(left, right int) int {
	if left > right {
		return left
	}

	return right
}
