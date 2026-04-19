"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function TypographySmall({
  className,
  render,
  ...props
}: useRender.ComponentProps<"small">): React.ReactElement {
  const defaultProps = {
    className: cn("text-sm leading-none font-medium text-muted-foreground", className),
    "data-slot": "typography-small",
  }

  return useRender({
    defaultTagName: "small",
    props: mergeProps<"small">(defaultProps, props),
    render,
  })
}
