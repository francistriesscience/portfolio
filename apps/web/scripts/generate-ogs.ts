import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import matter from "gray-matter"
import { chromium } from "playwright"

import { noteFrontmatterSchema, type NoteFrontmatter } from "@/lib/schema/note"

const notesDirectory = new URL("../contents/notes/", import.meta.url)
const templateFile = new URL("../templates/og.html", import.meta.url)
const publicDirectory = new URL("../public/", import.meta.url)
const fontDirectory = new URL("../public/fonts/dm-sans/", import.meta.url)
const fontLatinExtFile = new URL("dm-sans-latin-ext.woff2", fontDirectory)
const fontLatinFile = new URL("dm-sans-latin.woff2", fontDirectory)
const ogRootDirectory = new URL("../public/og/", import.meta.url)
const noteOgDirectory = new URL("../public/og/notes/", import.meta.url)
const legacySiteOgPngFile = new URL("../public/og.png", import.meta.url)
const siteOgFile = new URL("../public/og.webp", import.meta.url)

const SITE_NAME = "Francis Ignacio"
const SITE_DESCRIPTION =
  "Software Engineer and Technical Lead with 4+ years of experience designing and operating scalable backend systems, distributed architectures, and AI-powered products across startups and academia. Proven track record of owning end-to-end delivery, from architecture and cloud infrastructure to observability and growth, migrating legacy stacks, cutting latency, and enabling data-driven decisions for engineering, product, and business teams."
const VIEWPORT = { width: 1200, height: 630 }

type OgRecord = {
  slug: string
  frontmatter: NoteFrontmatter
  source: string
  ogPath: string
}

type RenderContext = {
  siteName: string
  variantClass: string
  title: string
  description: string
  date: string
  readingTime: string
  tagsMarkup: string
  fontFaceCss: string
}

function getSlugFromFileName(fileName: string) {
  return path.basename(fileName, path.extname(fileName))
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function getOutputFileUrl(assetPath: string) {
  const normalizedPath = assetPath.startsWith("http") ? new URL(assetPath).pathname : assetPath

  return new URL(normalizedPath.replace(/^\/+/, ""), publicDirectory)
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date))
}

function estimateReadingTimeMinutes(source: string) {
  const normalizedSource = source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~\-]+/g, " ")

  const wordCount = normalizedSource.trim().split(/\s+/).filter(Boolean).length

  return `${Math.max(1, Math.ceil(Math.max(1, wordCount) / 200))} min read`
}

function buildTagsMarkup(tags: string[]) {
  return tags
    .slice(0, 4)
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("")
}

async function getFontFaceCss() {
  const [latinExtBuffer, latinBuffer] = await Promise.all([
    fs.readFile(fontLatinExtFile),
    fs.readFile(fontLatinFile),
  ])

  const latinExtDataUrl = `data:font/woff2;base64,${latinExtBuffer.toString("base64")}`
  const latinDataUrl = `data:font/woff2;base64,${latinBuffer.toString("base64")}`

  return [
    "@font-face {",
    "  font-family: DM Sans;",
    "  font-style: normal;",
    "  font-weight: 400;",
    "  font-display: swap;",
    `  src: url("${latinExtDataUrl}") format("woff2");`,
    "  unicode-range: U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;",
    "}",
    "",
    "@font-face {",
    "  font-family: DM Sans;",
    "  font-style: normal;",
    "  font-weight: 400;",
    "  font-display: swap;",
    `  src: url("${latinDataUrl}") format("woff2");`,
    "  unicode-range: U+??, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+304, U+308, U+329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;",
    "}",
    "",
    "@font-face {",
    "  font-family: DM Sans;",
    "  font-style: normal;",
    "  font-weight: 500;",
    "  font-display: swap;",
    `  src: url("${latinExtDataUrl}") format("woff2");`,
    "  unicode-range: U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;",
    "}",
    "",
    "@font-face {",
    "  font-family: DM Sans;",
    "  font-style: normal;",
    "  font-weight: 500;",
    "  font-display: swap;",
    `  src: url("${latinDataUrl}") format("woff2");`,
    "  unicode-range: U+??, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+304, U+308, U+329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;",
    "}",
    "",
    "@font-face {",
    "  font-family: DM Sans;",
    "  font-style: normal;",
    "  font-weight: 700;",
    "  font-display: swap;",
    `  src: url("${latinExtDataUrl}") format("woff2");`,
    "  unicode-range: U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;",
    "}",
    "",
    "@font-face {",
    "  font-family: DM Sans;",
    "  font-style: normal;",
    "  font-weight: 700;",
    "  font-display: swap;",
    `  src: url("${latinDataUrl}") format("woff2");`,
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
  ].join("\n")
}

