import * as React from "react"
import Link from "next/link"

import { getAllPosts, type BlogPost } from "@/lib/mdx"
import { formatDate } from "@/helper/format-date"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  RippleBackground,
} from "@/components/ui"

export async function BlogsSection() {
  let posts: BlogPost[] = []

  posts = await getAllPosts()

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium">Blogs</h2>
        <div className="flex w-full justify-end">
          <Link
            className="text-muted-foreground hover:text-primary flex flex-row items-center gap-1 text-xs underline decoration-dashed underline-offset-2 transition-colors"
            href="/blogs"
          >
            View all posts
          </Link>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blogs/${post.slug}`}>
              <Card className="group hover:border-primary/50 cursor-pointer p-3 transition-all">
                <CardHeader className="flex flex-col items-start">
                  <CardTitle className="group-hover:text-primary line-clamp-2 text-sm leading-tight font-medium transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                    {post.description}
                  </CardDescription>
                  <CardFooter className="line-clamp-2 flex w-full flex-row justify-between text-xs leading-relaxed">
                    <span className="text-muted-foreground text-xs">{post.tags.join(", ")}</span>
                    {formatDate(post.date)}
                  </CardFooter>
                </CardHeader>
              </Card>
            </Link>
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
