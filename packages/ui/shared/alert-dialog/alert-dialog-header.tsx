"use client"

import * as React from "react"

import { cn } from "@packages/ui/lib/utils"

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
