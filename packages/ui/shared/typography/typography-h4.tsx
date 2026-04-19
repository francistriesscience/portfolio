"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function TypographyH4({
  className,
  render,
  ...props
}: useRender.ComponentProps<"h4">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "scroll-m-20 mt-6 mb-2 text-lg font-semibold tracking-tight text-foreground",
      className,
    ),
    "data-slot": "typography-h4",
  }

  return useRender({
    defaultTagName: "h4",
    props: mergeProps<"h4">(defaultProps, props),
    render,
  })
}
