"use client"

import * as React from "react"
import Link from "next/link"

import { SOCIAL_LINKS } from "@/data/socials"

import { Tooltip, TooltipPopup, TooltipTrigger } from "@packages/ui/shared"

export function Footer() {
  const [time, setTime] = React.useState<string>("")

  React.useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Manila",
          hour12: true,
        }),
      )
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="flex flex-col gap-4 py-16">
      <div className="text-muted-foreground flex flex-wrap gap-6 text-sm font-medium">
        {SOCIAL_LINKS.map((link) => (
          <Tooltip key={link.label}>
            <TooltipTrigger
              render={
                <Link
                  href={link.href}
                  target="_blank"
                  className="hover:text-foreground flex items-center gap-1 transition-colors"
                />
              }
            >
              <link.Icon className="h-4 w-4" />
              <span>{link.label}</span>
            </TooltipTrigger>
            <TooltipPopup>{link.handler}</TooltipPopup>
          </Tooltip>
        ))}
      </div>

      <div className="text-muted-foreground/60 flex items-center justify-between text-xs">
        <p suppressHydrationWarning>© {new Date().getFullYear()} — francistriesscience</p>
        <p suppressHydrationWarning>Manila, PH — {time}</p>
      </div>
    </footer>
  )
}
