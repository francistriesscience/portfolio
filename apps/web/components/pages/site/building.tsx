"use client"

import Link from "next/link"
import { IconHammer, IconWorld } from "@tabler/icons-react"

import { PROJECTS, PROJECT_STATUS_LABELS } from "@portfolio/web/data/projects"
import { RenderingImage } from "@portfolio/web/components/shared/rendering-image"

import {
  Badge,
  Card,
  CardFrame,
  CardFrameFooter,
  IconGoogleColabMono,
  Separator,
} from "@packages/ui/shared"

export function Building() {
  const ongoingProjects = PROJECTS.filter((project) => project.status === "ongoing")

  if (ongoingProjects.length === 0) {
    return null
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex w-full items-center gap-4">
        <div className="flex shrink-0 items-center gap-2">
          <h2 className="text-muted-foreground text-xs font-semibold tracking-widest whitespace-nowrap uppercase">
            What I&apos;m building ...
          </h2>
          <Badge variant="outline" size="sm" className="font-mono tabular-nums">
            {ongoingProjects.length}
          </Badge>
        </div>
        <Separator className="flex-1" />
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground shrink-0 text-xs font-semibold tracking-widest whitespace-nowrap uppercase transition-colors"
        >
          See all
        </Link>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {ongoingProjects.map((project) => (
          <CardFrame key={project.name}>
            <Card className="overflow-hidden">
              <RenderingImage
                wrapperClassName="aspect-video w-full"
                imageClassName="object-cover"
                src={project.image}
                alt={project.name}
              >
                <Badge size="sm" className="absolute top-2 left-2 font-mono uppercase opacity-95">
                  <IconHammer className="size-3.5" />
                  {PROJECT_STATUS_LABELS[project.status!]}
                </Badge>
                <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                  {project.stack.slice(0, 2).map((s) => (
                    <Badge key={s} size="sm" className="opacity-90">
                      {s}
                    </Badge>
                  ))}
                  {project.stack.length > 2 && (
                    <Badge size="sm" className="opacity-90">
                      +{project.stack.length - 2}
                    </Badge>
                  )}
                </div>
              </RenderingImage>
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
    </section>
  )
}
