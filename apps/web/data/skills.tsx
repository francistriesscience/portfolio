import { type ReactElement } from "react"

import {
  IconAWS,
  IconClaude,
  IconCloudflare,
  IconCursor,
  IconDjango,
  IconDjangoRest,
  IconDocker,
  IconDrizzle,
  IconFastAPI,
  IconFiber,
  IconFlask,
  IconGCP,
  IconGemini,
  IconGin,
  IconGo,
  IconGPT,
  IconHono,
  IconJupyter,
  IconLangChain,
  IconLangGraph,
  IconLangfuse,
  IconNextjs,
  IconNodejs,
  IconPandas,
  IconPostgreSQL,
  IconPrisma,
  IconPython,
  IconQdrant,
  IconReact,
  IconRailway,
  IconRedis,
  IconScikitLearn,
  IconSupabase,
  IconTailwindCSS,
  IconTanStack,
  IconTypeScript,
  IconVercel,
  IconVSCode,
} from "@packages/ui/shared"

export interface Skill {
  label: string
  icon?: (props: { className?: string }) => ReactElement
}

export const SKILLS: Skill[] = [
  {
    label: "Go",
    icon: IconGo,
  },
  {
    label: "TypeScript",
    icon: IconTypeScript,
  },
  {
    label: "Python",
    icon: IconPython,
  },
  {
    label: "Fiber",
    icon: IconFiber,
  },
  { label: "Gin", icon: IconGin },
  { label: "Django", icon: IconDjango },
  { label: "Django REST", icon: IconDjangoRest },
  {
    label: "FastAPI",
    icon: IconFastAPI,
  },
  {
    label: "Flask",
    icon: IconFlask,
  },
  { label: "Node.js", icon: IconNodejs },
  {
    label: "Hono",
    icon: IconHono,
  },
  {
    label: "Next.js",
    icon: IconNextjs,
  },
  {
    label: "React",
    icon: IconReact,
  },
  {
    label: "TailwindCSS",
    icon: IconTailwindCSS,
  },
  { label: "TanStack", icon: IconTanStack },
  {
    label: "PostgreSQL",
    icon: IconPostgreSQL,
  },
  { label: "Redis", icon: IconRedis },
  { label: "Supabase", icon: IconSupabase },
  { label: "Drizzle", icon: IconDrizzle },
  { label: "Prisma", icon: IconPrisma },
  {
    label: "Scikit-learn",
    icon: IconScikitLearn,
  },
  {
    label: "Pandas",
    icon: IconPandas,
  },
  { label: "Jupyter Notebook", icon: IconJupyter },
  { label: "LangGraph", icon: IconLangGraph },
  { label: "LangChain", icon: IconLangChain },
  { label: "Langfuse", icon: IconLangfuse },
  { label: "Qdrant", icon: IconQdrant },
  {
    label: "Google Gemini",
    icon: IconGemini,
  },
  {
    label: "OpenAI GPT",
    icon: IconGPT,
  },
  {
    label: "Anthropic Claude",
    icon: IconClaude,
  },
  { label: "Docker", icon: IconDocker },
  { label: "AWS", icon: IconAWS },
  { label: "GCP", icon: IconGCP },
  {
    label: "Cloudflare",
    icon: IconCloudflare,
  },
  {
    label: "Vercel",
    icon: IconVercel,
  },
  {
    label: "Railway",
    icon: IconRailway,
  },
  {
    label: "Cursor",
    icon: IconCursor,
  },
  {
    label: "VSCode",
    icon: IconVSCode,
  },
]
