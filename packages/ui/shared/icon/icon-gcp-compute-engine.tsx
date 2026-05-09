"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function IconGcpComputeEngine({
  className,
  render,
  ...props
}: useRender.ComponentProps<"svg">): React.ReactElement {
  const defaultProps = {
    className: cn("size-4", className),
    "data-slot": "icon-gcp-compute-engine",
    fill: "none",
    role: "img",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
  }

  return useRender({
    defaultTagName: "svg",
    props: mergeProps<"svg">(defaultProps, {
      ...props,
      children: (
        <>
          <path fill="#AECBFA" d="M9 9h6v6H9z" />
          <path fill="#669DF6" d="M11 2h2v4h-2zM7 2h2v4H7zM15 2h2v4h-2z" />
          <path fill="#4285F4" d="M11 18h2v4h-2zM7 18h2v4H7zM15 18h2v4h-2zM18 13v-2h4v2zM18 17v-2h4v2zM18 9V7h4v2z" />
          <path fill="#669DF6" d="M2 13v-2h4v2zM2 17v-2h4v2zM2 9V7h4v2z" />
          <path fill="#AECBFA" d="M5 5v14h14V5Zm12 12H7V7h10Z" />
          <path fill="#669DF6" d="M9 15h6l-3-3-3 3z" />
          <path fill="#4285F4" d="m12 12 3 3V9l-3 3z" />
        </>
      ),
    }),
    render,
  })
}
