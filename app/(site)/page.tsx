import * as React from "react"

import { BlogsSection } from "@/components/pages/home/blogs-section"
import { ProjectsSection } from "@/components/pages/home/projects-section"
import { ExperiencesSection } from "@/components/pages/home/experiences-section"
import { ConnectSection } from "@/components/pages/home/connect-section"

export default function HomePage() {
  return (
    <>
      <ProjectsSection />
      <ExperiencesSection />
      <BlogsSection />
      <ConnectSection />
    </>
  )
}
