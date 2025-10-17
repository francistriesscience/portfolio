"use client"

import * as React from "react"
import { ArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui"

export default function BackToTopButton() {
  const [visible, setVisible] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset
      const doc = document.documentElement
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        doc.scrollHeight,
        document.body.offsetHeight,
        doc.offsetHeight,
        document.body.clientHeight,
        doc.clientHeight,
      )
      const maxScroll = Math.max(0, scrollHeight - window.innerHeight)
      const pct = maxScroll > 0 ? Math.min(1, y / maxScroll) : 0
      setProgress(pct)
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

  const size = 40
  const stroke = 2.5
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - progress)

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <Button
        onClick={handleClick}
        aria-label="Back to top"
        className="bg-primary text-primary-foreground relative inline-flex h-10 w-10 items-center justify-center rounded-full p-0 shadow-lg transition-transform hover:scale-105"
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="pointer-events-none absolute top-0 left-0"
          style={{ width: "100%", height: "100%" }}
          aria-hidden
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="white"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
              transition: "stroke-dashoffset 0.1s ease-out",
            }}
          />
        </svg>

        <span className="relative z-10">
          <ArrowUpIcon className="size-4" />
        </span>
      </Button>
    </div>
  )
}
