import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  authors: Array<{
    name: string
    url: string
    imageUrl: string
  }>
  content: string
  readingTime: number
}

const resolveContentDir = () => {
  const possiblePaths = [
    path.join(process.cwd(), "content/blog"),
    path.join(process.cwd(), "..", "content/blog"),
    path.join(__dirname, "..", "content/blog"),
    path.join(__dirname, "..", "..", "content/blog"),
    path.join(__dirname, "../../../content/blog"),
    "./content/blog",
    "../content/blog",
  ]

  for (const dir of possiblePaths) {
    if (fs.existsSync(dir)) {
      console.log(`[MDX] Found content directory at: ${dir}`)
      return dir
    }
  }

  console.error(`[MDX] Could not find content directory. Tried:`, possiblePaths)
  return path.join(process.cwd(), "content/blog")
}

const CONTENT_DIR = resolveContentDir()

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

function getMDXData(dir: string): BlogPost[] {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { data, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))

    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      description: data.description || "",
      tags: data.tags || [],
      authors: data.authors || [],
      content,
      readingTime,
    }
  })
}

export function getAllPosts(limit?: number): BlogPost[] {
  const posts = getMDXData(CONTENT_DIR)
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return limit ? sortedPosts.slice(0, limit) : sortedPosts
}

export function getPostBySlug(slug: string): BlogPost | null {
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