function applyTemplate(template: string, context: RenderContext) {
  return template.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (_, key: string) => {
    const value = context[key as keyof RenderContext]
    if (key === "tagsMarkup" || key === "fontFaceCss") {
      return typeof value === "string" ? value : ""
    }

    return typeof value === "string" ? escapeHtml(value) : ""
  })
}

async function getGeneratedNotes(): Promise<OgRecord[]> {
  const entries = await fs.readdir(notesDirectory, { withFileTypes: true })
  const noteFileNames = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right))

  return Promise.all(
    noteFileNames.map(async (fileName) => {
      const raw = await fs.readFile(new URL(fileName, notesDirectory), "utf8")
      const { data } = matter(raw)
      const frontmatter = noteFrontmatterSchema.parse(data)
      const slug = getSlugFromFileName(fileName)
      const ogPath = frontmatter.og ?? `/og/notes/${slug}.webp`

      return {
        slug,
        frontmatter,
        source: raw,
        ogPath,
      }
    }),
  )
}

async function removeGeneratedAssets() {
  await fs.rm(ogRootDirectory, { recursive: true, force: true })
  await fs.rm(siteOgFile, { force: true })
  await fs.rm(legacySiteOgPngFile, { force: true })
  await fs.mkdir(noteOgDirectory, { recursive: true })
}

function getSiteContext(fontFaceCss: string): RenderContext {
  return {
    siteName: SITE_NAME,
    variantClass: "variant-site",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    date: "Current",
    readingTime: "Minimal portfolio",
    tagsMarkup: buildTagsMarkup(["Software Engineer", "AI Engineer"]),
    fontFaceCss,
  }
}

function getNoteContext(note: OgRecord, fontFaceCss: string): RenderContext {
  const tags = note.frontmatter.tags.length > 0 ? note.frontmatter.tags : ["No tags"]

  return {
    siteName: SITE_NAME,
    variantClass: "variant-note",
    title: note.frontmatter.title,
    description: note.frontmatter.description,
    date: formatDate(note.frontmatter.date),
    readingTime: estimateReadingTimeMinutes(note.source),
    tagsMarkup: buildTagsMarkup(tags),
    fontFaceCss,
  }
}

async function renderImage(
  page: import("playwright").Page,
  template: string,
  context: RenderContext,
  outputPath: URL,
) {
  const html = applyTemplate(template, context)
  await page.setContent(html, { waitUntil: "load" })
  const session = await page.context().newCDPSession(page)
  const { data } = await session.send("Page.captureScreenshot", {
    format: "webp",
    quality: 90,
    fromSurface: true,
    captureBeyondViewport: false,
  })

  await fs.writeFile(fileURLToPath(outputPath), Buffer.from(data, "base64"))
}

async function main() {
  const template = await fs.readFile(templateFile, "utf8")
  const fontFaceCss = await getFontFaceCss()
  const notes = await getGeneratedNotes()

  await removeGeneratedAssets()

  const browser = await chromium.launch({ headless: true })

  try {
    const page = await browser.newPage({
      viewport: VIEWPORT,
      deviceScaleFactor: 2,
    })

    await renderImage(page, template, getSiteContext(fontFaceCss), siteOgFile)

    for (const note of notes) {
      const outputPath = getOutputFileUrl(note.ogPath)
      await renderImage(page, template, getNoteContext(note, fontFaceCss), outputPath)
      console.log(`${note.slug}: ${note.ogPath}`)
    }

    console.log(`site: /og.webp`)
  } finally {
    await browser.close()
  }
}

await main()
