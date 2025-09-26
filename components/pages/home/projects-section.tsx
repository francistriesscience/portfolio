import * as React from "react"
import Link from "next/link"

import projectsData from "@/data/projects.json"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  RippleBackground,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui"

type Project = {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
}

export function ProjectsSection() {
  const items = Array.isArray(projectsData) ? (projectsData as Project[]) : []

  return (
    <div className="relative flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium">Projects</h2>
        <div className="flex w-full justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className="text-muted-foreground hover:text-primary flex flex-row items-center gap-1 text-xs underline decoration-dashed underline-offset-2"
                href={"mailto:hello@francistries.science"}
              >
                Let&apos;s collaborate!
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <span>I&apos;d love to hear from you!</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      {items.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
          {items.map((p: Project, i: number) => (
            <Card key={p?.title ?? i} className="w-full border-none bg-transparent p-0">
              <CardHeader className="p-0">
                <div className="h-40 w-full rounded-xl border bg-transparent" aria-hidden />
              </CardHeader>
              <CardContent className="flex w-full flex-col gap-1 p-0">
                <CardTitle>{p?.title ?? "Untitled"}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                  {p?.description ?? ""}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="w-full">
          <Card className="relative h-36 overflow-hidden border border-dashed bg-transparent p-4">
            <RippleBackground className="opacity-20" numCircles={5} />
            <CardContent className="text-muted-foreground relative z-10 flex h-full flex-col justify-center text-center text-sm">
              Collecting projects...
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
