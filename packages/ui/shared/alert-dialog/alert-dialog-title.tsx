"use client"

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import * as React from "react"

import { cn } from "@packages/ui/lib/utils"

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
