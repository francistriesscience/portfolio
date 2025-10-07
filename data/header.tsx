import { ComponentType } from "react"
import { ChartNoAxesColumnIcon, BrainIcon, CodeXmlIcon } from "lucide-react"

import {
  PythonIcon,
  TypeScriptIcon,
  JavaScriptIcon,
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
  CloudflareIcon,
  DigitalOceanIcon,
  GitLabIcon,
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
    "Loves teaching and sharing what I have learned—practical tips, stories, and workflows that help others grow. By training I am a software engineer and I am deeply curious about data science and enjoy applying data-driven thinking to real problems.",
  skills: [
    { name: "Software Engineering", icon: CodeXmlIcon },
    { name: "Data Science", icon: ChartNoAxesColumnIcon },
    { name: "Machine Learning", icon: BrainIcon },
    { name: "Python", icon: PythonIcon },
    { name: "TypeScript", icon: TypeScriptIcon },
    { name: "JavaScript", icon: JavaScriptIcon },
    { name: "Go", icon: GoIcon },
    { name: "TensorFlow", icon: TensorFlowIcon },
    { name: "PyTorch", icon: PyTorchIcon },
    { name: "Django", icon: DjangoIcon },
    { name: "Next.js", icon: NextJsIcon },
    { name: "Node.js", icon: NodeJsIcon },
    { name: "Hono", icon: HonoIcon },
    { name: "PostgreSQL", icon: PostgreSQLIcon },
    { name: "Docker", icon: DockerIcon },
    { name: "AWS", icon: AWSIcon },
    { name: "CloudFlare", icon: CloudflareIcon },
    { name: "DigitalOcean", icon: DigitalOceanIcon },
    { name: "GitLab", icon: GitLabIcon },
    { name: "NorthFlank" },
    { name: "Prisma" },
    { name: "Zod" },
    { name: "Zustand" },
    { name: "TailwindCSS" },
    { name: "TanStack" },
    { name: "Git" },

    { name: "Fiber" },
  ] as SkillItem[],
  avatar: "https://avatars.githubusercontent.com/u/132775768?s=96&v=4",
}
