export type ExperienceDates = {
  start: string
  end: string
}

export type RoleEntry = {
  role: string
  dates: ExperienceDates
  description?: string
}

export type Experience = {
  company: string
  location: string
  imageURL?: string
  role?: string
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
  targetPosition: "Tech Lead / Software Engineer / Data Scientist",
  contactInfo: "hello@francistries.science",
  description:
    "Passionate about building scalable web applications, machine learning models, and leading development teams.",
  tooltipContent: "Click to send me an email about opportunities",
  emailSubject: "Job Opportunity Discussion",
}

export const experiences: Experience[] = [
  {
    company: "SimpleProjeX",
    location: "USA",
    imageURL: "/logo/simpleprojex.webp",
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
    location: "Philippines",
    imageURL: "/logo/hau.webp",
    roles: [
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
    location: "USA",
    imageURL: "/logo/presscart.webp",
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
    company: "Holy Angel University, TBI",
    location: "Philippines",
    imageURL: "/logo/hau.webp",
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
