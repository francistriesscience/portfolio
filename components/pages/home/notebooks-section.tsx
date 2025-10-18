import * as React from "react"
import Link from "next/link"
import { LibraryIcon } from "lucide-react"

import { getAllNotebooks } from "@/lib/notebooks/get-all-notebooks"

import { Card, CardContent, RippleBackground, Button } from "@/components/ui"
import { NotebookCard } from "@/components/card/notebook-card"

export async function NotebooksSection() {
  const notebooks = getAllNotebooks()

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-end justify-between">
        <h2 className="text-xl font-medium">Notebooks</h2>
        <div className="flex w-full justify-end">
          <Button
            variant="link"
            size="sm"
            className="text-muted-foreground hover:text-primary h-auto p-0 text-sm"
          >
            <LibraryIcon className="size-3" />
            <Link href="/notebooks">View notebooks</Link>
          </Button>
        </div>
      </div>

      {notebooks.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
          {notebooks.slice(0, 3).map((notebook) => (
            <NotebookCard key={notebook.slug} post={notebook} />
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
