import { ProjectGrid } from "@/components/pages/projects/_grid/project-grid"
import { SkillsTech } from "@/components/pages/projects/skills-tech"
import { PROJECTS } from "@portfolio/web/data/projects"

import { Badge, Separator } from "@packages/ui/shared"

export const dynamic = "force-static"
export const revalidate = false

export default function ProjectsPage() {
  const projects = PROJECTS.filter((project) => project.status !== "ongoing")

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex shrink-0 items-center gap-2">
            <h1 className="text-muted-foreground shrink-0 text-xs font-semibold tracking-widest whitespace-nowrap uppercase">
              Projects
            </h1>
            <Badge variant="outline" size="sm" className="font-mono tabular-nums">
              {projects.length}
            </Badge>
          </div>
          <Separator className="flex-1" />
        </div>

        {projects.length === 0 ? (
          <div className="border-border bg-card/40 text-muted-foreground rounded-3xl border p-6 text-sm leading-6">
            No finished projects yet. Ongoing work stays on the home page until it is ready.
          </div>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </section>
      <SkillsTech />
    </div>
  )
}
