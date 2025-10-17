import type { NotebookPost } from "../mdx"
import * as mdxModule from "../mdx"
import { NOTEBOOK_POSTS } from "./generated"

const isDev = process.env.NODE_ENV === "development"

export function getAllPosts(limit?: number): NotebookPost[] {
  if (isDev) {
    return mdxModule.getAllPosts(limit)
  }

  const sortedPosts = [...NOTEBOOK_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
  return limit ? sortedPosts.slice(0, limit) : sortedPosts
}
