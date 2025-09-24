import * as React from "react"
import Link from "next/link"

import experiencesData from "@/data/experiences.json"

import { Card, CardContent } from "@/components/ui"

export function ExperiencesSection() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium">Experiences</h2>
        <div className="flex w-full justify-end">
          <Link
            className="text-muted-foreground hover:text-primary flex flex-row items-center gap-1 text-xs underline decoration-dashed underline-offset-2"
            href={"https://www.linkedin.com/in/noeyislearning"}
          >
            View more on LinkedIn
          </Link>
        </div>
      </div>
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
    </div>
  )
}
