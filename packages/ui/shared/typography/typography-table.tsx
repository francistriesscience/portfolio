"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function TypographyTable({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "my-4 w-full overflow-x-auto rounded-lg border border-border/60 bg-card/30 shadow-sm [&_table]:w-full [&_table]:min-w-max [&_table]:border-collapse [&_table]:text-sm [&_tbody_tr:last-child_td]:border-b-0 [&_td]:border-b [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_td]:text-muted-foreground [&_th]:border-b [&_th]:border-border [&_th]:bg-muted/40 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground [&_thead]:border-b [&_tr]:border-border",
      className,
    ),
    "data-slot": "typography-table-wrapper",
  }

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  })
}
