"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function IconNextjs({
  className,
  render,
  ...props
}: useRender.ComponentProps<"svg">): React.ReactElement {
  const defaultProps = {
    className: cn("size-4", className),
    "data-slot": "icon-nextjs",
    role: "img",
    viewBox: "0 0 180 180",
    xmlns: "http://www.w3.org/2000/svg",
  }

  return useRender({
    defaultTagName: "svg",
    props: mergeProps<"svg">(defaultProps, {
      ...props,
      children: (
        <>
          <title>Next.js</title>
          <mask
            id="nextjs-mask"
            width="180"
            height="180"
            x="0"
            y="0"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
          >
            <circle cx="90" cy="90" r="90" fill="black" />
          </mask>
          <g mask="url(#nextjs-mask)">
            <circle cx="90" cy="90" r="90" fill="black" />
            <path
              d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
              fill="url(#nextjs-paint0)"
            />
            <rect x="115" y="54" width="12" height="72" fill="url(#nextjs-paint1)" />
          </g>
          <defs>
            <linearGradient
              id="nextjs-paint0"
              x1="109"
              x2="144.5"
              y1="116.5"
              y2="160.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="nextjs-paint1"
              x1="121"
              x2="120.799"
              y1="54"
              y2="106.875"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </>
      ),
    }),
    render,
  })
}
