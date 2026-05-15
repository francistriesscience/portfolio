export interface Pin {
  name: string
  url: string
}

export interface PinCategory {
  id: string
  title: string
  pins: Pin[]
}

export const PIN_CATEGORIES: PinCategory[] = [
  {
    id: "ai-automation",
    title: "AI / Automation",
    pins: [
      { name: "OpenAI", url: "https://platform.openai.com" },
      { name: "Anthropic", url: "https://www.anthropic.com" },
      { name: "LangChain", url: "https://www.langchain.com" },
      { name: "LangGraph", url: "https://www.langchain.com/langgraph" },
      { name: "Langfuse", url: "https://langfuse.com" },
      { name: "n8n", url: "https://n8n.io" },
    ],
  },
  {
    id: "ui-components",
    title: "UI / Components",
    pins: [
      { name: "shadcnui", url: "https://ui.shadcn.com" },
      { name: "shadcn studio", url: "https://shadcnstudio.com" },
      { name: "magicui", url: "https://magicui.design" },
      { name: "cossui", url: "https://coss.com/ui/particles" },
      { name: "kokonutui", url: "https://kokonutui.com" },
      { name: "tailark", url: "https://tailark.com" },
      { name: "shadcn io", url: "https://shadcn.io" },
      { name: "shoogle", url: "https://shoogle.dev" },
      { name: "cardcn", url: "https://cardcn.dev" },
      { name: "shadcn space", url: "https://shadcnspace.com" },
    ],
  },
  {
    id: "icons-logos",
    title: "Icons / Logos",
    pins: [
      { name: "tabler icons", url: "https://tabler-icons.io" },
      { name: "hugeicons", url: "https://hugeicons.com" },
      { name: "lucide", url: "https://lucide.dev" },
      { name: "heroicons", url: "https://heroicons.com" },
      { name: "svg logos", url: "https://svglogos.dev" },
      { name: "thesvg", url: "https://thesvg.org" },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    pins: [
      { name: "cloudflare", url: "https://www.cloudflare.com" },
      { name: "vercel", url: "https://vercel.com" },
      { name: "railway", url: "https://railway.com" },
      { name: "docker", url: "https://www.docker.com" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    pins: [
      { name: "neon", url: "https://neon.com" },
      { name: "supabase", url: "https://supabase.com" },
      { name: "sqlite", url: "https://sqlite.org" },
    ],
  },
]
