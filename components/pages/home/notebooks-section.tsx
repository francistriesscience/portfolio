import * as React from "react"
import Link from "next/link"

import { getAllPosts } from "@/lib/notebooks/get-all-post"

import { Card, CardContent, RippleBackground } from "@/components/ui"
import { NotebookCard } from "@/components/card/notebook-card"

export async function NotebooksSection() {
  const posts = getAllPosts()

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium">Notebooks</h2>
        <div className="flex w-full justify-end">
          <Link
            className="text-muted-foreground hover:text-primary flex flex-row items-center gap-1 text-xs underline decoration-dashed underline-offset-2 transition-colors"
            href="/notebooks"
          >
            View notebooks
          </Link>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
          {posts.slice(0, 3).map((post) => (
            <NotebookCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="w-full">
          <Card className="relative h-36 overflow-hidden border border-dashed bg-transparent p-4">
            <RippleBackground className="opacity-20" numCircles={5} />
            <CardContent className="text-muted-foreground relative z-10 flex h-full flex-col justify-center text-center text-sm">
              Stay tuned, notebooks are coming soon...
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
