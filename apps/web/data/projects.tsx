export const PROJECT_STATUS_LABELS = {
  ongoing: "Building",
} as const

export type ProjectStatus = keyof typeof PROJECT_STATUS_LABELS

export interface Project {
  name: string
  url: string
  description?: string
  image: string
  stack: string[]
  colab: boolean
  status?: ProjectStatus
}

export const PROJECTS: Project[] = [
  {
    name: "Safegate",
    url: "https://safegate.mnemora.org",
    image: "https://i.imgur.com/K05LjiN.gif",
    stack: ["Go", "Python", "TypeScript", "TailwindCSS", "FastAPI", "Next.js"],
    colab: false,
    status: "ongoing",
  },
  {
    name: "Applywise",
    url: "https://applywise.today",
    image: "https://i.imgur.com/yOtHt6G.gif",
    stack: ["Go", "Python", "TypeScript", "TailwindCSS", "FastAPI", "Next.js"],
    colab: false,
    status: "ongoing",
  },
  {
    name: "ADU Portal",
    url: "https://aduportal.com/",
    image: "https://i.imgur.com/WoSfnHg.gif",
    stack: [
      "Next.js",
      "Hono",
      "Flask",
      "PostgreSQL",
      "Google Gemini 3.1 Pro",
      "TailwindCSS",
      "TypeScript",
      "Python",
    ],
    colab: false,
  },
  {
    name: "Chromiq",
    url: "https://chromiq.mnemora.org",
    image: "https://i.imgur.com/j3mfovT.gif",
    stack: ["Next.js", "FastAPI", "TailwindCSS", "TypeScript", "Python"],
    colab: false,
  },
  {
    name: "Seismic Signature Analysis for Tsunami",
    url: "https://colab.research.google.com/drive/17rKFbYb_F5gqIyFtYP8f8Ejnkdm-YRsW?usp=sharing",
    image: "https://i.imgur.com/3FVtuTr.gif",
    stack: ["Python", "Scikit-learn", "XGBoost"],
    colab: true,
  },
  {
    name: "Predicting Calorie Expenditure",
    url: "https://colab.research.google.com/drive/1VB8UHgkbE989lxI_j9FIOAdTtK_zFF6K?usp=drive_link",
    image: "https://i.imgur.com/XbpJvYj.gif",
    stack: ["Python", "Scikit-learn"],
    colab: true,
  },
]
