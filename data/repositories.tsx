export interface Repository {
  name: string
  link: string
  description: string
  date: string
  tags: string[]
}

export const repositories: Repository[] = [
  {
    name: "francistriesscience/leetcode",
    link: "https://github.com/francistriesscience/leetcode",
    description:
      "Collection of LeetCode solutions and algorithmic patterns. This repository tracks my journey through data structures and complexity analysis, focusing on implementations for technical interview preparation.",
    date: "2026-01-01",
    tags: ["Algorithms", "Data Structures"],
  },
]
