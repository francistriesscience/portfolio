"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function TypographyInlineCode({
  className,
  render,
  ...props
}: useRender.ComponentProps<"code">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "bg-muted relative rounded-md px-1.5 py-0.5 font-mono text-[0.92em] text-foreground",
      className,
    ),
    "data-slot": "typography-inline-code",
  }

  return useRender({
    defaultTagName: "code",
    props: mergeProps<"code">(defaultProps, props),
    render,
  })
}
