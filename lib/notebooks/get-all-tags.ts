import * as mdxModule from "../mdx"
import { NOTEBOOK_POSTS } from "./generated"

const isDev = process.env.NODE_ENV === "development"

export function getAllTags(): string[] {
  if (isDev) {
    return mdxModule.getAllTags()
  }

  const tags = new Set<string>()
  NOTEBOOK_POSTS.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}
