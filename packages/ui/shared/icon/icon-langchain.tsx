"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function IconLangChain({
  className,
  render,
  ...props
}: useRender.ComponentProps<"svg">): React.ReactElement {
  const defaultProps = {
    className: cn("size-4", className),
    "data-slot": "icon-langchain",
    role: "img",
    viewBox: "0 0 120 120",
    xmlns: "http://www.w3.org/2000/svg",
  }

  return useRender({
    defaultTagName: "svg",
    props: mergeProps<"svg">(defaultProps, {
      ...props,
      children: (
        <>
          <title>LangChain</title>
          <path fill="#030710" d="M37.7,79.9c7.1-7.1,11-16.6,11-26.6s-4-19.6-11-26.6L11,0C4,7.1,0,16.6,0,26.6s4,19.6,11,26.6l26.6,26.6h0Z"/>
          <path fill="#030710" d="M93.4,82.3c-7.1-7.1-16.6-11-26.6-11s-19.6,4-26.6,11l26.6,26.6c7.1,7.1,16.6,11,26.6,11s19.6-4,26.6-11l-26.6-26.6h0Z"/>
          <path fill="#030710" d="M11.1,108.9c7.1,7.1,16.6,11,26.6,11v-37.7H0c0,10,4,19.6,11,26.6Z"/>
          <path fill="#030710" d="M103.7,43c-7.1-7.1-16.6-11-26.6-11-10,0-19.6,4-26.6,11l26.6,26.6,26.6-26.6Z"/>
        </>
      ),
    }),
    render,
  })
}
