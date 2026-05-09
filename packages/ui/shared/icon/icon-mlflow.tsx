"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function IconMLflow({
  className,
  render,
  ...props
}: useRender.ComponentProps<"svg">): React.ReactElement {
  const defaultProps = {
    className: cn("h-4 w-auto", className),
    "data-slot": "icon-mlflow",
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
          <title>MLflow</title>
          <path
            fill="currentColor"
            d="M11.883.002a12.044 12.044 0 0 0-9.326 19.463l3.668-2.694A7.573 7.573 0 0 1 12.043 4.45v2.867l6.908-5.14A12.012 12.012 0 0 0 11.883.002zm9.562 4.533L17.777 7.23a7.573 7.573 0 0 1-5.818 12.322v-2.867l-6.908 5.14a12.046 12.046 0 0 0 16.394-17.29z"
          />
        </>
      ),
    }),
    render,
  })
}
