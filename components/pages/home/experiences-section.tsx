import * as React from "react"
import Link from "next/link"
import { SearchIcon, SoupIcon, FileTextIcon } from "lucide-react"

import { experiences, jobSeekingStatus, type Experience, type RoleEntry } from "@/data/experiences"

import {
  Card,
  CardContent,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Badge,
  Button,
} from "@/components/ui"

export function ExperiencesSection() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium">Experiences</h2>
        <div className="flex w-full justify-end">
          <div className="flex flex-row items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="link"
                  size="sm"
                  className="text-muted-foreground hover:text-primary h-auto p-0 text-sm"
                >
                  <Link
                    href={
                      "https://drive.google.com/file/d/1r8zQQP59ZWYI1lE0wHOxI1GdICSTPXRd/view?usp=drive_link"
                    }
                    target="_blank"
                    className="flex flex-row items-center gap-1"
                  >
                    <FileTextIcon className="size-3" />
                    Resume
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Preview my latest resume (PDF)</span>
              </TooltipContent>
            </Tooltip>
          </div>
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
                <Card className="from-primary/5 via-background to-primary/10 border-primary relative w-full cursor-pointer overflow-hidden border bg-gradient-to-br p-0 shadow-sm">
                  <div className="flex flex-col gap-2 p-3">
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
                        <p className="text-muted-foreground text-xs leading-tight">
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

        {experiences
          .filter((e) => e.roles && e.roles.length > 0)
          .map((e: Experience, i: number) => (
            <Card key={`${e.company}-${i}`} className="bg-transparent p-0">
              <CardContent className="flex w-full items-start justify-between gap-4 p-3">
                <div className="flex w-full flex-col items-start gap-1">
                  <div className="flex w-full flex-row items-center justify-between">
                    <p className="text-muted-foreground text-xs">{e.company}</p>
                    <p className="text-muted-foreground text-xs">{e.location}</p>
                  </div>
                  <div className="relative w-full">
                    <div className="flex w-full flex-col gap-3">
                      {e.roles!.map((r: RoleEntry, idx: number) => (
                        <div key={idx} className="relative flex w-full items-start">
                          <div className="flex w-full flex-row items-start justify-between">
                            <div className="flex flex-col items-start">
                              <div className="flex flex-row items-center gap-1">
                                {r.isCareerBreak && <SoupIcon className="size-4" />}
                                <h3 className="text-sm font-medium">{r.role}</h3>
                              </div>
                              {r.description && (
                                <p className="text-muted-foreground w-full max-w-sm text-xs leading-tight">
                                  {r.description}
                                </p>
                              )}
                            </div>
                            <p className="text-muted-foreground text-end text-[11px] whitespace-nowrap">
                              {r.dates.start} - {r.dates.end}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
