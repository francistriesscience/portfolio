"use client"

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { cn } from "@packages/ui/lib/utils"
import * as React from "react"

export function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.Title.Props): React.ReactElement {
  return (
    <AlertDialogPrimitive.Title
      className={cn("font-heading text-xl leading-none font-semibold", className)}
      data-slot="alert-dialog-title"
      {...props}
    />
  )
}
