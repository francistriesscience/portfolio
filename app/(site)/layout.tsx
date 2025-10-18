"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { header, type SkillItem } from "@/data/header"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui"
import { AnimatedThemeToggler } from "@/components/ui/toggler/animated-theme-toggler"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isNotebookPost = pathname.match(/^\/notebooks\/.+$/)
  const isProjectPost = pathname.match(/^\/projects\/.+$/)

  return (
    <div className="mx-auto h-full w-full max-w-3xl p-4 py-16">
      <div className="flex h-full w-full flex-col items-start gap-8">
        {!isNotebookPost && !isProjectPost && (
          <div className="flex flex-col items-start gap-4">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex flex-col items-start">
                <Link href={"/"} className="flex flex-row items-center gap-2">
                  <Avatar className="border-border border">
                    <AvatarImage src={header.avatar} />
                    <AvatarFallback>FI</AvatarFallback>
                  </Avatar>
                  <h1 className="font-georgia text-2xl font-medium tracking-tighter">
                    {header.name}
                  </h1>
                </Link>
                <h2 className="text-muted-foreground text-sm">— {header.subtitle}</h2>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">{header.intro}</p>
            <div className="-mt-2 flex w-full flex-wrap items-start gap-2">
              {header.skills.slice(0, 18).map((skill: SkillItem, index: number) => {
                const IconComponent = skill.icon
                return (
                  <Badge key={index} variant="outline" className="text-xs">
                    <div className="flex items-center gap-1">
                      {IconComponent && <IconComponent className="h-3 w-3" />}
                      <span>{skill.name}</span>
                    </div>
                  </Badge>
                )
              })}
              {header.skills.length > 18 && (
                <Badge variant="secondary" className="text-xs">
                  +{header.skills.length - 18} more
                </Badge>
              )}
            </div>
          </div>
        )}
        {children}
        <div className="mx-auto flex w-full flex-row items-center justify-between gap-2 pt-10">
          <Tooltip>
            <TooltipTrigger asChild>
              <AnimatedThemeToggler />
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle between light and dark theme</p>
            </TooltipContent>
          </Tooltip>
          <div className="text-muted-foreground text-xs">
            Build by{" "}
            <Link
              href="https://linkedin.com/in/francistriesscience"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium underline decoration-dashed underline-offset-2"
            >
              Francis Ignacio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
