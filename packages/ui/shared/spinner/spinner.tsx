import * as React from "react"

import { IconLoader } from "@tabler/icons-react"

import { cn } from "@packages/ui/lib/utils"

export function Spinner({
  className,
  ...props
}: React.ComponentProps<typeof IconLoader>): React.ReactElement {
  return (
    <IconLoader
      aria-label="Loading"
      className={cn("animate-spin", className)}
      role="status"
      {...props}
    />
  )
}
