"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { IconWorld, IconPackage } from "@tabler/icons-react"

import { PROJECTS, PROJECT_STATUS_LABELS } from "@portfolio/web/data/projects"

import {
  Badge,
  Card,
  CardFrame,
  CardFrameFooter,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  IconGoogleColab,
  Separator,
} from "@packages/ui/shared"

export function Projects() {
  const isEmpty = PROJECTS.length === 0

  return (
    <section className="flex flex-col gap-4">
      <div className="flex w-full items-center gap-4">
        <div className="flex shrink-0 items-center gap-2">
          <h2 className="text-muted-foreground text-xs font-semibold tracking-widest whitespace-nowrap uppercase">
            What I&apos;m proud of
          </h2>
          <Badge variant="outline" size="sm" className="font-mono tabular-nums">
            {PROJECTS.length}
          </Badge>
        </div>
        <Separator className="flex-1" />
      </div>

      {isEmpty ? (
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
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <CardFrame key={project.name}>
              <Card className="overflow-hidden">
                <div className="bg-muted relative aspect-video w-full">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  {project.status ? (
                    <Badge
                      size="sm"
                      className="absolute top-2 left-2 font-mono uppercase opacity-95"
                    >
                      {PROJECT_STATUS_LABELS[project.status]}
                    </Badge>
                  ) : null}
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
                    <IconGoogleColab className="size-4 shrink-0" />
                  ) : (
                    <IconWorld className="size-4 shrink-0" />
                  )}
                </Link>
              </CardFrameFooter>
            </CardFrame>
          ))}
        </div>
      )}
    </section>
  )
}
