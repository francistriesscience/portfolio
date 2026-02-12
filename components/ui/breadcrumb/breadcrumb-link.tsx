import * as React from "react"
import Link from "next/link"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

export function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<typeof Link> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : Link

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}
