import * as React from "react"
import Link from "next/link"
import { SproutIcon } from "lucide-react"

import { getAllProjects } from "@/lib/projects/get-all-projects"

import { Card, CardContent, BackgroundRipple, Button } from "@/components/ui"
import { ProjectCard } from "@/components/card/project-card"

export async function ProjectsSection() {
  const projects = getAllProjects()

  return (
    <div className="relative flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium tracking-tighter">Projects</h2>
        <div className="flex w-full justify-end">
          <div className="flex flex-row items-center gap-1">
            <div className="flex w-full justify-end">
              <Button
                variant="link"
                size="sm"
                className="text-muted-foreground hover:text-primary h-auto p-0 text-sm"
              >
                <Link href="/projects" className="flex flex-row items-center gap-1">
                  <SproutIcon className="size-3" />
                  View projects
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        {projects.length < 4 && (
          <Card className="relative h-full overflow-hidden border border-dashed bg-transparent p-4">
            <BackgroundRipple className="opacity-20" numCircles={5} />
            <CardContent className="text-muted-foreground relative z-10 flex h-full flex-col justify-center text-center text-sm">
              Working on something
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
