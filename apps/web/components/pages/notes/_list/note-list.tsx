import Link from "next/link"
import { IconArrowUpRight } from "@tabler/icons-react"

import { RenderingImage } from "@portfolio/web/components/shared/rendering-image"

import { PreviewCard, PreviewCardPopup, PreviewCardTrigger, Badge } from "@packages/ui/shared"

import { formatNoteDate, formatReadingTime, isNewNote, type NoteEntry } from "@/lib/mdx"

interface NoteItemProps {
  note: NoteEntry
  index: number
}

export function NoteList({ note, index }: NoteItemProps) {
  const { date, description, title, image } = note.frontmatter
  const shouldShowNewBadge = isNewNote(date)

  return (
    <PreviewCard>
      <PreviewCardTrigger render={<div />}>
        <Link href={`/notes/${note.slug}`} className="group flex w-full">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="text-muted-foreground font-mono text-xs tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex min-w-0 items-center gap-2">
              <h3 className="text-foreground line-clamp-1 max-w-[28ch] min-w-0 text-sm font-semibold transition-colors">
                {title}
              </h3>
              {shouldShowNewBadge ? (
                <Badge size="sm" variant="info" className="font-mono uppercase">
                  New
                </Badge>
              ) : null}
            </div>
          </div>
          <div className="text-muted-foreground relative flex shrink-0 flex-row items-center">
            <time
              dateTime={date}
              className="inline-block transform text-xs font-medium tracking-widest uppercase transition-transform group-hover:-translate-x-6"
            >
              {formatNoteDate(date)}
            </time>

            <span className="absolute top-1/2 right-0 -translate-y-1/2">
              <IconArrowUpRight
                className="size-4 translate-x-3 transform opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden="true"
              />
            </span>
          </div>
        </Link>
      </PreviewCardTrigger>
      <PreviewCardPopup className="border-border bg-background w-80 overflow-hidden p-0 shadow-2xl">
        <div className="flex flex-col">
          {image && (
            <RenderingImage
              wrapperClassName="aspect-video w-full overflow-hidden"
              imageClassName="object-cover"
              src={image}
              alt={title}
            />
          )}
          <div className="flex flex-col items-start gap-2 p-4">
            <div className="flex w-full flex-col gap-2">
              <div className="text-muted-foreground flex w-full flex-row items-center justify-between text-[10px] font-semibold tracking-wider uppercase">
                <span>Description</span>
                <span>{formatReadingTime(note.readingTimeMinutes)}</span>
              </div>
              <p className="text-foreground text-xs leading-relaxed">{description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {shouldShowNewBadge ? (
                  <Badge size="sm" variant="info" className="font-mono uppercase">
                    New
                  </Badge>
                ) : null}
                {note.frontmatter.tags.map((tag) => (
                  <Badge key={tag} variant="outline" size="sm" className="font-mono tabular-nums">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-muted-foreground flex text-[10px] font-semibold tracking-wider uppercase"></div>
          </div>
        </div>
      </PreviewCardPopup>
    </PreviewCard>
  )
}
