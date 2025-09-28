import * as React from "react"
import Link from "next/link"
import { SearchIcon } from "lucide-react"

import { experiences, jobSeekingStatus, type Experience } from "@/data/experiences"

import { Card, CardContent, Tooltip, TooltipTrigger, TooltipContent, Badge } from "@/components/ui"

export function ExperiencesSection() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium">Experiences</h2>
        <div className="flex w-full justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className="text-muted-foreground hover:text-primary flex flex-row items-center gap-1 text-xs underline decoration-dashed underline-offset-2"
                href={"https://www.linkedin.com/in/francistriesscience"}
                target="_blank"
              >
                View more on LinkedIn
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <span>Check out my complete professional journey!</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        {jobSeekingStatus.isActivelyLooking && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`mailto:${jobSeekingStatus.contactInfo}${jobSeekingStatus.emailSubject ? `?subject=${encodeURIComponent(jobSeekingStatus.emailSubject)}` : ""}`}
                target="_blank"
                className="block"
              >
                <Card className="border-primary from-primary/5 via-background to-primary/10 relative w-full cursor-pointer overflow-hidden rounded-xl border border-dashed bg-gradient-to-br transition-all hover:shadow-md">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Badge>
                        <SearchIcon className="size-4 rotate-90" />
                        Looking for opportunities
                      </Badge>
                    </div>
                    <div className="flex flex-col items-start">
                      <p className="text-foreground text-sm font-medium">
                        {jobSeekingStatus.targetPosition}
                      </p>
                      {jobSeekingStatus.description && (
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {jobSeekingStatus.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <span>{jobSeekingStatus.tooltipContent}</span>
            </TooltipContent>
          </Tooltip>
        )}

        {experiences.map((e: Experience, i: number) => {
          const start = e.dates?.start ?? ""
          const end = e.dates?.end ?? ""
          const range = start && end ? `${start} - ${end}` : start || end || ""

          return (
            <Card key={i} className="rounded-xl bg-transparent p-0">
              <CardContent className="flex w-full items-start justify-between p-3">
                <div className="flex flex-col items-start">
                  <h3 className="text-sm font-medium">{e.role}</h3>
                  <p className="text-muted-foreground text-xs">
                    {e.company} — {e.location}
                  </p>
                </div>
                <p className="text-muted-foreground text-xs">{range}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
