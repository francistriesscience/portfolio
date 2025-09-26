import { GitlabIcon, LinkedinIcon } from "lucide-react"
import { BlueskySocialLineIcon } from "@/components/ui"

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
    icon: GitlabIcon,
    tooltip: "gitlab.com/francistriesscience",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/francistriesscience",
    icon: LinkedinIcon,
    tooltip: "linkedin.com/in/francistriesscience",
  },
  {
    name: "bluesky",
    url: "https://bsky.app/profile/francistriessci.bsky.social",
    icon: BlueskySocialLineIcon,
    tooltip: "bsky.app/profile/francistriessci.bsky.social",
  },
]
