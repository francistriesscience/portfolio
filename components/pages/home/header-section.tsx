import * as React from "react"

import headerData from "@/data/header.json"

export function HeaderSection() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col items-start">
        <h1 className="font-georgia text-4xl font-medium tracking-tighter">{headerData.name}</h1>
        <h2 className="text-muted-foreground text-sm">{headerData.subtitle}</h2>
      </div>
      <p className="text-muted-foreground text-sm italic">{headerData.intro}</p>
    </div>
  )
}
