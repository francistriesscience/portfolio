"use client"

import * as React from "react"

import { AvatarStatusDot } from "@packages/ui/shared"
import { SubtleInfoPreviewCard } from "@/components/pages/site/_preview-card/subtle-info-preview-card"

export function ProfileIntro() {
  return (
    <section className="flex items-center gap-4">
      <AvatarStatusDot src="/img/profile.webp" alt="Francis" fallback="FR" size="md" />
      <p className="text-muted-foreground text-md leading-tight">
        <span className="text-muted-foreground">
          Hello, I&apos;m <SubtleInfoPreviewCard />
        </span>
        , and I enjoy building thoughtful digital experiences while constantly learning along the
        way.
      </p>
    </section>
  )
}
