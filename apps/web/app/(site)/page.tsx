"use client"

import * as React from "react"

import { ProfileIntro } from "@/components/pages/site/profile-intro"
import { AboutMe } from "@/components/pages/site/about-me"
import { WorkExperience } from "@/components/pages/site/work-experience"
import { FormerRoles } from "@/components/pages/site/former-roles"
import { Projects } from "@/components/pages/site/projects"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <ProfileIntro />
      <WorkExperience />
      <FormerRoles />
      <AboutMe />
      <Projects />
    </div>
  )
}
