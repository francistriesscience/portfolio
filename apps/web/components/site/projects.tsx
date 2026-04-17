"use client"

import * as React from "react"
import Link from "next/link"
import { IconArrowRight, IconBrandGithub, IconPackage } from "@tabler/icons-react"

import { PROJECTS } from "@portfolio/web/data/projects"

import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Separator,
} from "@packages/ui/shared"

export function Projects() {
  const isEmpty = PROJECTS.length === 0

  return (
    <section className="flex flex-col gap-4">
      <div className="flex w-full items-center gap-4">
        <h2 className="text-muted-foreground shrink-0 text-xs font-semibold tracking-widest whitespace-nowrap uppercase">
          What I&apos;m proud of
        </h2>
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
        <div className="flex w-full flex-col items-start gap-4">
          {PROJECTS.map((project) => (
            <Link
              key={project.name}
              href={project.url}
              className="flex w-full items-center justify-between"
            >
              <span className="text-muted-foreground font-medium">{project.name}</span>
              <IconArrowRight className="text-muted-foreground size-4" />
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
