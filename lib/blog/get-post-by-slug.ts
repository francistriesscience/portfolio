import type { BlogPost } from "../mdx"
import * as mdxModule from "../mdx"
import { BLOG_POSTS } from "./generated"

// In development, use fs to read MDX files for instant updates
// In production, use generated static data
const isDev = process.env.NODE_ENV === "development"

export function getPostBySlug(slug: string): BlogPost | null {
  if (isDev) {
    // Development: read from filesystem for instant updates
    return mdxModule.getPostBySlug(slug)
  }

  // Production: use static generated data
  return BLOG_POSTS.find((post) => post.slug === slug) || null
}
