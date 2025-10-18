#!/usr/bin/env node
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CONTENT_DIR = path.join(__dirname, "..", "content", "notebooks")
const OUT_DIR = path.join(__dirname, "..", "public", "og")
const DEFAULT_HOST = process.env.OG_HOST || "http://localhost:3000"

function getMDXFiles() {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"))
}

async function fetchWithTimeout(url, timeoutMs = 20000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(id)
    return res
  } catch (err) {
    clearTimeout(id)
    throw err
  }
}

async function main() {
  const files = getMDXFiles()
  if (files.length === 0) {
    console.log("No MDX files found in content/notebooks — nothing to do.")
    return
  }

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  console.log(`Generating OG images by fetching ${DEFAULT_HOST}/api/notebooks/:slug/og`)

  const results = []

  for (const file of files) {
    const slug = path.basename(file, ".mdx")
    const url = `${DEFAULT_HOST}/api/notebooks/${slug}/og`
    const outPathPng = path.join(OUT_DIR, `${slug}.png`)
    const outPathWebp = path.join(OUT_DIR, `${slug}.webp`)

    try {
      process.stdout.write(`Fetching ${slug} ... `)
      const res = await fetchWithTimeout(url, 20000)
      if (!res.ok) {
        console.log(`FAILED (${res.status} ${res.statusText})`)
        results.push({ slug, ok: false, status: res.status })
        continue
      }
      const ab = await res.arrayBuffer()
      const buf = Buffer.from(ab)

      try {
        const sharp = await import("sharp")
        const webpBuf = await sharp.default(buf).webp({ quality: 80 }).toBuffer()
        fs.writeFileSync(outPathWebp, webpBuf)
        console.log(`OK -> ${path.relative(process.cwd(), outPathWebp)}`)
      } catch {
        fs.writeFileSync(outPathPng, buf)
        console.log(
          `OK (png saved) -> ${path.relative(process.cwd(), outPathPng)} (install 'sharp' to auto-convert to .webp)`,
        )
      }
      results.push({ slug, ok: true })
    } catch (err) {
      console.log(`ERROR (${err && err.message ? err.message : err})`)
      results.push({ slug, ok: false, error: String(err) })
    }
  }

  const okCount = results.filter((r) => r.ok).length
  console.log(`\nDone. ${okCount}/${results.length} images generated.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
