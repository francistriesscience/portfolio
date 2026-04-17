import * as React from "react"

import { cn } from "@packages/ui/lib/utils"

export function Empty({ className, ...props }: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 px-6 py-12 text-center text-balance md:py-20",
        className,
      )}
      data-slot="empty"
      {...props}
    />
  )
}
