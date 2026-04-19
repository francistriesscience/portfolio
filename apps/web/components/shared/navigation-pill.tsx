"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"

import { Badge, FXAnimatedThemeToggler } from "@packages/ui/shared"
import { cn } from "@packages/ui/lib/utils"

import { NAV_ITEMS } from "@/data/nav-menu"

export function NavigationPill() {
  const pathname = usePathname()

  return (
    <header className="fixed top-8 left-1/2 z-50 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2">
      <nav className="border-border bg-secondary/50 flex items-center rounded-full border p-1 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-1 overflow-x-auto mask-[linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none] sm:mask-none [&::-webkit-scrollbar]:hidden">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="navigation-pill-active"
                    className="bg-secondary absolute inset-0 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.7 }}
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" size="sm" className="relative z-10">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </div>
        <div className="bg-border mx-1 h-4 w-px shrink-0" />
        <FXAnimatedThemeToggler className="text-muted-foreground hover:text-foreground shrink-0 p-1.5 transition-colors" />
      </nav>
    </header>
  )
}
