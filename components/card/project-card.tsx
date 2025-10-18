import Link from "next/link"

import type { ProjectPost } from "@/lib/mdx"
import { formatDate } from "@/helper/format-date"

import { Card, CardTitle, CardHeader, CardDescription, CardFooter } from "@/components/ui"

export function ProjectCard({ project }: { project: ProjectPost }) {
  return (
    <Link key={project.slug} href={`/projects/${project.slug}`} className="w-full">
      <Card className="group hover:border-primary/50 hover:from-primary/5 hover:via-background hover:to-primary/10 cursor-pointer bg-gradient-to-br transition-all hover:shadow-md">
        <CardHeader className="flex flex-col items-start">
          <CardTitle className="group-hover:text-primary line-clamp-2 text-sm leading-tight font-medium transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs leading-relaxed">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="line-clamp-2 grid w-full grid-cols-2 justify-between text-xs leading-relaxed">
          <div className="flex flex-row items-center gap-1">
            <span className="text-muted-foreground text-[8px] uppercase">
              {project.tags.join(", ")}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground text-[8px] uppercase">
              {project.technologies.map((tech) => tech.name).join(", ")}
            </span>
          </div>
          <span className="text-end">{formatDate(project.date)}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
