import type { ProjectPost } from "../mdx"
import * as mdxModule from "../mdx"
import { projects as PROJECT_POSTS } from "./generated/_index"

const isDev = process.env.NODE_ENV === "development"

export function getAllProjectTags(): string[] {
  if (isDev) {
    return mdxModule.getAllProjectTags()
  }

  const tags = new Set<string>()

  PROJECT_POSTS.forEach((project: ProjectPost) => {
    project.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}
