"use client"

import { cn } from "@packages/ui/lib/utils"
import * as React from "react"

export function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex flex-col gap-2 p-6 text-center max-sm:pb-4 sm:text-left", className)}
      data-slot="alert-dialog-header"
      {...props}
    />
  )
}
