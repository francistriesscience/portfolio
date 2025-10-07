import { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

import { getPostBySlug, getAllPosts } from "@/lib/mdx"

import { Badge, Avatar, AvatarImage, AvatarFallback, Button } from "@/components/ui"
import { mdxComponents } from "@/components/ui/mdx/mdx"
import Link from "next/link"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="mx-auto w-full">
      <div className="mx-auto w-full max-w-3xl">
        <article>
          <header>
            <div className="flex flex-row items-center justify-between gap-2">
              {post.tags.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs uppercase">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <Button
                variant="link"
                size="sm"
                className="text-muted-foreground hover:text-primary h-auto p-0 text-xs underline decoration-dashed"
              >
                <Link href={"/blogs"}>View more blogs</Link>
              </Button>
            </div>
            <h1 className="font-georgia text-foreground mb-4 w-full text-4xl font-medium tracking-tight">
              {post.title}
            </h1>
            <div className="text-muted-foreground mb-4 flex flex-wrap items-center gap-4 text-sm">
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
                      className="decoration-dashed underline-offset-2 hover:underline"
                    >
                      {author.name}
                    </Link>
                  </div>
                ))}
              </div>
              <span className="text-muted-foreground">·</span>
              <span>{post.readingTime} min read</span>
              <span className="text-muted-foreground">·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

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
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export const dynamic = "force-static"
