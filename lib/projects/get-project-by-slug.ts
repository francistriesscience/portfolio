import type { ProjectPost } from "../mdx"
import * as mdxModule from "../mdx"
import { projects as PROJECT_POSTS } from "./generated/_index"

const isDev = process.env.NODE_ENV === "development"

export function getProjectBySlug(slug: string): ProjectPost | null {
  if (isDev) {
    return mdxModule.getProjectBySlug(slug)
  }

  return PROJECT_POSTS.find((project) => project.slug === slug) || null
}
