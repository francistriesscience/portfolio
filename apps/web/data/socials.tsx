import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react"

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/francistriesscience",
    handler: "@francistriesscience",
    Icon: IconBrandGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/francistriesscience",
    handler: "in/francistriesscience",
    Icon: IconBrandLinkedin,
  },
  {
    label: "Say hello",
    href: "mailto:hello@francistries.science",
    handler: "hello@francistries.science",
    Icon: IconMail,
  },
]
