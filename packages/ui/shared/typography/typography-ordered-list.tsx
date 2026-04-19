"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function TypographyOrderedList({
  className,
  render,
  ...props
}: useRender.ComponentProps<"ol">): React.ReactElement {
  const defaultProps = {
    className: cn("my-0 list-decimal leading-relaxed space-y-2 pl-6", className),
    "data-slot": "typography-ordered-list",
  }

  return useRender({
    defaultTagName: "ol",
    props: mergeProps<"ol">(defaultProps, props),
    render,
  })
}
