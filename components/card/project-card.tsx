import Link from "next/link"

import type { ProjectPost } from "@/lib/mdx"
import { formatDate } from "@/helper/format-date"
import { getIconComponent } from "@/helper/get-icon-component"

import { Card, CardTitle, CardHeader, CardDescription, CardFooter } from "@/components/ui"

export function ProjectCard({ project }: { project: ProjectPost }) {
  const iconName =
    project.isNotebook && project.notebook.length > 0
      ? project.notebook[0].icon
      : project.isWebsite && project.website.length > 0
        ? project.website[0].icon
        : undefined

  const IconComponent = getIconComponent(iconName)

  return (
    <Link key={project.slug} href={`/projects/${project.slug}`} className="group relative w-full">
      {IconComponent && (
        <div className="absolute top-1 right-2 z-10">
          <IconComponent className="h-5 w-5" />
        </div>
      )}
      <Card className="group-hover:border-primary/50 hover:from-primary/5 hover:via-background hover:to-primary/10 h-full cursor-pointer bg-gradient-to-br hover:shadow-md">
        <CardHeader className="flex flex-col items-start">
          <CardTitle className="group-hover:text-primary line-clamp-2 flex flex-row items-start gap-1 text-sm leading-tight font-medium transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs leading-tight">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto line-clamp-2 grid w-full grid-cols-2 items-end justify-between text-xs leading-relaxed">
          <div className="flex flex-row items-center gap-1">
            <span className="text-muted-foreground text-[8px] uppercase">
              {project.tags.join(", ")}
            </span>
          </div>
          <span className="text-end">{formatDate(project.date)}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
