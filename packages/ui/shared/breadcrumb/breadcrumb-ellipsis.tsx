"use client"

import type * as React from "react"

import { IconDots } from "@tabler/icons-react"

export function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return (
    <span
      aria-hidden="true"
      className={className}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      {...props}
    >
      <IconDots className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}
