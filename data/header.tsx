export type SkillItem = {
  name: string
  iconName?: string
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
  subtitle: "Software Engineer, AI engineering student",
  intro:
    "Passionate about the science behind AI and ML, I teach and share workflows that make complex ideas practical. With a software engineering background and AI engineering focus, I ship production-ready models, connect robust data pipelines, and translate research into dependable product features.",
  skills: [
    { name: "Software Engineering", iconName: "CodeXmlIcon" },
    { name: "Data Science", iconName: "ChartNoAxesColumnIcon" },
    { name: "AI / ML", iconName: "BrainIcon" },
    { name: "Python", iconName: "PythonIcon" },
    { name: "TypeScript", iconName: "TypeScriptIcon" },
    { name: "Go", iconName: "GoIcon" },
    { name: "PyTorch", iconName: "PyTorchIcon" },
    { name: "Django", iconName: "DjangoIcon" },
    { name: "Next.js", iconName: "NextJsIcon" },
    { name: "Node.js", iconName: "NodeJsIcon" },
    { name: "Hono", iconName: "HonoIcon" },
    { name: "PostgreSQL", iconName: "PostgreSQLIcon" },
    { name: "GraphQL", iconName: "GraphQLIcon" },
    { name: "Docker", iconName: "DockerIcon" },
    { name: "AWS", iconName: "AWSIcon" },
    { name: "CloudFlare", iconName: "CloudflareIcon" },
    { name: "Google Colab", iconName: "GoogleColabIcon" },
    { name: "AWS SageMaker", iconName: "AWSSageMakerIcon" },
    { name: "Jupyter", iconName: "JupyterIcon" },
    { name: "DigitalOcean", iconName: "DigitalOceanIcon" },
    { name: "GitLab", iconName: "GitLabIcon" },
    { name: "TensorFlow", iconName: "TensorFlowIcon" },
    { name: "NorthFlank" },
    { name: "Prisma" },
    { name: "Zod" },
    { name: "JavaScript", iconName: "JavaScriptIcon" },
    { name: "Zustand" },
    { name: "TailwindCSS" },
    { name: "TanStack" },
    { name: "Git" },

    { name: "Fiber" },
  ] as SkillItem[],
  avatar: "https://avatars.githubusercontent.com/u/239557641",
}
