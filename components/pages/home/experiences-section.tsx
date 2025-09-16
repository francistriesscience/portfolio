import * as React from "react"
import Link from "next/link"
import { LinkedinIcon } from "lucide-react"

import experiencesData from "@/data/experiences.json"

import { Card, CardContent } from "@/components/ui"

export function ExperiencesSection() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <h2 className="text-xl font-medium">Experiences</h2>
      <div className="flex w-full flex-col gap-2">
        {experiencesData.map((e, i) => {
          const start = e.dates?.start ?? ""
          const end = e.dates?.end ?? ""
          const range = start && end ? `${start} - ${end}` : start || end || ""

          return (
            <Card key={i} className="rounded-xl bg-transparent p-0">
              <CardContent className="flex w-full items-start justify-between p-3">
                <div className="flex flex-col items-start">
                  <h3 className="font-medium">{e.role}</h3>
                  <p className="text-muted-foreground text-sm">
                    {e.company} — {e.location}
                  </p>
                </div>
                <p className="text-muted-foreground text-xs">{range}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <div className="flex w-full justify-end">
        <Link
          className="text-muted-foreground flex flex-row items-center gap-1 text-xs"
          href={"https://www.linkedin.com/in/noeyislearning"}
        >
          View more on LinkedIn
          <LinkedinIcon className="size-3" />
        </Link>
      </div>
    </div>
  )
}
