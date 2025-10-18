import * as React from "react"

import { CareerTrack } from "@/components/pages/home/career-track"
import { NotebooksSection } from "@/components/pages/home/notebooks-section"
import { ProjectsSection } from "@/components/pages/home/projects-section"
import { ExperiencesSection } from "@/components/pages/home/experiences-section"
import { ConnectSection } from "@/components/pages/home/connect-section"

export default function HomePage() {
  return (
    <>
      <CareerTrack />
      <ProjectsSection />
      <ExperiencesSection />
      <NotebooksSection />
      <ConnectSection />
    </>
  )
}
