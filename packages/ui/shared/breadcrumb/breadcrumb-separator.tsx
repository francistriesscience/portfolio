"use client"

import type * as React from "react"

import { IconChevronRight } from "@tabler/icons-react"

import { cn } from "@packages/ui/lib/utils"

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">): React.ReactElement {
  return (
    <li
      aria-hidden="true"
      className={cn("opacity-80 [&>svg]:size-4", className)}
      data-slot="breadcrumb-separator"
      role="presentation"
      {...props}
    >
      {children ?? <IconChevronRight />}
    </li>
  )
}
