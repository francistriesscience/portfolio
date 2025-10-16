import type { BlogPost } from "../mdx"
import * as mdxModule from "../mdx"
import { BLOG_POSTS } from "./generated"

// In development, use fs to read MDX files for instant updates
// In production, use generated static data
const isDev = process.env.NODE_ENV === "development"

export function getAllPosts(limit?: number): BlogPost[] {
  if (isDev) {
    // Development: read from filesystem for instant updates
    return mdxModule.getAllPosts(limit)
  }

  // Production: use static generated data
  const sortedPosts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
  return limit ? sortedPosts.slice(0, limit) : sortedPosts
}
