"use client"

import Image from "next/image"
import Link from "next/link"
import { IconHammer, IconWorld } from "@tabler/icons-react"

import { PROJECT_STATUS_LABELS, type Project } from "@portfolio/web/data/projects"

import { Badge, Card, CardFrame, CardFrameFooter, IconGoogleColabMono } from "@packages/ui/shared"

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <CardFrame key={project.name}>
          <Card className="overflow-hidden">
            <div className="bg-muted relative aspect-video w-full">
              <Image
                src={project.image}
                alt={project.name}
                fill
                unoptimized
                className="z-0 object-cover"
              />
              {project.status ? (
                <Badge size="sm" className="absolute top-2 left-2 font-mono uppercase opacity-95">
                  <IconHammer className="size-3.5" />
                  {PROJECT_STATUS_LABELS[project.status]}
                </Badge>
              ) : null}
              <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                {project.stack.slice(0, 2).map((stack) => (
                  <Badge key={stack} size="sm" className="opacity-90">
                    {stack}
                  </Badge>
                ))}
                {project.stack.length > 2 && (
                  <Badge size="sm" className="opacity-90">
                    +{project.stack.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
          <CardFrameFooter>
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground text-muted-foreground flex w-full items-center justify-between gap-3 text-sm transition-colors"
            >
              <span className="min-w-0 truncate text-end text-xs font-bold tracking-wide uppercase">
                {project.name}
              </span>
              {project.colab ? (
                <IconGoogleColabMono className="size-4 shrink-0" />
              ) : (
                <IconWorld className="size-4 shrink-0" />
              )}
            </Link>
          </CardFrameFooter>
        </CardFrame>
      ))}
    </div>
  )
}
