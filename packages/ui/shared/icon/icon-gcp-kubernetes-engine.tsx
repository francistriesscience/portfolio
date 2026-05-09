"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function IconGcpKubernetesEngine({
  className,
  render,
  ...props
}: useRender.ComponentProps<"svg">): React.ReactElement {
  const defaultProps = {
    className: cn("size-4", className),
    "data-slot": "icon-gcp-kubernetes-engine",
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
          <path fill="#4285F4" fillRule="evenodd" d="m14.68 13.06 4.55 2.63v.99l-4.94-2.85.39-.77z" />
          <path fill="#669DF6" fillRule="evenodd" d="m9.98 13.65-5.21 3.01-.32-.8 5.08-2.94.45.73z" />
          <path fill="#AECBFA" d="M11.55 3.29h.86v5.78h-.86z" />
          <path fill="#AECBFA" fillRule="evenodd" d="M3.25 7v10L12 22l8.74-5V7L12 2Zm15.63 8.89L12 19.78l-6.88-3.89V8.11L12 4.22l6.87 3.89v7.78Z" />
          <path fill="#AECBFA" fillRule="evenodd" d="m11.98 11.5 3.98-2.29-3.98-2.3-3.97 2.3 3.97 2.29z" />
          <path fill="#669DF6" fillRule="evenodd" d="m11.52 12.3-3.86-2.29v4.59l3.86 2.29V12.3z" />
          <path fill="#4285F4" fillRule="evenodd" d="M12.48 12.3v4.59l3.86-2.29v-4.59l-3.86 2.29z" />
        </>
      ),
    }),
    render,
  })
}
