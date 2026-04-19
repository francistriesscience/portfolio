"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function TypographyPre({
  className,
  render,
  ...props
}: useRender.ComponentProps<"pre">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "overflow-x-auto rounded-2xl border border-border bg-neutral-950 px-4 py-4 font-mono text-sm text-neutral-50 shadow-sm [&_code]:block [&_code]:whitespace-pre [&_code]:rounded-none [&_code]:bg-transparent [&_code]:p-0 [&_code]:font-normal [&_code]:text-inherit [&_code]:shadow-none",
      className,
    ),
    "data-slot": "typography-pre",
  }

  return useRender({
    defaultTagName: "pre",
    props: mergeProps<"pre">(defaultProps, props),
    render,
  })
}
