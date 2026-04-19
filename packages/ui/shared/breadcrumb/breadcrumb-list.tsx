"use client"

import type * as React from "react"

import { cn } from "@packages/ui/lib/utils"

export function BreadcrumbList({
  className,
  ...props
}: React.ComponentProps<"ol">): React.ReactElement {
  return (
    <ol
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm wrap-break-word",
        className,
      )}
      data-slot="breadcrumb-list"
      {...props}
    />
  )
}
