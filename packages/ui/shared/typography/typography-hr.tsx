"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function TypographyHr({
  className,
  render,
  ...props
}: useRender.ComponentProps<"hr">): React.ReactElement {
  const defaultProps = {
    className: cn("my-8 border-border", className),
    "data-slot": "typography-hr",
  }

  return useRender({
    defaultTagName: "hr",
    props: mergeProps<"hr">(defaultProps, props),
    render,
  })
}
