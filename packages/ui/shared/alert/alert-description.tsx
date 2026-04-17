import * as React from "react"

import { cn } from "@packages/ui/lib/utils"

export function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("text-muted-foreground flex flex-col gap-2.5 [svg~&]:col-start-2", className)}
      data-slot="alert-description"
      {...props}
    />
  )
}
