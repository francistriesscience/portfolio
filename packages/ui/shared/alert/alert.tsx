import { type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@packages/ui/lib/utils"
import { alertVariants } from "@packages/ui/shared/variants"

export function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>): React.ReactElement {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      data-slot="alert"
      role="alert"
      {...props}
    />
  )
}
