export interface WorkingAs {
  role: string
  company: string
  location: string
  startYear: string
  endYear: string
  availability?: string
}

export const WORKING_AS: WorkingAs[] = [
  {
    role: "Artificial Intelligence Engineer",
    company: "Idea Venture Studio",
    location: "California, US",
    startYear: "2026",
    endYear: "Present",
  },
  {
    role: "Technical Lead",
    company: "Mnemora",
    location: "City of Mabalacat, PH",
    startYear: "2026",
    endYear: "Present",
  },
]
