"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function TypographyBlockquote({
  className,
  render,
  ...props
}: useRender.ComponentProps<"blockquote">): React.ReactElement {
  const defaultProps = {
    className: cn("border-l-2 border-border pl-4 italic", className),
    "data-slot": "typography-blockquote",
  }

  return useRender({
    defaultTagName: "blockquote",
    props: mergeProps<"blockquote">(defaultProps, props),
    render,
  })
}
