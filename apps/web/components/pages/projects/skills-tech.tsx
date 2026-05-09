"use client"

import { SKILLS } from "@portfolio/web/data/skills"

import { Badge, Separator } from "@packages/ui/shared"

export function SkillsTech() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex shrink-0 items-center gap-2">
          <h2 className="text-muted-foreground shrink-0 text-xs font-semibold tracking-widest whitespace-nowrap uppercase">
            Skills / Tech / Tools
          </h2>
          <Badge variant="outline" size="sm" className="font-mono tabular-nums">
            {SKILLS.length}
          </Badge>
        </div>
        <Separator className="flex-1" />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {SKILLS.map((skill) => (
          <Badge
            key={skill.label}
            variant="outline"
            size="sm"
            className="inline-flex items-center gap-1 font-mono"
          >
            {skill.icon ? <skill.icon className="h-2.5 w-auto shrink-0" /> : null}
            <span>{skill.label}</span>
          </Badge>
        ))}
      </div>
    </section>
  )
}
