import { ComponentType } from "react"
import { AtomIcon, BrainIcon } from "lucide-react"

import {
  PythonIcon,
  TypeScriptIcon,
  GoIcon,
  TensorFlowIcon,
  PyTorchIcon,
  DjangoIcon,
  NextJsIcon,
  NodeJsIcon,
  HonoIcon,
  PostgreSQLIcon,
  DockerIcon,
  AWSIcon,
} from "@/components/ui"

export type SkillItem = {
  name: string
  icon?: ComponentType<{ className?: string }>
}

export type Header = {
  name: string
  subtitle: string
  intro: string
  skills: SkillItem[]
  avatar?: string
}

export const header: Header = {
  name: "Francis Ignacio.",
  subtitle: "Software Engineer, Data Scientist",
  intro:
    "Loves teaching and sharing what I have learned—practical tips, stories, and workflows that help others grow. By training I am a software engineer, but I am deeply curious about data science and enjoy applying data-driven thinking to real problems.",
  skills: [
    { name: "Python", icon: PythonIcon },
    { name: "TypeScript", icon: TypeScriptIcon },
    { name: "Go", icon: GoIcon },
    { name: "TensorFlow", icon: TensorFlowIcon },
    { name: "PyTorch", icon: PyTorchIcon },
    { name: "Django", icon: DjangoIcon },
    { name: "Next.js", icon: NextJsIcon },
    { name: "Node.js", icon: NodeJsIcon },
    { name: "Hono", icon: HonoIcon },
    { name: "PostgreSQL", icon: PostgreSQLIcon },
    { name: "Data Science", icon: AtomIcon },
    { name: "Machine Learning", icon: BrainIcon },
    { name: "Docker", icon: DockerIcon },
    { name: "AWS", icon: AWSIcon },
    { name: "CloudFlare" },
    { name: "NorthFlank" },
    { name: "Prisma" },
    { name: "Zod" },
    { name: "Zustand" },
    { name: "TailwindCSS" },
    { name: "TanStack" },
    { name: "Git" },
    { name: "GitLab" },
    { name: "Fiber" },
  ] as SkillItem[],
  avatar: "https://avatars.githubusercontent.com/u/132775768?s=96&v=4",
}
