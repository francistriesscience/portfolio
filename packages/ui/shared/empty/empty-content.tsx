import * as React from "react"

import { cn } from "@packages/ui/lib/utils"

export function EmptyContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className,
      )}
      data-slot="empty-content"
      {...props}
    />
  )
}
