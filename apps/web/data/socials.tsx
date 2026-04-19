import { IconBrandGithub, IconBrandLinkedin, IconMail, IconFileCv } from "@tabler/icons-react"

export const SOCIAL_LINKS = [
  {
    href: "https://github.com/francistriesscience",
    handler: "@francistriesscience",
    Icon: IconBrandGithub,
  },
  {
    href: "https://linkedin.com/in/francistriesscience",
    handler: "in/francistriesscience",
    Icon: IconBrandLinkedin,
  },
  {
    href: "mailto:hello@francistries.science",
    handler: "hello@francistries.science",
    Icon: IconMail,
  },
  {
    href: "https://drive.google.com/file/d/1er8pslyzECCeZvb-sFSS14CTV7LYqU5B/view?usp=drive_link",
    handler: "Resume / CV",
    Icon: IconFileCv,
  },
]
