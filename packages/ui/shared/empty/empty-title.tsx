import * as React from "react"

import { cn } from "@packages/ui/lib/utils"

export function EmptyTitle({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div className={cn("text-lg font-medium", className)} data-slot="empty-title" {...props} />
}
