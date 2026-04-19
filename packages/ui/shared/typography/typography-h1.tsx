"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function TypographyH1({
  className,
  render,
  ...props
}: useRender.ComponentProps<"h1">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "scroll-m-20 font-heading text-2xl font-semibold tracking-tight text-balance text-foreground ",
      className,
    ),
    "data-slot": "typography-h1",
  }

  return useRender({
    defaultTagName: "h1",
    props: mergeProps<"h1">(defaultProps, props),
    render,
  })
}
