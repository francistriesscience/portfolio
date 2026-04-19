import * as React from "react"

import { cn } from "@packages/ui/lib/utils"

export function TypographyEyebrow({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-2 text-xs font-medium tracking-widest uppercase",
        className,
      )}
      data-slot="typography-eyebrow"
      {...props}
    >
      {children}
    </div>
  )
}
