"use client"

import * as React from "react"
import { IconBrandGolang, IconBrandPython, IconBrandTypescript } from "@tabler/icons-react"

import { Badge, PreviewCard, PreviewCardPopup, PreviewCardTrigger } from "@packages/ui/shared"

export function SubtleInfoPreviewCard() {
  return (
    <PreviewCard>
      <PreviewCardTrigger className="text-foreground hover:decoration-foreground cursor-pointer font-medium underline underline-offset-4 transition-colors">
        Francis
      </PreviewCardTrigger>
      <PreviewCardPopup className="border-border bg-background w-80 overflow-hidden p-0 shadow-2xl">
        <div className="flex flex-col">
          <div className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                  Currently
                </span>
                <p className="text-foreground text-sm leading-relaxed">
                  Studying AI Engineering (self-learning)
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                  Most Used Languages
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1.5 px-2 py-0.5">
                    <IconBrandGolang className="h-3.5 w-3.5 text-sky-500" />
                    <span>Go</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1.5 px-2 py-0.5">
                    <IconBrandPython className="h-3.5 w-3.5 text-yellow-500" />
                    <span>Python</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1.5 px-2 py-0.5">
                    <IconBrandTypescript className="h-3.5 w-3.5 text-blue-600" />
                    <span>TypeScript</span>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PreviewCardPopup>
    </PreviewCard>
  )
}
