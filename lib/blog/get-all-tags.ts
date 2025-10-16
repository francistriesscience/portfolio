import * as mdxModule from "../mdx"
import { BLOG_POSTS } from "./generated"

// In development, use fs to read MDX files for instant updates
// In production, use generated static data
const isDev = process.env.NODE_ENV === "development"

export function getAllTags(): string[] {
  if (isDev) {
    // Development: read from filesystem for instant updates
    return mdxModule.getAllTags()
  }

  // Production: use static generated data
  const tags = new Set<string>()
  BLOG_POSTS.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}
