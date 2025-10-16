import Link from "next/link"

import type { BlogPost } from "@/lib/mdx"
import { formatDate } from "@/helper/format-date"

import { Card, CardTitle, CardHeader, CardDescription, CardFooter } from "@/components/ui"

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link key={post.slug} href={`/blogs/${post.slug}`} className="w-full">
      <Card className="group hover:border-primary/50 cursor-pointer transition-all">
        <CardHeader className="flex flex-col items-start">
          <CardTitle className="group-hover:text-primary line-clamp-2 text-sm leading-tight font-medium transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs leading-relaxed">
            {post.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="line-clamp-2 flex w-full flex-row justify-between text-xs leading-relaxed">
          <span className="text-muted-foreground text-[10px] uppercase">
            {post.tags.join(", ")}
          </span>
          {formatDate(post.date)}
        </CardFooter>
      </Card>
    </Link>
  )
}
