"use client"

import * as React from "react"

import { ProfileIntro } from "@/components/site/profile-intro"
import { AboutMe } from "@/components/site/about-me"
import { WorkExperience } from "@/components/site/work-experience"
import { FormerRoles } from "@/components/site/former-roles"
import { Projects } from "@/components/site/projects"

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
