import { House } from "lucide-react"

import { getAllProjects } from "@/lib/projects/get-all-projects"
import { ProjectCard } from "@/components/card/project-card"

import {
  Card,
  CardContent,
  BackgroundRipple,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui"

export const dynamic = "force-static"

export default async function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <House className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl font-medium tracking-tighter">
              Projects
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
