import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  author: string
  content: string
  readingTime: number
}

const CONTENT_DIR = path.join(process.cwd(), "content/blog")

export async function getAllPosts(limit?: number): Promise<BlogPost[]> {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  try {
    const files = fs.readdirSync(CONTENT_DIR)
    const posts: BlogPost[] = []

    for (const file of files) {
      if (file.endsWith(".mdx")) {
        const post = await getPostBySlug(file.replace(".mdx", ""))
        if (post) {
          posts.push(post)
        }
      }
    }

    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )

    return limit ? sortedPosts.slice(0, limit) : sortedPosts
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, "utf8")

    const { data, content } = matter(fileContent)

    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)

    const post = {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      description: data.description || "",
      tags: data.tags || [],
      author: data.author || "Anonymous",
      content,
      readingTime,
    }

    return post
  } catch {
    return null
  }
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}
