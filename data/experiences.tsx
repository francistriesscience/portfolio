export type ExperienceDates = {
  start: string
  end: string
}

export type RoleEntry = {
  role: string
  isCareerBreak?: boolean
  dates: ExperienceDates
  description?: string
}

export type Experience = {
  company: string
  location: string
  roles?: RoleEntry[]
  dates?: ExperienceDates
}

export type JobSeekingStatus = {
  isActivelyLooking: boolean
  targetPosition: string
  contactInfo: string
  description?: string
  tooltipContent: string
  emailSubject?: string
}

export const jobSeekingStatus: JobSeekingStatus = {
  isActivelyLooking: true,
  targetPosition: "Tech Lead / Software Engineer / AI Engineer",
  contactInfo: "hello@francistries.science",
  description:
    "Experienced in building production-grade AI systems, deploying and monitoring ML models, and integrating AI pipelines into scalable web platforms.",
  tooltipContent: "Click to send me an email about opportunities",
  emailSubject: "Job Opportunity Discussion",
}

export const experiences: Experience[] = [
  {
    company: "SimpleProjeX",
    location: "California, USA",
    roles: [
      {
        role: "Senior Software Engineer",
        dates: {
          start: "Mar 2025",
          end: "Present",
        },
        description:
          "Designed and built a proposal generation platform enabling construction agencies to secure more project bids.",
      },
    ],
  },
  {
    company: "Holy Angel University",
    location: "Angeles City, Pampanga, PH",
    roles: [
      {
        role: "Career Break",
        isCareerBreak: true,
        dates: {
          start: "Oct 2025",
          end: "Present",
        },
        description:
          "Professional development and upskilling in advanced software engineering and machine learning.",
      },
      {
        role: "Professor",
        dates: {
          start: "Aug 2023",
          end: "Oct 2025",
        },
        description:
          "Designed and taught undergraduate courses in backend development with Python, covering web frameworks, database systems, and introductory concepts in data science and machine learning.",
      },
    ],
  },
  {
    company: "Presscart",
    location: "New York, USA",
    roles: [
      {
        role: "Backend Engineer",
        dates: {
          start: "Jan 2024",
          end: "Jul 2024",
        },
        description:
          "Led the migration of backend infrastructure to enhance system performance, scalability, and API efficiency using Node.js.",
      },
    ],
  },
  {
    company: "Holy Angel University — KITTO",
    location: "Angeles City, Pampanga, PH",
    roles: [
      {
        role: "Full Stack Engineer",
        dates: {
          start: "Feb 2022",
          end: "Dec 2022",
        },
        description:
          "Developed a robust database management system that optimized data processing and backend operations for web applications.",
      },
      {
        role: "Technical Associate",
        dates: {
          start: "Sep 2021",
          end: "Feb 2022",
        },
        description:
          "Contributed to securing ₱17.9 million in R&D funding for projects focused on emerging and web-based software technologies.",
      },
    ],
  },
]
