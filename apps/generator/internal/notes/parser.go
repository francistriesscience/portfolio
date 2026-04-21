package notes

import (
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"gopkg.in/yaml.v3"
)

func ParseDirectory(dir string) ([]File, error) {
	entries, err := os.ReadDir(dir)
	if err != nil {
		return nil, fmt.Errorf("Read notes directory: %w", err)
	}

	files := make([]File, 0, len(entries))
	for _, entry := range entries {
		if entry.IsDir() || !strings.HasSuffix(entry.Name(), ".mdx") {
			continue
		}

		file, err := ParseFile(filepath.Join(dir, entry.Name()))
		if err != nil {
			return nil, err
		}

		files = append(files, file)
	}

	sort.Slice(files, func(i, j int) bool {
		return files[i].Slug < files[j].Slug
	})

	return files, nil
}

func ParseFile(path string) (File, error) {
	rawBytes, err := os.ReadFile(path)
	if err != nil {
		return File{}, fmt.Errorf("Read note file %s: %w", path, err)
	}

	raw := string(rawBytes)
	fmBody, source, err := splitFrontmatter(raw)
	if err != nil {
		return File{}, fmt.Errorf("Parse frontmatter %s: %w", path, err)
	}

	var frontmatter Frontmatter
	if err := yaml.Unmarshal([]byte(fmBody), &frontmatter); err != nil {
		return File{}, fmt.Errorf("Unmarshal frontmatter %s: %w", path, err)
	}

	if frontmatter.Tags == nil {
		frontmatter.Tags = []string{}
	}

	return File{
		Slug:        strings.TrimSuffix(filepath.Base(path), filepath.Ext(path)),
		Frontmatter: frontmatter,
		Source:      source,
	}, nil
}

func splitFrontmatter(raw string) (string, string, error) {
	lines := strings.Split(raw, "\n")
	if len(lines) < 3 {
		return "", "", fmt.Errorf("Note file is too short")
	}

	if strings.TrimSpace(strings.TrimPrefix(lines[0], "\ufeff")) != "---" {
		return "", "", fmt.Errorf("Missing frontmatter start delimiter")
	}

	end := -1
	for i := 1; i < len(lines); i++ {
		if strings.TrimSpace(lines[i]) == "---" {
			end = i
			break
		}
	}

	if end == -1 {
		return "", "", fmt.Errorf("Missing frontmatter end delimiter")
	}

	bodyStart := end + 1
	if bodyStart > len(lines) {
		bodyStart = len(lines)
	}

	frontmatter := strings.Join(lines[1:end], "\n")
	source := strings.Join(lines[bodyStart:], "\n")

	if strings.TrimSpace(source) == "" {
		return "", "", fmt.Errorf("Missing note body")
	}

	return frontmatter, source, nil
}
