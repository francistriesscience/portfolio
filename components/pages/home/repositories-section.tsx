import * as React from "react"

import { repositories } from "@/data/repositories"

import { Card, CardContent, BackgroundRipple } from "@/components/ui"
import { RepositoryCard } from "@/components/card/repository-card"

export function RepositoriesSection() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium tracking-tighter">Featured repositories</h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
        {repositories.slice(0, 4).map((repo) => (
          <RepositoryCard key={repo.name} repository={repo} />
        ))}
        {repositories.length < 4 && (
          <Card className="relative h-full overflow-hidden border border-dashed bg-transparent p-4">
            <BackgroundRipple className="opacity-20" numCircles={5} />
            <CardContent className="text-muted-foreground relative z-10 flex h-full flex-col justify-center text-center text-sm">
              Working on something
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
