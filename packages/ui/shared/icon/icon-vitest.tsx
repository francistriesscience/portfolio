"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function IconVitest({
  className,
  render,
  ...props
}: useRender.ComponentProps<"svg">): React.ReactElement {
  const defaultProps = {
    className: cn("h-4 w-auto", className),
    "data-slot": "icon-vitest",
    role: "img",
    viewBox: "0 0 45 43",
    xmlns: "http://www.w3.org/2000/svg",
  }

  return useRender({
    defaultTagName: "svg",
    props: mergeProps<"svg">(defaultProps, {
      ...props,
      children: (
        <>
          <title>Vitest</title>
          <path
            fill="#22ff84"
            d="M21.266 42.207a1.13 1.13 0 0 1-1.652.36L.465 28.64A1.13 1.13 0 0 1 0 27.724V10.94c0-.924 1.05-1.458 1.797-.915l11.712 8.517a2.262 2.262 0 0 0 3.302-.72l9.7-17.244c.2-.355.578-.577.987-.577h15.575c.865 0 1.41.933.986 1.687L21.266 42.205Z"
          />
          <mask id="vitest-mask0" width="45" height="43" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }}>
            <path
              fill="#000"
              d="M21.266 42.207a1.13 1.13 0 0 1-1.652.36L.465 28.64A1.13 1.13 0 0 1 0 27.724V10.94c0-.924 1.05-1.459 1.797-.916l11.712 8.518a2.262 2.262 0 0 0 3.302-.72l9.7-17.244c.2-.355.578-.577.987-.577h15.575c.865 0 1.41.933.986 1.687L21.266 42.204Z"
            />
          </mask>
          <g mask="url(#vitest-mask0)">
            <g filter="url(#vitest-filter0)">
              <ellipse cx="14.031" cy="3.391" rx="14.031" ry="3.391" fill="#00ccc6" transform="rotate(130.547 17.088 5.676) scale(1 -1)" />
            </g>
            <g filter="url(#vitest-filter1)">
              <ellipse cx="14.031" cy="6.087" rx="14.031" ry="6.087" fill="#00ccc6" transform="rotate(53.967 -28.777 34.573) scale(-1 1)" />
            </g>
            <g filter="url(#vitest-filter2)">
              <ellipse cx="6.443" cy="12.195" rx="6.374" ry="5.551" fill="#7f0" transform="rotate(23.13 6.443 12.195)" />
            </g>
            <g filter="url(#vitest-filter3)">
              <ellipse cx="40.775" cy="15.951" rx="5.615" ry="24.534" fill="#7f0" transform="rotate(23.13 40.775 15.95)" />
            </g>
            <g filter="url(#vitest-filter4)">
              <ellipse cx="4.985" cy="10.069" rx="4.985" ry="10.069" fill="#97ffe2" transform="rotate(135 17.458 13.64) scale(-1 1)" />
            </g>
          </g>
          <defs>
            <filter id="vitest-filter0" width="37.343" height="40.162" x="7.293" y="-10.833" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_2002_17204" stdDeviation="4.596" />
            </filter>
            <filter id="vitest-filter1" width="37.605" height="42.185" x="-15.869" y="8.648" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_2002_17204" stdDeviation="4.596" />
            </filter>
            <filter id="vitest-filter2" width="30.894" height="29.756" x="-9.004" y="-2.683" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_2002_17204" stdDeviation="4.596" />
            </filter>
            <filter id="vitest-filter3" width="40.253" height="63.725" x="20.648" y="-15.912" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_2002_17204" stdDeviation="4.596" />
            </filter>
            <filter id="vitest-filter4" width="34.276" height="34.275" x="18.716" y="-16.841" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_2002_17204" stdDeviation="4.596" />
            </filter>
          </defs>
        </>
      ),
    }),
    render,
  })
}
