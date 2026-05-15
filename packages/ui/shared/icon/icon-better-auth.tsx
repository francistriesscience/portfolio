"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function IconBetterAuth({
  className,
  render,
  ...props
}: useRender.ComponentProps<"svg">): React.ReactElement {
  const defaultProps = {
    className: cn("h-4 w-auto", className),
    "data-slot": "icon-better-auth",
    role: "img",
    viewBox: "0 0 500 500",
    xmlns: "http://www.w3.org/2000/svg",
  }

  return useRender({
    defaultTagName: "svg",
    props: mergeProps<"svg">(defaultProps, {
      ...props,
      children: (
        <>
          <title>Better Auth</title>
          <path fill="#fff" d="M0 0h500v500H0z" />
          <path fill="#000" d="M69 121h86.988v259H69zM337.575 121H430v259h-92.425z" />
          <path fill="#000" d="M427.282 121v83.456h-174.52V121zM430 296.544V380H252.762v-83.456z" />
          <path fill="#000" d="M252.762 204.455v92.089h-96.774v-92.089z" />
        </>
      ),
    }),
    render,
  })
}
