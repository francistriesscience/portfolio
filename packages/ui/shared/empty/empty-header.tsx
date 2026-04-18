import * as React from "react"

import { cn } from "@packages/ui/lib/utils"

export function EmptyHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex max-w-sm flex-col items-center text-center", className)}
      data-slot="empty-header"
      {...props}
    />
  )
}
