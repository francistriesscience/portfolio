import type { NotebookPost } from "../mdx"
import * as mdxModule from "../mdx"
import { posts as NOTEBOOK_POSTS } from "./generated/_index"

const isDev = process.env.NODE_ENV === "development"

export function getNotebookBySlug(slug: string): NotebookPost | null {
  if (isDev) {
    return mdxModule.getPostBySlug(slug)
  }

  return NOTEBOOK_POSTS.find((post) => post.slug === slug) || null
}
