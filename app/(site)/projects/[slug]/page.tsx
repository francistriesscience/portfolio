import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { HouseIcon, SproutIcon } from "lucide-react"

import { getProjectBySlug } from "@/lib/projects/get-project-by-slug"
import { getAllProjects } from "@/lib/projects/get-all-projects"
import { getIconComponent } from "@/helper/get-icon-component"

import {
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
  MarkdownContent,
  Separator,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui"

export const dynamic = "force-static"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPostPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="mx-auto w-full">
      <div className="mx-auto w-full max-w-3xl">
        <article>
          <header>
            <div className="mb-4 flex flex-col items-center gap-2 lg:flex-row lg:items-center lg:justify-between">
              <div className="order-2 flex flex-row items-center gap-2 lg:order-1">
                {project.active && (
                  <span className="relative flex size-3">
                    <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                    <span className="bg-success relative inline-flex size-3 rounded-full"></span>
                  </span>
                )}
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
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
                  <Link href={"/projects"} className="flex flex-row items-center gap-1">
                    <SproutIcon className="size-3" /> View projects
                  </Link>
                </Button>
              </div>
            </div>
            {project.banner && (
              <div className="mb-6">
                <Image
                  src={project.banner}
                  alt={`${project.title} banner`}
                  width={1200}
                  height={420}
                  className="h-42 w-full rounded-sm object-cover object-center"
                />
              </div>
            )}
            <h1 className="font-georgia text-foreground mb-4 w-full text-5xl font-medium tracking-tight">
              {project.title}
            </h1>
            <div className="text-muted-foreground mb-4 flex flex-wrap items-center gap-2 text-sm">
              <div className="flex items-center gap-2">
                {project.authors.map((author, index) => (
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
              <span>{project.readingTime} min read</span>
              <span className="text-muted-foreground">·</span>
              <div className="flex flex-row items-center gap-1">
                <time dateTime={project.date}>
                  {new Date(project.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
            <span className="text-muted-foreground text-sm leading-tight italic">
              {project.description}
            </span>
          </header>
          <div className="mt-4 flex w-full flex-row items-center justify-between">
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => {
                  const IconComponent = getIconComponent(tech.icon)
                  return (
                    <Badge key={tech.name} className="text-xs" variant="secondary">
                      <div className="flex items-center gap-1 uppercase">
                        {IconComponent && <IconComponent className="h-3 w-3" />}
                        <span>{tech.name}</span>
                      </div>
                    </Badge>
                  )
                })}
              </div>
            )}
            {project.isNotebook && project.notebook.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.notebook.map((notebookItem, index) => {
                  const IconComponent = getIconComponent(notebookItem.icon)
                  return (
                    <Link
                      key={index}
                      href={notebookItem.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="link"
                            size="sm"
                            className="flex h-auto items-center gap-1 p-0 text-xs uppercase"
                          >
                            {IconComponent && <IconComponent className="h-4 w-4" />}
                            <span>{notebookItem.name}</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {notebookItem.url?.replace("https://", "").slice(0, 40)}...
                        </TooltipContent>
                      </Tooltip>
                    </Link>
                  )
                })}
              </div>
            )}
            {project.isWebsite && project.website.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.website.map((websiteItem, index) => {
                  const IconComponent = getIconComponent(websiteItem.icon)
                  return (
                    <Link
                      key={index}
                      href={websiteItem.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="flex items-center gap-2">
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        <span>{websiteItem.name}</span>
                      </Button>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
          <Separator className="mt-4 mb-8" />
          <MarkdownContent>{project.content}</MarkdownContent>
        </article>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  const url = `https://francistries.science/projects/${slug}`

  let ogImageUrl = project.ogImage || ""

  const SITE_ORIGIN = "https://francistries.science"
  if (ogImageUrl && ogImageUrl.startsWith("/")) {
    ogImageUrl = SITE_ORIGIN + ogImageUrl
  }

  return {
    title: `${project.title} - @francistriesscience`,
    description: project.description,
    authors: project.authors.map((author) => ({ name: author.name })),
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      publishedTime: project.date,
      authors: project.authors.map((author) => author.name),
      url: url,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [ogImageUrl],
    },
  }
}

export async function generateStaticParams() {
  const projects = getAllProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}
