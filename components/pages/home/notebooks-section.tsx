import * as React from "react"
import Link from "next/link"
import { LibraryIcon } from "lucide-react"

import { getAllNotebooks } from "@/lib/notebooks/get-all-notebooks"

import { Card, CardContent, BackgroundRipple, Button } from "@/components/ui"
import { NotebookCard } from "@/components/card/notebook-card"

export async function NotebooksSection() {
  const notebooks = getAllNotebooks()

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium tracking-tighter">Notebooks</h2>
        <div className="flex w-full justify-end">
          <Button
            variant="link"
            size="sm"
            className="text-muted-foreground hover:text-primary h-auto p-0 text-sm"
          >
            <Link href="/notebooks" className="flex flex-row items-center gap-1">
              <LibraryIcon className="size-3" />
              View notebooks
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
        {notebooks.slice(0, 3).map((notebook) => (
          <NotebookCard key={notebook.slug} post={notebook} />
        ))}
        {notebooks.length < 4 && (
          <Card className="relative h-full overflow-hidden border border-dashed bg-transparent p-4">
            <BackgroundRipple className="opacity-20" numCircles={5} />
            <CardContent className="text-muted-foreground relative z-10 flex h-full flex-col justify-center text-center text-sm">
              Writing on it
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
