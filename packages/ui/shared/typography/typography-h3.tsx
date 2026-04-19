"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function TypographyH3({
  className,
  render,
  ...props
}: useRender.ComponentProps<"h3">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "scroll-m-20 mt-8 mb-2 text-lg font-semibold tracking-tight text-foreground",
      className,
    ),
    "data-slot": "typography-h3",
  }

  return useRender({
    defaultTagName: "h3",
    props: mergeProps<"h3">(defaultProps, props),
    render,
  })
}
