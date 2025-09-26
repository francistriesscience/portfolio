export type Header = {
  name: string
  subtitle: string
  intro: string
  skills: string[]
  avatar?: string
}

export const header: Header = {
  name: "Francis Ignacio.",
  subtitle: "Software Engineer, Data Scientist",
  intro:
    "Loves teaching and sharing what I have learned—practical tips, stories, and workflows that help others grow. By training I am a software engineer, but I am deeply curious about data science and enjoy applying data-driven thinking to real problems.",
  skills: [
    "Python",
    "TypeScript",
    "Golang",
    "TensorFlow",
    "PyTorch",
    "Django",
    "Next.js",
    "Node.js",
    "Hono",
    "Go Fiber",
    "PostgreSQL",
    "Data Science",
    "Machine Learning",
    "Docker",
    "AWS",
    "CloudFlare",
    "NorthFlank",
    "Prisma",
    "Zod",
    "Zustand",
    "TailwindCSS",
    "TanStack",
    "Git",
  ],
  avatar: "https://avatars.githubusercontent.com/u/132775768?s=96&v=4",
}
