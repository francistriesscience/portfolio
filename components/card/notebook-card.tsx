import Link from "next/link"

import type { NotebookPost } from "@/lib/mdx"
import { formatDate } from "@/helper/format-date"

import { Card, CardTitle, CardHeader, CardDescription, CardFooter } from "@/components/ui"

export function NotebookCard({ post }: { post: NotebookPost }) {
  return (
    <Link key={post.slug} href={`/notebooks/${post.slug}`} className="w-full">
      <Card className="group hover:border-primary/50 cursor-pointer transition-all hover:shadow-md">
        <CardHeader className="flex flex-col items-start">
          <CardTitle className="group-hover:text-primary line-clamp-2 text-sm leading-tight font-medium transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs leading-relaxed">
            {post.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="line-clamp-2 grid w-full grid-cols-2 justify-between text-xs leading-relaxed">
          <span className="text-muted-foreground text-[8px] uppercase">{post.tags.join(", ")}</span>
          <span className="text-end">{formatDate(post.date)}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}
