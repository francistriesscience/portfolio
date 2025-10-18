import type { ProjectPost } from "../mdx"
import * as mdxModule from "../mdx"
import { projects as PROJECT_POSTS } from "./generated/_index"

const isDev = process.env.NODE_ENV === "development"

export function getAllProjects(limit?: number): ProjectPost[] {
  if (isDev) {
    return mdxModule.getAllProjects(limit)
  }

  const sortedProjects = [...PROJECT_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
  return limit ? sortedProjects.slice(0, limit) : sortedProjects
}
