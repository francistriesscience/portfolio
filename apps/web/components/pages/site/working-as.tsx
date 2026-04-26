"use client"

import {
  Card,
  CardFrame,
  CardFrameHeader,
  CardFrameTitle,
  CardPanel,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  Separator,
} from "@packages/ui/shared"

import { WORKING_AS } from "@portfolio/web/data/working-as"

export function WorkingAs() {
  const isEmpty = WORKING_AS.length === 0

  return (
    <section className="flex flex-col gap-4">
      <div className="flex w-full items-center gap-4">
        <h2 className="text-muted-foreground shrink-0 text-xs font-semibold tracking-widest whitespace-nowrap uppercase">
          Working as
        </h2>
        <Separator className="flex-1" />
      </div>
      {isEmpty ? (
        <Empty className="py-12">
          <EmptyHeader>
            <EmptyTitle>Nothing here... yet.</EmptyTitle>
            <EmptyDescription>Current working roles will show up here.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="flex flex-col gap-4">
          {WORKING_AS.map((work) => (
            <CardFrame key={`${work.company}-${work.role}`} className="w-full">
              {work.availability ? (
                <CardFrameHeader>
                  <CardFrameTitle className="text-muted-foreground text-end text-xs font-semibold tracking-wide uppercase">
                    {work.availability}
                  </CardFrameTitle>
                </CardFrameHeader>
              ) : null}
              <Card>
                <CardPanel>
                  <div className="group relative flex items-start justify-between gap-4 text-sm transition-colors">
                    <div className="flex min-w-0 flex-col gap-1">
                      <h3 className="text-foreground truncate">{work.role}</h3>
                      <p className="text-muted-foreground">
                        {work.startYear} — {work.endYear}
                      </p>
                    </div>
                    <div className="min-w-0 text-right">
                      <p className="text-foreground truncate font-medium">{work.company}</p>
                      <p className="text-muted-foreground truncate">{work.location}</p>
                    </div>
                  </div>
                </CardPanel>
              </Card>
            </CardFrame>
          ))}
        </div>
      )}
    </section>
  )
}
