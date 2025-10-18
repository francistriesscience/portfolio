import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import matter from "gray-matter"

export interface NotebookPost {
  slug: string
  title: string
  date: string
  description: string
  banner?: string
  tags: string[]
  authors: Array<{
    name: string
    url: string
    imageUrl: string
  }>
  content: string
  readingTime: number
  active?: boolean
  activeDate?: string
  ogImage?: string
}

export interface ProjectPost {
  slug: string
  title: string
  date: string
  description: string
  banner?: string
  tags: string[]
  authors: Array<{
    name: string
    url: string
    imageUrl: string
  }>
  content: string
  readingTime: number
  active?: boolean
  activeDate?: string
  ogImage?: string
  technologies: Array<{
    name: string
    icon?: string
  }>
}

const resolveContentDir = () => {
  const possiblePaths = [
    path.join(process.cwd(), "content/notebooks"),
    path.join(process.cwd(), "..", "content/notebooks"),
    path.join(__dirname, "..", "content/notebooks"),
    path.join(__dirname, "..", "..", "content/notebooks"),
    path.join(__dirname, "../../../content/notebooks"),
    "./content/notebooks",
    "../content/notebooks",
  ]

  for (const dir of possiblePaths) {
    if (fs.existsSync(dir)) {
      return dir
    }
  }

  return path.join(process.cwd(), "content/notebooks")
}

const resolveProjectsDir = () => {
  const possiblePaths = [
    path.join(process.cwd(), "content/projects"),
    path.join(process.cwd(), "..", "content/projects"),
    path.join(__dirname, "..", "content/projects"),
    path.join(__dirname, "..", "..", "content/projects"),
    path.join(__dirname, "../../../content/projects"),
    "./content/projects",
    "../content/projects",
  ]

  for (const dir of possiblePaths) {
    if (fs.existsSync(dir)) {
      return dir
    }
  }

  return path.join(process.cwd(), "content/projects")
}

const CONTENT_DIR = resolveContentDir()
const PROJECTS_DIR = resolveProjectsDir()
const GENERATED_DIR = path.join(__dirname, "notebooks", "generated")
const PROJECTS_GENERATED_DIR = path.join(__dirname, "projects", "generated")

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return []
  }
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx")
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8")
  return matter(rawContent)
}

function getMDXData(dir: string): NotebookPost[] {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { data, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))

    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)

    const fullPath = path.join(dir, file)
    const activeDateFromGit = getLastGitCommitDate(fullPath)
    const activeDate = activeDateFromGit ?? getFileMtimeIso(fullPath)

    return {
      slug,
      title: data.title || "Untitled",
      banner: data.banner || "",
      ogImage: data.ogImage || "",
      date: data.date || new Date().toISOString(),
      description: data.description || "",
      tags: data.tags || [],
      authors: data.authors || [],
      active: typeof data.active === "boolean" ? data.active : false,
      activeDate,
      content,
      readingTime,
    }
  })
}

function getMDXDataForProjects(dir: string): ProjectPost[] {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { data, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))

    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)

    const fullPath = path.join(dir, file)
    const activeDateFromGit = getLastGitCommitDate(fullPath)
    const activeDate = activeDateFromGit ?? getFileMtimeIso(fullPath)

    return {
      slug,
      title: data.title || "Untitled",
      banner: data.banner || "",
      ogImage: data.ogImage || "",
      date: data.date || new Date().toISOString(),
      description: data.description || "",
      tags: data.tags || [],
      authors: data.authors || [],
      active: typeof data.active === "boolean" ? data.active : false,
      activeDate,
      content,
      readingTime,
      technologies: data.technologies || [],
    }
  })
}

function getLastGitCommitDate(filePath: string): string | null {
  try {
    const cmd = `git log -1 --format=%cI -- ${escapeShellArg(filePath)}`
    const out = execSync(cmd, { encoding: "utf8" }).trim()
    if (out) return out
    return null
  } catch {
    return null
  }
}

function getFileMtimeIso(filePath: string): string {
  try {
    const stat = fs.statSync(filePath)
    return stat.mtime.toISOString()
  } catch {
    return new Date().toISOString()
  }
}

function escapeShellArg(s: string) {
  return `'${s.replace(/'/g, `'\\''`)}'`
}

function readGeneratedPosts(): NotebookPost[] | null {
  try {
    if (!fs.existsSync(GENERATED_DIR)) return null
    const files = fs
      .readdirSync(GENERATED_DIR)
      .filter((f) => f.endsWith(".ts") && f !== "_index.ts")
    const posts = []
    for (const file of files) {
      const full = path.join(GENERATED_DIR, file)
      const txt = fs.readFileSync(full, "utf-8")
      const m =
        txt.match(/export const post: [^=]+ = (\{[\s\S]*\})\n\nexport default post/) ||
        txt.match(/export const post = (\{[\s\S]*\})\n\nexport default post/)
      if (m && m[1]) {
        try {
          const obj = JSON.parse(m[1])
          posts.push(obj)
        } catch {}
      }
    }
    return posts.length ? (posts as NotebookPost[]) : null
  } catch {
    return null
  }
}

export function getAllPosts(limit?: number): NotebookPost[] {
  const generated = readGeneratedPosts()
  const posts = generated ?? getMDXData(CONTENT_DIR)
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return limit ? sortedPosts.slice(0, limit) : sortedPosts
}

export function getPostBySlug(slug: string): NotebookPost | null {
  const generated = readGeneratedPosts()
  if (generated) {
    return generated.find((p) => p.slug === slug) || null
  }
  const posts = getMDXData(CONTENT_DIR)
  return posts.find((post) => post.slug === slug) || null
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}

// ============================================
// Project Functions
// ============================================

function readGeneratedProjects(): ProjectPost[] | null {
  try {
    if (!fs.existsSync(PROJECTS_GENERATED_DIR)) return null
    const files = fs
      .readdirSync(PROJECTS_GENERATED_DIR)
      .filter((f) => f.endsWith(".ts") && f !== "_index.ts")
    const projects = []
    for (const file of files) {
      const full = path.join(PROJECTS_GENERATED_DIR, file)
      const txt = fs.readFileSync(full, "utf-8")
      const m =
        txt.match(/export const project: [^=]+ = (\{[\s\S]*\})\n\nexport default project/) ||
        txt.match(/export const project = (\{[\s\S]*\})\n\nexport default project/)
      if (m && m[1]) {
        try {
          const obj = JSON.parse(m[1])
          projects.push(obj)
        } catch {}
      }
    }
    return projects.length ? (projects as ProjectPost[]) : null
  } catch {
    return null
  }
}

export function getAllProjects(limit?: number): ProjectPost[] {
  const generated = readGeneratedProjects()
  const projects = generated ?? getMDXDataForProjects(PROJECTS_DIR)
  const sortedProjects = projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
  return limit ? sortedProjects.slice(0, limit) : sortedProjects
}

export function getProjectBySlug(slug: string): ProjectPost | null {
  const generated = readGeneratedProjects()
  if (generated) {
    return generated.find((p) => p.slug === slug) || null
  }
  const projects = getMDXDataForProjects(PROJECTS_DIR)
  return projects.find((project) => project.slug === slug) || null
}

export function getAllProjectTags(): string[] {
  const projects = getAllProjects()
  const tags = new Set<string>()

  projects.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}
