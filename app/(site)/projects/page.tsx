import * as React from "react"
import Link from "next/link"
import { HouseIcon } from "lucide-react"

import { getAllProjects } from "@/lib/projects/get-all-projects"
import { ProjectCard } from "@/components/card/project-card"

import { Card, CardContent, Button, BackgroundRipple } from "@/components/ui"

export const dynamic = "force-static"

export default async function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium">Projects</h2>
        <Button
          variant="link"
          size="sm"
          className="text-muted-foreground hover:text-primary h-auto p-0 text-sm"
        >
          <Link href={"/"} className="flex flex-row items-center gap-1">
            <HouseIcon className="size-3" />
            Home
          </Link>
        </Button>
      </div>
      {projects.length > 0 ? (
        <div className="flex w-full flex-col items-start gap-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="w-full">
          <Card className="relative h-36 overflow-hidden border border-dashed bg-transparent p-4">
            <BackgroundRipple className="opacity-20" numCircles={5} />
            <CardContent className="text-muted-foreground relative z-10 flex h-full flex-col justify-center text-center text-sm">
              Collecting projects...
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
