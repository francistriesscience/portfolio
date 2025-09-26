import * as React from "react"
import Link from "next/link"

import { getAllPosts } from "@/lib/mdx"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  RippleBackground,
} from "@/components/ui"

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium">Blogs</h2>
        <Button
          variant="link"
          size="sm"
          className="text-muted-foreground hover:text-primary h-auto p-0 text-xs underline decoration-dashed"
        >
          <Link href={"/"}>Back to homepage</Link>
        </Button>
      </div>
      {posts.length > 0 ? (
        <div className="flex w-full flex-col items-start gap-2">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="group hover:border-primary w-full cursor-pointer p-3 transition-all"
            >
              <Link href={`/blog/${post.slug}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                      <CardTitle className="group-hover:text-primary line-clamp-2 text-sm leading-tight font-medium transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                        {post.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <div className="w-full">
          <Card className="relative h-36 overflow-hidden border border-dashed bg-transparent p-4">
            <RippleBackground className="opacity-20" numCircles={5} />
            <CardContent className="text-muted-foreground relative z-10 flex h-full flex-col justify-center text-center text-sm">
              Stay tuned, blogs are coming soon...
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
