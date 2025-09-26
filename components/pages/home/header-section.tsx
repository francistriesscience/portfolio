import * as React from "react"

import { header } from "@/data/header"

import { Avatar, AvatarImage, AvatarFallback, Badge } from "@/components/ui"

export function HeaderSection() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col items-start">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="border-border border">
            <AvatarImage src={header.avatar} />
            <AvatarFallback>FI</AvatarFallback>
          </Avatar>
          <h1 className="font-georgia text-4xl font-medium tracking-tighter">{header.name}</h1>
        </div>
        <h2 className="text-muted-foreground text-sm">{header.subtitle}</h2>
      </div>
      <p className="text-muted-foreground text-sm italic">{header.intro}</p>
      <div className="-mt-2 flex w-full flex-wrap items-start gap-2">
        {header.skills.slice(0, 14).map((skill, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {skill}
          </Badge>
        ))}
        {header.skills.length > 14 && (
          <Badge variant="secondary" className="text-xs">
            +{header.skills.length - 14} more
          </Badge>
        )}
      </div>
    </div>
  )
}
