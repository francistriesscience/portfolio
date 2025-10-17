import * as React from "react"
import Link from "next/link"

import { socials } from "@/data/socials"
import { renderIcon } from "@/helper/render-icon"

import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui"

export function ConnectSection() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <h2 className="text-xl font-medium">Connect</h2>
      <div className="flex flex-col items-start gap-4">
        <div className="text-muted-foreground flex flex-row flex-wrap items-center gap-1.5 text-sm">
          <span className="whitespace-nowrap">Slide into my inbox at</span>
          <Link
            className="text-primary flex items-center gap-2 underline decoration-dashed underline-offset-2"
            href={"mailto:hello@francistries.science"}
          >
            <span>hello@francistries.science</span>
          </Link>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2">
          <div className="text-muted-foreground flex flex-row items-center gap-2">
            {socials.map((social) => {
              const urlWithoutProtocol = social.tooltip
              return (
                <Tooltip key={social.name}>
                  <TooltipTrigger asChild>
                    <Link
                      target="_blank"
                      className="text-primary underline underline-offset-4"
                      href={social.url}
                    >
                      {renderIcon(social.icon)}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{urlWithoutProtocol}</span>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
          <span className="text-muted-foreground text-xs">you can also find me on these</span>
        </div>
      </div>
    </div>
  )
}
