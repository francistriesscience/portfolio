import * as React from "react"

import { LearningTrackSection } from "@/components/pages/home/learning-track-section"
import { NotebooksSection } from "@/components/pages/home/notebooks-section"
import { ProjectsSection } from "@/components/pages/home/projects-section"
import { ExperiencesSection } from "@/components/pages/home/experiences-section"
import { RepositoriesSection } from "@/components/pages/home/repositories-section"

export default function HomePage() {
  return (
    <>
      <LearningTrackSection />
      <ProjectsSection />
      <ExperiencesSection />
      <NotebooksSection />
      <RepositoriesSection />
    </>
  )
}
