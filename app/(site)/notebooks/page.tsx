import * as React from "react"
import Link from "next/link"
import { HouseIcon } from "lucide-react"

import { getAllPosts } from "@/lib/notebooks/get-all-post"
import { NotebookCard } from "@/components/card/notebook-card"

import { Card, CardContent, Button, RippleBackground } from "@/components/ui"

export const dynamic = "force-static"

export default async function NotebookPage() {
  const posts = getAllPosts()

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium">Notebooks</h2>
        <Button
          variant="link"
          size="sm"
          className="text-muted-foreground hover:text-primary h-auto p-0 text-sm"
        >
          <HouseIcon className="size-3" />
          <Link href={"/"}>Home</Link>
        </Button>
      </div>
      {posts.length > 0 ? (
        <div className="flex w-full flex-col items-start gap-2">
          {posts.map((post) => (
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
