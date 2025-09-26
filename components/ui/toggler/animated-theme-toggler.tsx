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
  const isDarkRef = React.useRef(isDark)

  React.useEffect(() => {
    isDarkRef.current = isDark
  }, [isDark])

  React.useEffect(() => {
    const updateTheme = () => {
      const currentDark = document.documentElement.classList.contains("dark")
      setIsDark(currentDark)
      isDarkRef.current = currentDark
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = React.useCallback(async (event?: React.MouseEvent) => {
    event?.preventDefault()
    event?.stopPropagation()

    try {
      const currentDark = isDarkRef.current
      const newTheme = !currentDark
      const startViewTransition = (
        document as { startViewTransition?: (callback: () => void) => { ready: Promise<void> } }
      ).startViewTransition

      const button = buttonRef.current
      if (!button) return

      if (typeof window === "undefined" || typeof document === "undefined") return

      const updateTheme = () => {
        isDarkRef.current = newTheme
        setIsDark(newTheme)
        document.documentElement.classList.toggle("dark", newTheme)

        try {
          if (typeof localStorage !== "undefined") {
            localStorage.setItem("theme", newTheme ? "dark" : "light")
          }
        } catch {}
      }

      if (typeof startViewTransition === "function") {
        await startViewTransition(() => {
          flushSync(updateTheme)
        }).ready

        try {
          const { top, left, width, height } = button.getBoundingClientRect()
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
        } catch {}
      } else {
        updateTheme()
      }
    } catch {
      const currentDark = isDarkRef.current
      const newTheme = !currentDark
      isDarkRef.current = newTheme
      setIsDark(newTheme)
      document.documentElement.classList.toggle("dark", newTheme)

      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("theme", newTheme ? "dark" : "light")
        }
      } catch {}
    }
  }, [])

  return (
    <button ref={buttonRef} onClick={toggleTheme} className={cn(className, "cursor-pointer")}>
      {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </button>
  )
}
