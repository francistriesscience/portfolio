"use client"

import type * as React from "react"

import { cn } from "@packages/ui/lib/utils"

export function BreadcrumbPage({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return (
    <span
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      data-slot="breadcrumb-page"
      {...props}
    />
  )
}
