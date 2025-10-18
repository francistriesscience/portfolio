import * as React from "react"
import Link from "next/link"
import { SproutIcon } from "lucide-react"

import { getAllProjects } from "@/lib/projects/get-all-projects"

import { Card, CardContent, RippleBackground, Button } from "@/components/ui"
import { ProjectCard } from "@/components/card/project-card"
import { IncomingProjectCard } from "@/components/card/incoming-project-card"

export async function ProjectsSection() {
  const projects = getAllProjects()

  return (
    <div className="relative flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium">Projects</h2>
        <div className="flex w-full justify-end">
          <div className="flex flex-row items-center gap-1">
            <div className="flex w-full justify-end">
              <Button
                variant="link"
                size="sm"
                className="text-muted-foreground hover:text-primary h-auto p-0 text-sm"
              >
                <SproutIcon className="size-3" />
                <Link href="/projects">View projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {projects.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
          <IncomingProjectCard />
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
          <Card className="relative h-36 overflow-hidden border border-dashed bg-transparent p-4">
            <RippleBackground className="opacity-20" numCircles={5} />
            <CardContent className="text-muted-foreground relative z-10 flex h-full flex-col justify-center text-center text-sm">
              Collecting projects...
            </CardContent>
          </Card>
          <IncomingProjectCard />
        </div>
      )}
    </div>
  )
}
