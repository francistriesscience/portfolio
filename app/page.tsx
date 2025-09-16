import * as React from "react"

import { HeaderSection } from "@/components/pages/home/header-section"
import { ProjectsSection } from "@/components/pages/home/projects-section"
import { ExperiencesSection } from "@/components/pages/home/experiences-section"
import { ConnectSection } from "@/components/pages/home/connect-section"

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-start gap-8">
      <HeaderSection />
      <ProjectsSection />
      <ExperiencesSection />
      <ConnectSection />
    </div>
  )
}
