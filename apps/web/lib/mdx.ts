import "server-only"

import fs from "node:fs/promises"
import path from "node:path"

import matter from "gray-matter"
import { z } from "zod"

const notesDirectory = path.resolve(process.cwd(), "contents/notes")

const noteDateSchema = z.preprocess((value) => {
  if (value instanceof Date) {
    return value.toISOString()
  }

  if (typeof value === "string") {
    return value.trim()
  }

  return value
}, z.string().min(1))

const noteTagsSchema = z.preprocess(
  (value) => {
    if (Array.isArray(value)) {
      return value
    }

    if (typeof value === "string") {
      return value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    }

    return []
  },
  z.array(z.string().min(1)),
)

export const noteFrontmatterSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  date: noteDateSchema,
  updated: noteDateSchema.optional(),
  tags: noteTagsSchema.default([]),
  draft: z.boolean().optional().default(false),
  image: z.string().optional(),
})

export type NoteFrontmatter = z.infer<typeof noteFrontmatterSchema>

export interface NoteEntry {
  slug: string
  frontmatter: NoteFrontmatter
  readingTimeMinutes: number
  source: string
}

const WORDS_PER_MINUTE = 200

function getNoteFilePath(slug: string) {
  const filePath = path.resolve(notesDirectory, `${slug}.mdx`)

  if (!filePath.startsWith(`${notesDirectory}${path.sep}`)) {
    throw new Error(`Invalid note slug: ${slug}`)
  }

  return filePath
}

function getNoteSlugFromFileName(fileName: string) {
  return path.basename(fileName, path.extname(fileName))
}

function getSortTimestamp(note: NoteEntry) {
  const timestamp = Date.parse(note.frontmatter.updated ?? note.frontmatter.date)
  return Number.isNaN(timestamp) ? 0 : timestamp
}

async function readNoteFile(filePath: string) {
  const raw = await fs.readFile(filePath, "utf8")
  const { data, content } = matter(raw)

  return {
    frontmatter: noteFrontmatterSchema.parse(data),
    source: content,
  }
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

async function getNoteSlugsFromDisk() {
  const entries = await fs.readdir(notesDirectory, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => getNoteSlugFromFileName(entry.name))
}

export async function getNoteBySlug(slug: string): Promise<NoteEntry | null> {
  try {
    const { frontmatter, source } = await readNoteFile(getNoteFilePath(slug))

    if (frontmatter.draft) {
      return null
    }

    return {
      slug,
      frontmatter,
      readingTimeMinutes: estimateReadingTimeMinutes(source),
      source,
    }
  } catch (error) {
    if (
      (error as NodeJS.ErrnoException).code === "ENOENT" ||
      (error instanceof Error && error.message.startsWith("Invalid note slug:"))
    ) {
      return null
    }

    throw error
  }
}

export async function getAllNotes(): Promise<NoteEntry[]> {
  const slugs = await getNoteSlugsFromDisk()
  const notes = await Promise.all(
    slugs.map(async (slug) => {
      const note = await getNoteBySlug(slug)
      return note
    }),
  )

  return notes
    .filter((note): note is NoteEntry => note !== null)
    .sort((left, right) => {
      const difference = getSortTimestamp(right) - getSortTimestamp(left)

      if (difference !== 0) {
        return difference
      }

      return left.frontmatter.title.localeCompare(right.frontmatter.title)
    })
}

export async function getPublishedNoteSlugs() {
  const notes = await getAllNotes()
  return notes.map((note) => note.slug)
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
