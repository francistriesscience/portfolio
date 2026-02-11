import * as React from "react"
import Link from "next/link"
import { House } from "lucide-react"

import { getAllNotebooks } from "@/lib/notebooks/get-all-notebooks"
import { NotebookCard } from "@/components/card/notebook-card"

import {
  Card,
  CardContent,
  BackgroundRipple,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui"

export const dynamic = "force-static"

export default async function NotebookPage() {
  const posts = getAllNotebooks()

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <House className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl font-medium tracking-tighter">
              Notebooks
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {posts.length > 0 ? (
        <div className="flex w-full flex-col items-start gap-2">
          {posts.map((post) => (
            <NotebookCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="w-full">
          <Card className="relative h-36 overflow-hidden border border-dashed bg-transparent p-4">
            <BackgroundRipple className="opacity-20" numCircles={5} />
            <CardContent className="text-muted-foreground relative z-10 flex h-full flex-col justify-center text-center text-sm">
              Stay tuned, notebooks are coming soon...
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
