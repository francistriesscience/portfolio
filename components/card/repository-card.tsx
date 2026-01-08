import Link from "next/link"

import { formatDate } from "@/helper/format-date"
import type { Repository } from "@/data/repositories"

import { Card, CardTitle, CardHeader, CardDescription, CardFooter } from "@/components/ui"

export function RepositoryCard({ repository }: { repository: Repository }) {
  return (
    <Link href={repository.link} target="_blank" className="block h-full w-full">
      <Card className="group hover:border-primary/50 hover:from-primary/5 hover:via-background hover:to-primary/10 flex h-full cursor-pointer flex-col justify-between bg-gradient-to-br transition-all hover:shadow-md">
        <CardHeader className="flex flex-col items-start">
          <CardTitle className="group-hover:text-primary line-clamp-2 text-sm leading-tight font-medium transition-colors">
            {repository.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs leading-tight">
            {repository.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="line-clamp-2 grid w-full grid-cols-2 items-end justify-between text-xs leading-relaxed">
          <span className="text-muted-foreground text-[8px] uppercase">
            {repository.tags.join(", ")}
          </span>
          <span className="text-end">{formatDate(repository.date)}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
