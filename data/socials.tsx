import { RiGitlabLine, RiLinkedinBoxLine, RiBlueskyLine } from "react-icons/ri"

export type Socials = {
  name: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  tooltip: string
}

export const socials: Socials[] = [
  {
    name: "gitlab",
    url: "https://gitlab.com/francistriesscience",
    icon: RiGitlabLine,
    tooltip: "gitlab.com/francistriesscience",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/francistriesscience",
    icon: RiLinkedinBoxLine,
    tooltip: "linkedin.com/in/francistriesscience",
  },
  {
    name: "bluesky",
    url: "https://bsky.app/profile/francistriessci.bsky.social",
    icon: RiBlueskyLine,
    tooltip: "bsky.app/profile/francistriessci.bsky.social",
  },
]
