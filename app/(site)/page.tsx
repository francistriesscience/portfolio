import * as React from "react"

import { LearningTrack } from "@/components/pages/home/learning-track"
import { NotebooksSection } from "@/components/pages/home/notebooks-section"
import { ProjectsSection } from "@/components/pages/home/projects-section"
import { ExperiencesSection } from "@/components/pages/home/experiences-section"

export default function HomePage() {
  return (
    <>
      <LearningTrack />
      <ProjectsSection />
      <ExperiencesSection />
      <NotebooksSection />
    </>
  )
}
