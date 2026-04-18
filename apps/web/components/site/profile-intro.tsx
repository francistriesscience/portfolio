"use client"

import * as React from "react"

import { AvatarStatusDot } from "@packages/ui/shared"
import { SubtleInfoPreviewCard } from "./_preview-card/subtle-info-preview-card"

export function ProfileIntro() {
  return (
    <section className="flex items-center gap-4">
      <AvatarStatusDot src="/img/profile.webp" alt="Francis" fallback="FR" size="md" />
      <p className="text-muted-foreground text-md leading-tight">
        <span className="text-muted-foreground">
          You there! Hello, I&apos;m <SubtleInfoPreviewCard />
        </span>
        , and I love building thoughtful products at scale.
      </p>
    </section>
  )
}
