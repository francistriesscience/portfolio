"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function IconVercel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"svg">): React.ReactElement {
  const defaultProps = {
    className: cn("h-4 w-auto", className),
    "data-slot": "icon-vercel",
    fill: "none",
    preserveAspectRatio: "xMidYMid",
    role: "img",
    viewBox: "0 0 256 222",
    xmlns: "http://www.w3.org/2000/svg",
  }

  return useRender({
    defaultTagName: "svg",
    props: mergeProps<"svg">(defaultProps, {
      ...props,
      children: <path fill="#000" d="m128 0 128 221.705H0z" />,
    }),
    render,
  })
}
