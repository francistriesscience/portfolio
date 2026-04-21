import "server-only"

import { generatedNotes } from "@/lib/generated/notes.generated"
import { noteFrontmatterSchema, type NoteFrontmatter } from "@/lib/schema/note"

export interface NoteEntry {
  slug: string
  frontmatter: NoteFrontmatter
  readingTimeMinutes: number
  source: string
}

const WORDS_PER_MINUTE = 200

function getSortTimestamp(note: NoteEntry) {
  const timestamp = Date.parse(note.frontmatter.updated ?? note.frontmatter.date)
  return Number.isNaN(timestamp) ? 0 : timestamp
}

function estimateReadingTimeMinutes(source: string) {
  const normalizedSource = source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~\-]+/g, " ")

  const wordCount = normalizedSource.trim().split(/\s+/).filter(Boolean).length

  if (wordCount === 0) {
    return 1
  }

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}

const notes = await Promise.all(
  generatedNotes.map(async (note) => ({
    slug: note.slug,
    frontmatter: noteFrontmatterSchema.parse(note.frontmatter),
    readingTimeMinutes: estimateReadingTimeMinutes(note.source),
    source: note.source,
  })),
)

const publishedNotes = notes
  .filter((note) => !note.frontmatter.draft)
  .sort((left, right) => {
    const difference = getSortTimestamp(right) - getSortTimestamp(left)

    if (difference !== 0) {
      return difference
    }

    return left.frontmatter.title.localeCompare(right.frontmatter.title)
  })

const publishedNotesBySlug = new Map(publishedNotes.map((note) => [note.slug, note] as const))

export async function getNoteBySlug(slug: string): Promise<NoteEntry | null> {
  return publishedNotesBySlug.get(slug) ?? null
}

export async function getAllNotes(): Promise<NoteEntry[]> {
  return publishedNotes
}

export async function getPublishedNoteSlugs() {
  return publishedNotes.map((note) => note.slug)
}

export function formatNoteDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date))
}

export function formatReadingTime(minutes: number) {
  return `${minutes} min read`
}

export function getNotePath(slug: string) {
  return `/notes/${slug}`
}
