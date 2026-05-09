"use client"

import { ProfileIntro } from "@/components/pages/site/profile-intro"
import { AboutMe } from "@/components/pages/site/about-me"
import { WorkingAs } from "@/components/pages/site/working-as"
import { FormerRoles } from "@/components/pages/site/former-roles"
import { Building } from "@/components/pages/site/building"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <ProfileIntro />
      <WorkingAs />
      <FormerRoles />
      <AboutMe />
      <Building />
    </div>
  )
}
