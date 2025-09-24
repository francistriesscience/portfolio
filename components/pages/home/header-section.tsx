import * as React from "react"

import headerData from "@/data/header.json"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui"

export function HeaderSection() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col items-start">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="border-muted-foreground border-2">
            <AvatarImage src="https://avatars.githubusercontent.com/u/132775768?s=96&v=4" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-georgia text-4xl font-medium tracking-tighter">{headerData.name}</h1>
        </div>
        <h2 className="text-muted-foreground text-sm">{headerData.subtitle}</h2>
      </div>
      <p className="text-muted-foreground text-sm italic">{headerData.intro}</p>
    </div>
  )
}
