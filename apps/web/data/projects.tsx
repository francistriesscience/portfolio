export interface Project {
  name: string
  url: string
  description?: string
  image: string
  stack: string[]
  colab: boolean
}

export const PROJECTS: Project[] = [
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
    image: "https://i.imgur.com/mozUPte.gif",
    stack: ["Next.js", "Flask"],
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
