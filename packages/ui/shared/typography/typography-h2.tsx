"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function TypographyH2({
  className,
  render,
  ...props
}: useRender.ComponentProps<"h2">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "scroll-m-20 text-xl font-semibold tracking-tight text-foreground first:mt-0",
      className,
    ),
    "data-slot": "typography-h2",
  }

  return useRender({
    defaultTagName: "h2",
    props: mergeProps<"h2">(defaultProps, props),
    render,
  })
}
