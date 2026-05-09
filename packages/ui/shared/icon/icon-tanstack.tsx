"use client"

import * as React from "react"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@packages/ui/lib/utils"

export function IconTanStack({
  className,
  render,
  ...props
}: useRender.ComponentProps<"svg">): React.ReactElement {
  const defaultProps = {
    className: cn("size-4", className),
    "data-slot": "icon-tanstack",
    fill: "none",
    role: "img",
    viewBox: "0 0 633 633",
    xmlns: "http://www.w3.org/2000/svg",
  }

  return useRender({
    defaultTagName: "svg",
    props: mergeProps<"svg">(defaultProps, {
      ...props,
      children: (
        <>
          <title>TanStack</title>
          <defs>
            <linearGradient id="tan-b" x1="50%" x2="50%" y1="0%" y2="71.65%">
              <stop offset="0%" stopColor="#6BDAFF" />
              <stop offset="31.922%" stopColor="#F9FFB5" />
              <stop offset="70.627%" stopColor="#FFA770" />
              <stop offset="100%" stopColor="#FF7373" />
            </linearGradient>
            <linearGradient id="tan-d" x1="43.996%" x2="53.441%" y1="8.54%" y2="93.872%">
              <stop offset="0%" stopColor="#673800" />
              <stop offset="100%" stopColor="#B65E00" />
            </linearGradient>
            <linearGradient id="tan-e" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#2F8A00" />
              <stop offset="100%" stopColor="#90FF57" />
            </linearGradient>
            <linearGradient id="tan-f" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#2F8A00" />
              <stop offset="100%" stopColor="#90FF57" />
            </linearGradient>
            <linearGradient id="tan-g" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#2F8A00" />
              <stop offset="100%" stopColor="#90FF57" />
            </linearGradient>
            <linearGradient id="tan-h" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#2F8A00" />
              <stop offset="100%" stopColor="#90FF57" />
            </linearGradient>
            <linearGradient id="tan-i" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#2F8A00" />
              <stop offset="100%" stopColor="#90FF57" />
            </linearGradient>
            <linearGradient id="tan-j" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#2F8A00" />
              <stop offset="100%" stopColor="#90FF57" />
            </linearGradient>
            <linearGradient id="tan-k" x1="92.9%" x2="8.641%" y1="45.768%" y2="54.892%">
              <stop offset="0%" stopColor="#EE2700" />
              <stop offset="100%" stopColor="#FF008E" />
            </linearGradient>
            <linearGradient id="tan-l" x1="61.109%" x2="43.717%" y1="3.633%" y2="43.072%">
              <stop offset="0%" stopColor="#FFF400" />
              <stop offset="100%" stopColor="#3C8700" />
            </linearGradient>
            <linearGradient id="tan-m" x1="50%" x2="50%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#FFDF00" />
              <stop offset="100%" stopColor="#FF9D00" />
            </linearGradient>
            <linearGradient id="tan-n" x1="127.279%" x2="0%" y1="49.778%" y2="50.222%">
              <stop offset="0%" stopColor="#FFA400" />
              <stop offset="100%" stopColor="#FF5E00" />
            </linearGradient>
            <linearGradient id="tan-o" x1="127.279%" x2="0%" y1="47.531%" y2="52.469%">
              <stop offset="0%" stopColor="#FFA400" />
              <stop offset="100%" stopColor="#FF5E00" />
            </linearGradient>
            <linearGradient id="tan-p" x1="127.279%" x2="0%" y1="46.195%" y2="53.805%">
              <stop offset="0%" stopColor="#FFA400" />
              <stop offset="100%" stopColor="#FF5E00" />
            </linearGradient>
            <linearGradient id="tan-q" x1="127.279%" x2="0%" y1="35.33%" y2="64.67%">
              <stop offset="0%" stopColor="#FFA400" />
              <stop offset="100%" stopColor="#FF5E00" />
            </linearGradient>
            <linearGradient id="tan-r" x1="127.279%" x2="0%" y1="4.875%" y2="95.125%">
              <stop offset="0%" stopColor="#FFA400" />
              <stop offset="100%" stopColor="#FF5E00" />
            </linearGradient>
            <linearGradient id="tan-s" x1="78.334%" x2="31.668%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#FFA400" />
              <stop offset="100%" stopColor="#FF5E00" />
            </linearGradient>
            <linearGradient id="tan-t" x1="57.913%" x2="44.88%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#FFA400" />
              <stop offset="100%" stopColor="#FF5E00" />
            </linearGradient>
            <linearGradient id="tan-u" x1="50.495%" x2="49.68%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#FFA400" />
              <stop offset="100%" stopColor="#FF5E00" />
            </linearGradient>
            <circle id="tan-a" cx="308.5" cy="308.5" r="308.5" />
            <circle id="tan-v" cx="307.5" cy="308.5" r="316.5" />
            <mask id="tan-c" fill="#fff">
              <use href="#tan-a" />
            </mask>
          </defs>
          <g fill="none" fillRule="evenodd" transform="translate(9 8)">
            <use href="#tan-a" fill="url(#tan-b)" />
            <ellipse cx="81.5" cy="602.5" fill="#015064" stroke="#00CFE2" strokeWidth="25" mask="url(#tan-c)" rx="214.5" ry="185.968"/>
            <ellipse cx="535.5" cy="602.5" fill="#015064" stroke="#00CFE2" strokeWidth="25" mask="url(#tan-c)" rx="214.5" ry="185.968"/>
            <ellipse cx="81.5" cy="640.5" fill="#015064" stroke="#00A8B8" strokeWidth="25" mask="url(#tan-c)" rx="214.5" ry="185.968"/>
            <ellipse cx="535.5" cy="640.5" fill="#015064" stroke="#00A8B8" strokeWidth="25" mask="url(#tan-c)" rx="214.5" ry="185.968"/>
            <ellipse cx="81.5" cy="676.5" fill="#015064" stroke="#007782" strokeWidth="25" mask="url(#tan-c)" rx="214.5" ry="185.968"/>
            <ellipse cx="535.5" cy="676.5" fill="#015064" stroke="#007782" strokeWidth="25" mask="url(#tan-c)" rx="214.5" ry="185.968"/>
            <g mask="url(#tan-c)">
              <path fill="url(#tan-d)" stroke="#6E3A00" strokeWidth="6.088" d="M98.318 88.007c7.691 37.104 16.643 72.442 26.856 106.013 10.212 33.571 25.57 68.934 46.07 106.088l-51.903 11.67c-10.057-60.01-17.232-99.172-21.525-117.487-4.293-18.315-10.989-51.434-20.089-99.357l20.591-6.927" transform="scale(-1 1) rotate(25 -300.37 -553.013)"/>
              <g stroke="#2F8A00">
                <path fill="url(#tan-e)" strokeWidth="9.343" d="M108.544 66.538s-13.54-21.305-37.417-27.785c-15.917-4.321-33.933.31-54.048 13.892C33.464 65.975 47.24 73.52 58.405 75.28c16.749 2.64 50.14-8.74 50.14-8.74Z" transform="rotate(1 -6061.691 5926.397)"/>
                <path fill="url(#tan-f)" strokeWidth="9.343" d="M108.544 67.138s-47.187-5.997-81.077 19.936C4.873 104.362-3.782 137.794 1.502 187.369c28.42-29.22 48.758-50.836 61.016-64.846 18.387-21.016 46.026-55.385 46.026-55.385Z" transform="rotate(1 -6061.691 5926.397)"/>
                <path fill="url(#tan-g)" strokeWidth="9.343" d="M108.544 66.538c-1.96-21.705 3.98-38.018 17.82-48.94C140.203 6.674 154.85.808 170.303 0c-4.865 21.527-12.373 36.314-22.524 44.361-10.151 8.048-23.23 15.44-39.236 22.177Z" transform="rotate(1 -6061.691 5926.397)"/>
                <path fill="url(#tan-h)" strokeWidth="9.343" d="M108.544 67.138c29.838-31.486 61.061-42.776 93.669-33.869C234.82 42.176 253.749 60.785 259 89.096c-34.898-3.657-59.974-6.343-75.228-8.058-15.254-1.716-40.33-6.349-75.228-13.9Z" transform="rotate(1 -6061.691 5926.397)"/>
                <path fill="url(#tan-i)" strokeWidth="9.343" d="M108.544 67.138c34.868-9.381 64.503-3.658 88.905 17.17 24.402 20.829 39.656 46.686 45.762 77.571-39.626-7.574-68.4-20.115-86.322-37.624a395.051 395.051 0 0 1-48.345-57.117Z" transform="rotate(1 -6061.691 5926.397)"/>
                <path fill="url(#tan-j)" strokeWidth="9.343" d="M108.544 67.138C76.206 82.6 57.608 105.366 52.75 135.436c-4.858 30.07-.292 62.89 13.698 98.462 24.873-41.418 38.905-71.368 42.096-89.849 3.191-18.48 3.191-44.118 0-76.91Z" transform="rotate(1 -6061.691 5926.397)"/>
              </g>
              <path stroke="#830305" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="6.937" d="m409.379 398.157-23.176 18.556M328.04 375.516l-22.313 28.398M312.904 353.698l53.18 59.816"/>
              <path fill="url(#tan-k)" d="M67.585 27.463H5.68C1.893 28.148 0 30.38 0 34.16c0 3.78 1.893 6.211 5.68 7.293h67.17l41.751-30.356c2.488-2.646 2.794-5.315.92-8.006s-4.6-3.626-8.177-2.803l-39.76 27.174Z" transform="scale(-1 1) rotate(-9 2092.128 2856.854)"/>
            </g>
            <ellipse cx="308.5" cy="720.5" fill="url(#tan-l)" mask="url(#tan-c)" rx="266" ry="316.5"/>
            <ellipse cx="308.5" cy="720.5" stroke="#6DA300" strokeOpacity=".502" strokeWidth="26" mask="url(#tan-c)" rx="253" ry="303.5"/>
            <g mask="url(#tan-c)">
              <g transform="translate(389 -32)">
                <circle cx="168.5" cy="113.5" r="113.5" fill="url(#tan-m)"/>
                <circle cx="168.5" cy="113.5" r="106" stroke="#FFC900" strokeOpacity=".529" strokeWidth="15"/>
                <path stroke="url(#tan-n)" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="12" d="M30 113H0"/>
                <path stroke="url(#tan-o)" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="12" d="M33.5 79.5 7 74"/>
                <path stroke="url(#tan-p)" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="12" d="m34 146-29 8"/>
                <path stroke="url(#tan-q)" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="12" d="m45 177-24 13"/>
                <path stroke="url(#tan-r)" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="12" d="m67 204-20 19"/>
                <path stroke="url(#tan-s)" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="12" d="m94.373 227-13.834 22.847"/>
                <path stroke="url(#tan-t)" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="12" d="M127.5 243.5 120 268"/>
                <path stroke="url(#tan-u)" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="12" d="m167.5 252.5.5 24.5"/>
              </g>
            </g>
            <circle cx="307.5" cy="308.5" r="304" stroke="#000" strokeWidth="25"/>
          </g>
        </>
      ),
    }),
    render,
  })
}
