"use client"

import * as React from "react"
import { IconArrowUp } from "@tabler/icons-react"

import { AnimatedCircularProgressBar } from "@packages/ui/shared"
import { cn } from "@packages/ui/lib/utils"

const VISIBILITY_SCROLL_OFFSET = 240

function getScrollProgress() {
  if (typeof window === "undefined") {
    return { isVisible: false, progress: 0 }
  }

  const scrollTop = window.scrollY
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = scrollHeight <= 0 ? 0 : Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100))

  return {
    isVisible: scrollTop > VISIBILITY_SCROLL_OFFSET,
    progress,
  }
}

export function BackToTop() {
  const [{ isVisible, progress }, setState] = React.useState(() => getScrollProgress())

  React.useEffect(() => {
    const updateScrollState = () => {
      setState(getScrollProgress())
    }

    updateScrollState()
    window.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState)

    return () => {
      window.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
      className={cn(
        "fixed right-6 bottom-6 z-40 rounded-full transition-all duration-300",
        "focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <AnimatedCircularProgressBar
        value={progress}
        max={100}
        min={0}
        showValue={false}
        gaugePrimaryColor="var(--color-foreground)"
        gaugeSecondaryColor="color-mix(in oklab, var(--color-border) 75%, transparent)"
        className="bg-background/85 text-foreground size-14 rounded-full border border-border/70 p-1 shadow-lg backdrop-blur-sm"
      >
        <IconArrowUp className="size-4" />
      </AnimatedCircularProgressBar>
    </button>
  )
}
