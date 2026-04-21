import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import matter from "gray-matter"
import { chromium } from "playwright"

import { noteFrontmatterSchema, type NoteFrontmatter } from "@/lib/schema/note"

const notesDirectory = new URL("../contents/notes/", import.meta.url)
const templateFile = new URL("../templates/og.html", import.meta.url)
const publicDirectory = new URL("../public/", import.meta.url)
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

async function findFirstMatchingFile(rootDirectory: URL, pattern: RegExp): Promise<URL | null> {
  try {
    const entries = await fs.readdir(rootDirectory, { withFileTypes: true })

    for (const entry of entries) {
      const entryUrl = new URL(entry.name, rootDirectory)

      if (entry.isDirectory()) {
        const nestedMatch = await findFirstMatchingFile(entryUrl, pattern)
        if (nestedMatch) {
          return nestedMatch
        }
        continue
      }

      if (entry.isFile() && pattern.test(entry.name)) {
        return entryUrl
      }
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null
    }
    throw error
  }

  return null
}

async function getFontFaceCss() {
  const candidateDirectories = [
    new URL("../.next/dev/static/chunks/", import.meta.url),
    new URL("../.next/static/chunks/", import.meta.url),
  ]

  let fontCssFile: URL | null = null

  for (const directory of candidateDirectories) {
    fontCssFile =
      (await findFirstMatchingFile(directory, /dm_sans.*\.css$/)) ??
      (await findFirstMatchingFile(directory, /font_google_dm_sans.*\.css$/))

    if (fontCssFile) {
      break
    }
  }

  if (!fontCssFile) {
    throw new Error("Unable to locate the DM Sans font CSS emitted by Next.js")
  }

  const css = await fs.readFile(fontCssFile, "utf8")
  const fontCssDirectory = new URL(".", fontCssFile)
  const assetUrls = [...css.matchAll(/url\((["']?)([^)"']+)\1\)/g)]

  let inlinedCss = css

  for (const assetUrl of assetUrls) {
    const rawAssetPath = assetUrl[2] ?? ""
    if (!rawAssetPath.startsWith("../media/")) {
      continue
    }

    const assetFile = new URL(rawAssetPath, fontCssDirectory)
    const assetBuffer = await fs.readFile(assetFile)
    const mimeType = rawAssetPath.endsWith(".woff2") ? "font/woff2" : "font/woff"
    const dataUrl = `data:${mimeType};base64,${assetBuffer.toString("base64")}`
    inlinedCss = inlinedCss.replace(assetUrl[0], `url("${dataUrl}")`)
  }

  return inlinedCss.replace(/\/\*# sourceMappingURL=.*?\*\//s, "")
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
