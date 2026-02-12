export interface Repository {
  name: string
  link: string
  description: string
  date: string
  tags: string[]
}

export const repositories: Repository[] = [
  {
    name: "francistriesscience/deep-ml",
    link: "https://github.com/francistriesscience/deep-ml",
    description:
      "solution — Solutions to machine learning and data science coding challenges from Deep-ML, covering fundamentals to advanced topics across linear algebra, classical ML, deep learning, NLP, and computer vision.",
    date: "2026-02-12",
    tags: ["Machine Learning", "Data Science"],
  },
  {
    name: "francistriesscience/leetcode",
    link: "https://github.com/francistriesscience/leetcode",
    description:
      "solution — Collection of LeetCode solutions and algorithmic patterns. This repository tracks my journey through data structures and complexity analysis, focusing on implementations for technical interview preparation.",
    date: "2026-01-01",
    tags: ["Algorithms", "Data Structures"],
  },
]
