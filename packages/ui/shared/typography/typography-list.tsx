"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function TypographyList({
  className,
  render,
  ...props
}: useRender.ComponentProps<"ul">): React.ReactElement {
  const defaultProps = {
    className: cn("my-0 list-disc pl-8 leading-relaxed", className),
    "data-slot": "typography-list",
  }

  return useRender({
    defaultTagName: "ul",
    props: mergeProps<"ul">(defaultProps, props),
    render,
  })
}
