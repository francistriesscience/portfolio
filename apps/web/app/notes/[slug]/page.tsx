import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { IconArrowLeft } from "@tabler/icons-react"

import { formatNoteDate, formatReadingTime, getNoteBySlug, getPublishedNoteSlugs } from "@/lib/mdx"

import {
  Badge,
  Separator,
  TypographyBlockquote,
  TypographyEyebrow,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyHr,
  TypographyImage,
  TypographyInlineCode,
  TypographyLead,
  TypographyLink,
  TypographyList,
  TypographyOrderedList,
  TypographyP,
  TypographyPre,
  TypographyProse,
} from "@packages/ui/shared"
import MDXContent from "@/components/shared/mdx-content"

export const dynamic = "force-static"
export const revalidate = false

type NotePageProps = {
  params: Promise<{ slug: string }>
}

const noteMdxComponents = {
  a: TypographyLink,
  blockquote: TypographyBlockquote,
  code: TypographyInlineCode,
  h1: TypographyH1,
  h2: TypographyH2,
  h3: TypographyH3,
  h4: TypographyH4,
  hr: TypographyHr,
  img: TypographyImage,
  ol: TypographyOrderedList,
  p: TypographyP,
  pre: TypographyPre,
  ul: TypographyList,
}

export async function generateStaticParams() {
  const slugs = await getPublishedNoteSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params
  const note = await getNoteBySlug(slug)

  if (!note) {
    return { title: "Note not found" }
  }

  return {
    title: `${note.frontmatter.title}`,
    description: note.frontmatter.description,
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params
  const note = await getNoteBySlug(slug)

  if (!note) {
    notFound()
  }

  const { date, description, tags = [], title, updated } = note.frontmatter

  return (
    <article className="flex flex-col gap-8">
      <Link
        href="/notes"
        className="text-muted-foreground hover:text-foreground flex w-fit flex-row items-center gap-2 text-xs font-semibold tracking-wide uppercase transition-colors"
      >
        <IconArrowLeft className="size-4" />
        Back to notes
      </Link>

      <header className="flex flex-col gap-2">
        <TypographyEyebrow>
          <time dateTime={date}>{formatNoteDate(date)}</time>
          <span aria-hidden="true">•</span>
          <span>{formatReadingTime(note.readingTimeMinutes)}</span>
          {updated ? (
            <>
              <span aria-hidden="true">•</span>
              <span>Updated {formatNoteDate(updated)}</span>
            </>
          ) : null}
        </TypographyEyebrow>
        <TypographyH1>{title}</TypographyH1>
        <TypographyLead className="max-w-prose">{description}</TypographyLead>
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" size="sm" className="font-mono">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </header>
      <Separator />
      <TypographyProse>
        <MDXContent source={note.source} components={noteMdxComponents} />
      </TypographyProse>
    </article>
  )
}
