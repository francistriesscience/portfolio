import { z } from "zod"

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
  og: z.string().optional(),
})

export type NoteFrontmatter = z.infer<typeof noteFrontmatterSchema>

export interface GeneratedNoteRecord {
  slug: string
  frontmatter: NoteFrontmatter
  source: string
}
