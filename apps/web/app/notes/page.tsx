import { getAllNotes } from "@/lib/mdx"

import { Badge, Separator } from "@packages/ui/shared"
import { NoteList } from "@/components/pages/notes/_list/note-list"

export const dynamic = "force-static"
export const revalidate = false

export default async function NotesPage() {
  const notes = await getAllNotes()

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex shrink-0 items-center gap-2">
            <h1 className="text-muted-foreground shrink-0 text-xs font-semibold tracking-widest whitespace-nowrap uppercase">
              Notes
            </h1>
            <Badge variant="outline" size="sm" className="font-mono tabular-nums">
              {notes.length}
            </Badge>
          </div>
          <Separator className="flex-1" />
        </div>

        {notes.length === 0 ? (
          <div className="border-border bg-card/40 text-muted-foreground rounded-3xl border p-6 text-sm leading-6">
            No notes yet. Add an <span className="font-mono">.mdx</span> file to{" "}
            <span className="font-mono">contents/notes</span> and it will appear here on the next
            build.
          </div>
        ) : (
          <div className="flex flex-col">
            {notes.map((note, index) => (
              <NoteList key={note.slug} note={note} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
