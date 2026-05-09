"use client"

import * as React from "react"
import Image, { type ImageProps } from "next/image"
import { IconLoader } from "@tabler/icons-react"

import { cn } from "@packages/ui/lib/utils"

interface RenderingImageProps extends Omit<ImageProps, "fill"> {
  children?: React.ReactNode
  imageClassName?: string
  wrapperClassName?: string
}

export function RenderingImage({
  alt,
  className,
  imageClassName,
  src,
  wrapperClassName,
  children,
  ...props
}: RenderingImageProps) {
  const [isRendering, setIsRendering] = React.useState(true)

  React.useEffect(() => {
    setIsRendering(true)
  }, [src])

  return (
    <div className={cn("bg-muted relative", wrapperClassName)}>
      <Image
        {...props}
        alt={alt}
        src={src}
        fill
        unoptimized
        className={cn("z-0", imageClassName, className)}
        onLoad={() => setIsRendering(false)}
      />
      {isRendering ? (
        <div className="bg-background/80 text-muted-foreground absolute inset-0 z-10 flex items-center justify-center gap-2 backdrop-blur-[2px]">
          <span className="text-xs font-semibold tracking-wide uppercase">Rendering</span>
          <IconLoader className="size-4 animate-spin" />
        </div>
      ) : null}
      {children ? <div className="absolute inset-0 z-20">{children}</div> : null}
    </div>
  )
}
