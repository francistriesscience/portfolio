import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconFileCv,
  IconBrandGitlab,
} from "@tabler/icons-react"

export const SOCIAL_LINKS = [
  {
    href: "https://github.com/francistriesscience",
    handler: "francistriesscience",
    Icon: IconBrandGithub,
  },
  {
    href: "https://gitlab.com/francistriesscience",
    handler: "francistriesscience",
    Icon: IconBrandGitlab,
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
    href: "https://drive.google.com/file/d/1-gi0nNzPXp_zLeoTXQ8_hSVVpJJkrhAk/view?usp=sharing",
    handler: "Resume / CV",
    Icon: IconFileCv,
  },
]
