"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@packages/ui/shared"

import { cn } from "@packages/ui/lib/utils"

interface AvatarStatusDotProps {
  src?: string
  alt?: string
  fallback: string
  statusColor?: string
  isOnline?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
}

export function AvatarStatusDot({
  src,
  alt = "User avatar",
  fallback,
  statusColor = "bg-emerald-500",
  isOnline = true,
  className,
  size = "md",
}: AvatarStatusDotProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }

  const dotSizeClasses = {
    sm: "size-2",
    md: "size-3",
    lg: "size-4",
  }

  return (
    <div className={cn("relative inline-block shrink-0", className)}>
      <Avatar className={cn(sizeClasses[size], "border-border border-2")}>
        {src && <AvatarImage alt={alt} src={src} className="object-cover" />}
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>

      {isOnline && (
        <span className="absolute right-1 bottom-1 flex translate-x-1/4 translate-y-1/4">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              statusColor,
            )}
          />
          <span
            className={cn(
              "border-background relative inline-flex rounded-full border",
              dotSizeClasses[size],
              statusColor,
            )}
          />
        </span>
      )}
    </div>
  )
}
