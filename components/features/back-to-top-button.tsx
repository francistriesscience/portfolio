"use client"

import * as React from "react"
import { ArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui"

export function BackToTopButton() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset
      setVisible(y > 300)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!visible) return null

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <Button
        onClick={handleClick}
        aria-label="Back to top"
        className="bg-primary text-primary-foreground inline-flex h-8 w-8 items-center justify-center rounded-full p-0 shadow-xl transition-transform hover:scale-105"
      >
        <ArrowUpIcon className="size-4" />
      </Button>
    </div>
  )
}
