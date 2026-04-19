import * as React from "react"

import { cn } from "@packages/ui/lib/utils"

export function TypographyProse({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">): React.ReactElement {
  return (
    <div
      className={cn("text-muted-foreground flex flex-col gap-6 text-sm leading-7", className)}
      data-slot="typography-prose"
      {...props}
    >
      {children}
    </div>
  )
}
