import * as React from "react"

import { cn } from "@/lib/utils"

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "text-card-foreground flex flex-col gap-4 rounded-sm border bg-transparent p-3",
        className,
      )}
      {...props}
    />
  )
}
