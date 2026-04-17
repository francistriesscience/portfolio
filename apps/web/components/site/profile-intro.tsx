"use client"

import * as React from "react"
import Link from "next/link"
import {
  AvatarStatusDot,
  Badge,
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@packages/ui/shared"
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconGitBranch,
  IconBrandGolang,
  IconBrandPython,
  IconBrandTypescript,
} from "@tabler/icons-react"

export function ProfileIntro() {
  return (
    <section className="flex items-center gap-4">
      <AvatarStatusDot
        src="https://avatars.githubusercontent.com/u/239557641?v=4"
        alt="Francis"
        fallback="FN"
        size="md"
      />
      <p className="text-muted-foreground text-md leading-relaxed">
        <span className="text-muted-foreground">
          You there! Hello, I&apos;m{" "}
          <PreviewCard>
            <PreviewCardTrigger className="text-foreground hover:decoration-foreground cursor-pointer font-medium underline underline-offset-4 transition-colors">
              Francis
            </PreviewCardTrigger>
            <PreviewCardPopup className="border-border bg-background w-80 overflow-hidden p-0 shadow-2xl">
              <div className="flex flex-col">
                <div className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                        Currently
                      </span>
                      <p className="text-foreground text-sm leading-relaxed">
                        Studying AI Engineering (self-learning)
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                        Most Used Languages
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1.5 px-2 py-0.5">
                          <IconBrandGolang className="h-3.5 w-3.5 text-sky-500" />
                          <span>Go</span>
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1.5 px-2 py-0.5">
                          <IconBrandPython className="h-3.5 w-3.5 text-yellow-500" />
                          <span>Python</span>
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1.5 px-2 py-0.5">
                          <IconBrandTypescript className="h-3.5 w-3.5 text-blue-600" />
                          <span>TypeScript</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PreviewCardPopup>
          </PreviewCard>
        </span>
        , and I love building thoughtful products at scale.
      </p>
    </section>
  )
}
