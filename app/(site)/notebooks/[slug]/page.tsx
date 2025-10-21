import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { HouseIcon, LibraryIcon } from "lucide-react"
import { RiTwitterXLine, RiRedditLine } from "react-icons/ri"

import { getNotebookBySlug } from "@/lib/notebooks/get-notebook-by-slug"
import { getAllNotebooks } from "@/lib/notebooks/get-all-notebooks"

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
  const post = getNotebookBySlug(slug)

  if (!post) {
    notFound()
  }

  const shareUrl = `https://francistries.science/notebooks/${slug}`

  return (
    <div className="mx-auto w-full">
      <div className="mx-auto w-full max-w-3xl">
        <article>
          <header>
            <div className="mb-4 flex flex-col items-center gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div className="order-2 flex flex-row items-center gap-2 lg:order-1">
                {post.active && (
                  <span className="relative flex size-3">
                    <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                    <span className="bg-success relative inline-flex size-3 rounded-full"></span>
                  </span>
                )}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} className="text-xs uppercase" variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="order-1 flex flex-row items-center gap-2 lg:order-2">
                <Button
                  variant="link"
                  size="sm"
                  className="text-muted-foreground hover:text-primary flex h-auto flex-row items-center gap-1 p-0 text-sm"
                >
                  <Link href={"/"} className="flex flex-row items-center gap-1">
                    <HouseIcon className="size-3" />
                    Home
                  </Link>
                </Button>
                <span className="text-muted-foreground">/</span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-muted-foreground hover:text-primary flex h-auto flex-row items-center gap-1 p-0 text-sm"
                >
                  <Link href={"/notebooks"} className="flex flex-row items-center gap-1">
                    <LibraryIcon className="size-3" />
                    View notebooks
                  </Link>
                </Button>
              </div>
            </div>
            {post.banner && (
              <div className="mb-6">
                <Image
                  src={post.banner}
                  alt={`${post.title} banner`}
                  width={1200}
                  height={420}
                  className="h-42 w-full rounded-sm object-cover object-center"
                />
              </div>
            )}
            <h1 className="font-georgia text-foreground mb-4 w-full text-3xl font-medium tracking-tight lg:text-5xl">
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
          <div className="text-muted-foreground mt-2 flex w-full flex-row items-center justify-end gap-2 text-xs">
            <span>Share it on</span>
            <Link
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiTwitterXLine className="hover:text-twitter h-4 w-4" />
            </Link>
            <Link
              href={`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiRedditLine className="hover:text-reddit h-4 w-4" />
            </Link>
          </div>
          <Separator className="mt-4 mb-8" />
          <MarkdownContent>{post.content}</MarkdownContent>
        </article>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getNotebookBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const url = `https://francistries.science/notebooks/${slug}`

  let ogImageUrl = post.ogImage || ""

  const SITE_ORIGIN = "https://francistries.science"
  if (ogImageUrl && ogImageUrl.startsWith("/")) {
    ogImageUrl = SITE_ORIGIN + ogImageUrl
  }

  return {
    title: `${post.title} - @francistriesscience`,
    description: post.description,
    authors: post.authors.map((author) => ({ name: author.name })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: post.authors.map((author) => author.name),
      url: url,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllNotebooks()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
