export type ExperienceDates = {
  start: string
  end: string
}

export type Experience = {
  role: string
  company: string
  location: string
  dates: ExperienceDates
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
    role: "Senior Software Engineer",
    company: "SimpleProjeX",
    location: "USA",
    dates: {
      start: "Mar 2025",
      end: "Present",
    },
  },
  {
    role: "Professor",
    company: "Holy Angel University",
    location: "Philippines",
    dates: {
      start: "Aug 2023",
      end: "Oct 2025",
    },
  },
  {
    role: "Backend Engineer",
    company: "Presscart",
    location: "USA",
    dates: {
      start: "Jan 2024",
      end: "Jul 2024",
    },
  },
  {
    role: "Full Stack Engineer / Technical Associate",
    company: "Holy Angel University, TBI",
    location: "Philippines",
    dates: {
      start: "Sep 2021",
      end: "Dec 2022",
    },
  },
]
