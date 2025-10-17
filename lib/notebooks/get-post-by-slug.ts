import type { NotebookPost } from "../mdx"
import * as mdxModule from "../mdx"
import { NOTEBOOK_POSTS } from "./generated"

const isDev = process.env.NODE_ENV === "development"

export function getPostBySlug(slug: string): NotebookPost | null {
  if (isDev) {
    return mdxModule.getPostBySlug(slug)
  }

  return NOTEBOOK_POSTS.find((post) => post.slug === slug) || null
}
