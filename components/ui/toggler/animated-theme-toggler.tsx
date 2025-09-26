"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

export const AnimatedThemeToggler = ({ className }: Props) => {
  const [isDark, setIsDark] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = React.useCallback(async () => {
    if (!buttonRef.current) return

    const startViewTransition = (
      document as { startViewTransition?: (callback: () => void) => { ready: Promise<void> } }
    ).startViewTransition

    if (typeof startViewTransition === "function") {
      await startViewTransition(() => {
        flushSync(() => {
          const newTheme = !isDark
          setIsDark(newTheme)
          document.documentElement.classList.toggle("dark")
          localStorage.setItem("theme", newTheme ? "dark" : "light")
        })
      }).ready
    } else {
      const newTheme = !isDark
      setIsDark(newTheme)
      document.documentElement.classList.toggle("dark")
      localStorage.setItem("theme", newTheme ? "dark" : "light")
    }

    if (typeof startViewTransition === "function") {
      const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
      const x = left + width / 2
      const y = top + height / 2
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top),
      )

      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      )
    }
  }, [isDark])

  return (
    <button ref={buttonRef} onClick={toggleTheme} className={cn(className, "cursor-pointer")}>
      {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </button>
  )
}
