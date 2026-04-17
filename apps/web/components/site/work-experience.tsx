"use client"

import {
  Card,
  CardFrame,
  CardFrameHeader,
  CardFrameTitle,
  CardPanel,
  Separator,
} from "@packages/ui/shared"

export function WorkExperience() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex w-full items-center gap-4">
        <h2 className="text-muted-foreground shrink-0 text-xs font-semibold tracking-widest whitespace-nowrap uppercase">
          Working as
        </h2>
        <Separator className="flex-1" />
      </div>
      <CardFrame className="w-full">
        <CardFrameHeader>
          <CardFrameTitle className="text-muted-foreground text-end text-xs font-semibold tracking-wide uppercase">
            Got an offer?
          </CardFrameTitle>
        </CardFrameHeader>
        <Card>
          <CardPanel>
            <div className="group relative flex items-start justify-between text-sm transition-colors">
              <div className="flex flex-col gap-1">
                <h3 className="text-foreground">Technical Lead</h3>
                <p className="text-muted-foreground">2026 — Present</p>
              </div>
              <div className="text-right">
                <p className="text-foreground font-medium">Mnemora</p>
                <p className="text-muted-foreground">Pampanga, Philippines</p>
              </div>
            </div>
          </CardPanel>
        </Card>
      </CardFrame>
    </section>
  )
}
