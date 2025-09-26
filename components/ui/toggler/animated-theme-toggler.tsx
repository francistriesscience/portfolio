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

    if (!buttonRef.current) return

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof (document as any).startViewTransition === "function") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (document as any).startViewTransition(() => {
          flushSync(() => {
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
          })
        }).ready

        try {
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
        } catch (animationError) {
          console.warn("View transition animation failed:", animationError)
        }
      } else {
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

        try {
          const button = buttonRef.current
          if (button) {
            button.style.transform = "scale(0.95)"
            setTimeout(() => {
              button.style.transform = "scale(1)"
            }, 150)
          }
        } catch {}
      }
    } catch (error) {
      console.warn("Theme toggle failed:", error)
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
  }, []) // No dependencies needed since we use refs

  return (
    <button ref={buttonRef} onClick={toggleTheme} className={cn(className, "cursor-pointer")}>
      {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </button>
  )
}
