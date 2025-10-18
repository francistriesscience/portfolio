#!/usr/bin/env node
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import satori from "satori"
import sharp from "sharp"
import React from "react"
import matter from "gray-matter"
import readingTime from "reading-time"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CONTENT_DIR = path.join(__dirname, "..", "content", "notebooks")
const OUT_DIR = path.join(__dirname, "..", "public", "og")
const FONTS_DIR = path.join(__dirname, "..", "public", "fonts")

function getMDXFiles() {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"))
}

function getPostData(file) {
  const filePath = path.join(CONTENT_DIR, file)
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data: frontmatter, content } = matter(raw)
  const slug = path.basename(file, ".mdx")

  return {
    slug,
    title: frontmatter.title || "Untitled",
    description: frontmatter.description || "",
    tags: frontmatter.tags || [],
    date: frontmatter.date || new Date().toISOString(),
    authors: frontmatter.authors || [],
    content,
  }
}

async function generateOgImage(post) {
  const outPath = path.join(OUT_DIR, `${post.slug}.png`)
  const width = 1200
  const height = 630

  const georgiaRegular = fs.readFileSync(path.join(FONTS_DIR, "georgia", "georgia.ttf"))
  const georgiaBold = fs.readFileSync(path.join(FONTS_DIR, "georgia", "georgia-bold.ttf"))
  const writerRegular = fs.readFileSync(path.join(FONTS_DIR, "writer", "writer-regular.ttf"))

  const rt = readingTime(post.content || "")
  const readingTimeMinutes = Math.max(1, Math.ceil(rt.minutes || 0))

  async function fetchImageAsDataUrl(url) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
      const contentType = res.headers.get("content-type") || "image/png"
      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      return `data:${contentType};base64,${buffer.toString("base64")}`
    } catch {
      return null
    }
  }

  const authors = Array.isArray(post.authors) ? post.authors : []
  const resolvedAuthors = await Promise.all(
    authors.map(async (author) => {
      if (typeof author === "string") {
        return { name: author }
      }

      const name = author.name || author.title || ""
      let imageUrl = author.imageUrl || author.image || null

      if (imageUrl && typeof imageUrl === "string" && imageUrl.startsWith("http")) {
        const dataUrl = await fetchImageAsDataUrl(imageUrl)
        if (dataUrl) imageUrl = dataUrl
        else imageUrl = null
      }

      return {
        ...author,
        name,
        imageUrl,
      }
    }),
  )

  const jsx = React.createElement(
    "div",
    {
      style: {
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "60px",
        color: "black",
        fontFamily: "Writer, sans-serif",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          width: "100%",
        },
      },
      // Tags
      post.tags.length > 0 &&
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            },
          },
          post.tags.slice(0, 3).map((tag) =>
            React.createElement(
              "span",
              {
                key: tag,
                style: {
                  background: "#f3f4f6",
                  color: "#374151",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "500",
                  textTransform: "uppercase",
                  fontFamily: "Writer, sans-serif",
                },
              },
              tag,
            ),
          ),
        ),
      // Title
      React.createElement(
        "h1",
        {
          style: {
            fontSize: "48px",
            fontWeight: "400",
            lineHeight: "1.2",
            margin: 0,
            color: "#111827",
            maxWidth: "100%",
            fontFamily: "Georgia, serif",
          },
        },
        post.title,
      ),
      // Description
      React.createElement(
        "p",
        {
          style: {
            fontSize: "20px",
            lineHeight: "1.4",
            margin: 0,
            color: "#6b7280",
            maxWidth: "100%",
            fontFamily: "Writer, sans-serif",
          },
        },
        post.description,
      ),
    ),
    // Footer
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "12px",
          width: "100%",
        },
      },
      // Authors
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
          },
        },
        Array.isArray(resolvedAuthors) &&
          resolvedAuthors.map((author, index) => {
            const authorName = typeof author === "string" ? author : author.name
            const authorImage = typeof author === "object" ? author.imageUrl : null

            return React.createElement(
              "div",
              {
                key: authorName || String(index),
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                },
              },
              index > 0 &&
                React.createElement(
                  "span",
                  {
                    style: {
                      color: "#6b7280",
                      fontSize: "18px",
                      fontFamily: "Writer, sans-serif",
                    },
                  },
                  ",",
                ),
              authorImage &&
                React.createElement("img", {
                  src: authorImage,
                  alt: authorName,
                  width: 40,
                  height: 40,
                  style: {
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  },
                }),
              React.createElement(
                "span",
                {
                  style: {
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "#111827",
                    fontFamily: "Writer, sans-serif",
                  },
                },
                authorName,
              ),
            )
          }),
      ),
      // Date and Reading Time
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "16px",
            color: "#6b7280",
            fontFamily: "Writer, sans-serif",
          },
        },
        React.createElement(
          "span",
          null,
          new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        ),
        React.createElement("span", null, "•"),
        React.createElement("span", null, `${readingTimeMinutes} min read`),
      ),
    ),
  )

  // Render to SVG using satori
  const svg = await satori(jsx, {
    width,
    height,
    fonts: [
      {
        name: "Georgia",
        data: georgiaRegular,
        style: "normal",
        weight: 400,
      },
      {
        name: "Georgia",
        data: georgiaBold,
        style: "normal",
        weight: 700,
      },
      {
        name: "Writer",
        data: writerRegular,
        style: "normal",
        weight: 400,
      },
    ],
  })

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer()
  fs.writeFileSync(outPath, pngBuffer)
  return outPath
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true })
  }

  const files = getMDXFiles()
  if (files.length === 0) {
    console.log("No MDX files found in content/notebooks — nothing to do.")
    return
  }

  console.log(`Found ${files.length} notebook(s). Generating OG images...\n`)

  const results = []

  for (const file of files) {
    const post = getPostData(file)
    process.stdout.write(`Generating OG for ${post.slug} ... `)
    try {
      const outPath = await generateOgImage(post)
      console.log(`OK -> ${path.relative(process.cwd(), outPath)}`)
      results.push({ slug: post.slug, ok: true })
    } catch (err) {
      console.log(`ERROR: ${err.message}`)
      results.push({ slug: post.slug, ok: false, error: err.message })
    }
  }

  const okCount = results.filter((r) => r.ok).length
  console.log(`\nDone. ${okCount}/${results.length} images generated.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
