export interface FormerRole {
  id: string
  role: string
  company: string
  years: string
  location: string
  description: string
}

export const FORMER_ROLES: FormerRole[] = [
  {
    id: "1",
    role: "Senior Software Engineer",
    company: "Avorino",
    years: "Mar 2025 — Apr 2026",
    location: "California, USA",
    description:
      "Designed the core backend architecture for an AI-driven ADU feasibility portal, implementing financial modeling for ROI and loan analytics used by homeowners and lenders to evaluate build viability in minutes instead of days.",
  },
  {
    id: "2",
    role: "Professor",
    company: "Holy Angel University",
    years: "Aug 2023 — Oct 2025",
    location: "Pampanga, Philippines",
    description:
      "Delivered advanced coursework in Backend Engineering, Data Analytics, and Machine Learning, mentoring 100+ students and raising the number of graduates with production-grade experience aligned to industry practices.",
  },
  {
    id: "3",
    role: "Backend Engineer",
    company: "Presscart",
    years: "Jan 2024 — Jul 2024",
    location: "New York, USA",
    description:
      "Spearheaded migration of legacy Next.js services to Node.js (Express.js), cutting API response times by 30% and improving storefront load times for end customers.",
  },
  {
    id: "4",
    role: "Full Stack Engineer",
    company: "Holy Angel University, KITTO",
    years: "Feb 2022 — Dec 2022",
    location: "Pampanga, Philippines",
    description:
      "Built prototypes for emerging web technologies and IoT integrations that were instrumental in securing ₱17.9M in R&D funding for the university–industry partnership.",
  },
]
