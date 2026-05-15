"use client"

import { IconPackage } from "@tabler/icons-react"

import { PROJECTS } from "@portfolio/web/data/projects"
import { ProjectGrid } from "@/components/pages/projects/_grid/project-grid"

import {
  Badge,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Separator,
} from "@packages/ui/shared"

export function Projects() {
  const completedProjects = PROJECTS.filter((project) => project.status !== "ongoing")

  if (completedProjects.length === 0) {
    return (
      <section className="flex flex-col gap-4">
        <Empty className="py-12">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconPackage />
            </EmptyMedia>
            <EmptyTitle>Nothing here... yet.</EmptyTitle>
            <EmptyDescription>
              Just got migrated from my old portfolio. Check back soon for new projects!
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex w-full items-center gap-4">
        <div className="flex shrink-0 items-center gap-2">
          <h2 className="text-muted-foreground text-xs font-medium tracking-widest whitespace-nowrap uppercase">
            What I&apos;m proud of
          </h2>
          <Badge variant="outline" size="sm" className="font-mono tabular-nums">
            {completedProjects.length}
          </Badge>
        </div>
        <Separator className="flex-1" />
      </div>

      <ProjectGrid projects={completedProjects} />
    </section>
  )
}
