#!/usr/bin/env node
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { execSync } from "child_process"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const NOTEBOOKS_CONTENT_DIR = path.join(__dirname, "..", "content", "notebooks")
const PROJECTS_CONTENT_DIR = path.join(__dirname, "..", "content", "projects")
const NOTEBOOKS_GENERATED_DIR = path.join(__dirname, "..", "lib", "notebooks", "generated")
const PROJECTS_GENERATED_DIR = path.join(__dirname, "..", "lib", "projects", "generated")

function getMDXFiles(contentDir) {
  if (!fs.existsSync(contentDir)) {
    return []
  }
  return fs.readdirSync(contentDir).filter((file) => file.endsWith(".mdx"))
}

function readMDXFile(filePath) {
  const rawContent = fs.readFileSync(filePath, "utf-8")
  return matter(rawContent)
}

function getAllNotebooks(contentDir) {
  const files = getMDXFiles(contentDir)
  return files.map((file) => {
    const filePath = path.join(contentDir, file)
    const { data, content } = readMDXFile(filePath)
    const slug = path.basename(file, ".mdx")

    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)

    const activeDateFromGit = getLastGitCommitDate(filePath)
    const activeDate = activeDateFromGit || getFileMtimeIso(filePath)

    const frontmatterDate = data.publishedDate
      ? new Date(String(data.publishedDate))
      : data.date
        ? new Date(String(data.date))
        : null
    const isPlaceholderFrontmatter =
      frontmatterDate &&
      frontmatterDate.getUTCFullYear() === 2024 &&
      frontmatterDate.getUTCMonth() === 0 &&
      frontmatterDate.getUTCDate() === 1

    const date = data.publishedDate
      ? new Date(String(data.publishedDate)).toISOString()
      : activeDateFromGit
        ? activeDateFromGit
        : frontmatterDate
          ? isPlaceholderFrontmatter
            ? new Date().toISOString()
            : frontmatterDate.toISOString()
          : new Date().toISOString()

    return {
      slug,
      title: data.title || "Untitled",
      banner: data.banner || "",
      ogImage: data.ogImage,
      date,
      description: data.description || "",
      tags: data.tags || [],
      authors: data.authors || [],
      active: typeof data.active === "boolean" ? data.active : false,
      activeDate,
      content,
      readingTime,
      publishedDate: data.publishedDate,
    }
  })
}

function getAllProjects(contentDir) {
  const files = getMDXFiles(contentDir)
  return files.map((file) => {
    const filePath = path.join(contentDir, file)
    const { data, content } = readMDXFile(filePath)
    const slug = path.basename(file, ".mdx")

    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)

    const activeDateFromGit = getLastGitCommitDate(filePath)
    const activeDate = activeDateFromGit || getFileMtimeIso(filePath)

    const frontmatterDateP = data.publishedDate
      ? new Date(String(data.publishedDate))
      : data.date
        ? new Date(String(data.date))
        : null
    const isPlaceholderFrontmatterP =
      frontmatterDateP &&
      frontmatterDateP.getUTCFullYear() === 2024 &&
      frontmatterDateP.getUTCMonth() === 0 &&
      frontmatterDateP.getUTCDate() === 1

    const date = data.publishedDate
      ? new Date(String(data.publishedDate)).toISOString()
      : activeDateFromGit
        ? activeDateFromGit
        : frontmatterDateP
          ? isPlaceholderFrontmatterP
            ? new Date().toISOString()
            : frontmatterDateP.toISOString()
          : new Date().toISOString()

    return {
      slug,
      title: data.title || "Untitled",
      banner: data.banner || "",
      ogImage: data.ogImage,
      date,
      description: data.description || "",
      tags: data.tags || [],
      authors: data.authors || [],
      active: typeof data.active === "boolean" ? data.active : false,
      activeDate,
      content,
      readingTime,
      technologies: data.technologies || [],
      isNotebook: data.isNotebook || false,
      notebook: data.notebook || [],
      isWebsite: data.isWebsite || false,
      website: data.website || [],
      publishedDate: data.publishedDate,
    }
  })
}

function getLastGitCommitDate(filePath) {
  try {
    const cmd = `git log -1 --format=%cI -- ${escapeShellArg(filePath)}`
    const out = execSync(cmd, { encoding: "utf8" }).trim()
    return out || null
  } catch {
    return null
  }
}

function getFileMtimeIso(filePath) {
  try {
    const stat = fs.statSync(filePath)
    return stat.mtime.toISOString()
  } catch {
    return new Date().toISOString()
  }
}

function escapeShellArg(s) {
  return `'${s.replace(/'/g, `\\'`)}'`
}

function sanitizeExportName(slug) {
  const s = slug.replace(/[^a-zA-Z0-9_$]/g, "_")
  if (/^[0-9]/.test(s)) return `p_${s}`
  return s
}

function generateFiles(posts, generatedDir, typeName) {
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true })
  }

  for (const post of posts) {
    const filePath = path.join(generatedDir, `${post.slug}.ts`)
    const fileContents = `// AUTO-GENERATED - DO NOT EDIT
// Generated by: npm run generate
// Date: ${new Date().toISOString()}

import type { ${typeName} } from "../../mdx"

export const ${typeName === "NotebookPost" ? "post" : "project"}: ${typeName} = ${JSON.stringify(post, null, 2)}

export default ${typeName === "NotebookPost" ? "post" : "project"}
`
    fs.writeFileSync(filePath, fileContents, "utf-8")
  }

  const indexPath = path.join(generatedDir, "_index.ts")
  const importLines = posts
    .map((p) => `import ${sanitizeExportName(p.slug)} from "./${p.slug}"`)
    .join("\n")

  const namedLines = posts.map((p) => `${sanitizeExportName(p.slug)}`).join(",\n  ")

  const indexContents = `// AUTO-GENERATED - DO NOT EDIT
// Barrel file for generated ${typeName === "NotebookPost" ? "posts" : "projects"}
// Generated by: npm run generate
// Date: ${new Date().toISOString()}

import type { ${typeName} } from "../../mdx"
${importLines}

export const ${typeName === "NotebookPost" ? "posts" : "projects"}: ${typeName}[] = [
  ${namedLines}
]

export default ${typeName === "NotebookPost" ? "posts" : "projects"}
`

  fs.writeFileSync(indexPath, indexContents, "utf-8")
}

// Generate Notebooks
console.log("Generating notebooks...")
const posts = getAllNotebooks(NOTEBOOKS_CONTENT_DIR)
generateFiles(posts, NOTEBOOKS_GENERATED_DIR, "NotebookPost")
console.log(`Generated ${posts.length} notebook(s)`)

// Generate Projects
console.log("\nGenerating projects...")
const projects = getAllProjects(PROJECTS_CONTENT_DIR)
generateFiles(projects, PROJECTS_GENERATED_DIR, "ProjectPost")
console.log(`Generated ${projects.length} project(s)`)

console.log("\nAll generation complete!")
