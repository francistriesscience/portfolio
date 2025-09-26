import * as React from "react"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  RippleBackground,
} from "@/components/ui"
import { getAllPosts, type BlogPost } from "@/lib/mdx"

export async function BlogsSection() {
  let posts: BlogPost[] = []

  try {
    posts = await getAllPosts()
    posts = posts.slice(0, 3)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
  }

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium">Blogs</h2>
        <div className="flex w-full justify-end">
          <Link
            className="text-muted-foreground hover:text-primary flex flex-row items-center gap-1 text-xs underline decoration-dashed underline-offset-2 transition-colors"
            href="/blog"
          >
            View all posts
          </Link>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="group hover:border-primary cursor-pointer p-3 transition-all"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col items-start">
                    <CardTitle className="group-hover:text-primary line-clamp-2 text-sm leading-tight font-medium transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                      {post.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
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
