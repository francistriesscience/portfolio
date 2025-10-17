import Link from "next/link"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { HouseIcon, LibraryIcon } from "lucide-react"

import { getPostBySlug } from "@/lib/notebooks/get-post-by-slug"
import { getAllPosts } from "@/lib/notebooks/get-all-post"

import {
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
  MarkdownContent,
  Separator,
} from "@/components/ui"

export const dynamic = "force-static"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function NotebookPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="mx-auto w-full">
      <div className="mx-auto w-full max-w-3xl">
        <article>
          <header>
            <div className="mb-4 flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center gap-1">
                {post.active && (
                  <span className="relative flex size-3">
                    <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                    <span className="bg-success relative inline-flex size-3 rounded-full"></span>
                  </span>
                )}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs uppercase">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-row items-center">
                <Button
                  variant="link"
                  size="sm"
                  className="text-muted-foreground hover:text-primary flex h-auto flex-row items-center gap-1 p-0 text-sm"
                >
                  <HouseIcon className="size-3" />
                  <Link href={"/"}>Home</Link>
                </Button>
                <span className="text-muted-foreground">/</span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-muted-foreground hover:text-primary flex h-auto flex-row items-center gap-1 p-0 text-sm"
                >
                  <LibraryIcon className="size-3" />
                  <Link href={"/notebooks"}>View notebooks</Link>
                </Button>
              </div>
            </div>
            <h1 className="font-georgia text-foreground mb-4 w-full text-5xl font-medium tracking-tight">
              {post.title}
            </h1>
            <div className="text-muted-foreground mb-4 flex flex-wrap items-center gap-2 text-sm">
              <div className="flex items-center gap-2">
                {post.authors.map((author, index) => (
                  <div key={author.name} className="flex items-center gap-2">
                    {index > 0 && <span className="text-muted-foreground">, </span>}
                    <Avatar className="size-5">
                      <AvatarImage src={author.imageUrl} alt={author.name} />
                      <AvatarFallback className="text-xs">
                        {author.name.split(" ")[0][0]}
                      </AvatarFallback>
                    </Avatar>
                    <Link
                      href={author.url}
                      target="_blank "
                      className="underline decoration-dashed underline-offset-2"
                    >
                      {author.name}
                    </Link>
                  </div>
                ))}
              </div>
              <span className="text-muted-foreground">·</span>
              <span>{post.readingTime} min read</span>
              <span className="text-muted-foreground">·</span>
              <div className="flex flex-row items-center gap-1">
                <span className="text-muted-foreground text-xs">Updated at</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
            <span className="text-muted-foreground text-sm leading-tight italic">
              {post.description}
            </span>
          </header>
          <Separator className="my-8" />

          <MarkdownContent>{post.content}</MarkdownContent>
        </article>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} - Francis Ignacio`,
    description: post.description,
    authors: post.authors.map((author) => ({ name: author.name })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: post.authors.map((author) => author.name),
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
