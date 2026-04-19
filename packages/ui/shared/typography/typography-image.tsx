"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function TypographyImage({
  className,
  render,
  ...props
}: useRender.ComponentProps<"img">): React.ReactElement {
  const defaultProps = {
    className: cn("my-6 block max-w-full rounded-2xl border border-border shadow-sm", className),
    "data-slot": "typography-image",
  }

  return useRender({
    defaultTagName: "img",
    props: mergeProps<"img">(defaultProps, props),
    render,
  })
}
