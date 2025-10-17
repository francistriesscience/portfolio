"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"

import { MarkdownCodeBlock } from "@/components/ui"

interface MarkdownContentProps {
  children: string
  className?: string
}

export function MarkdownContent({ children, className }: MarkdownContentProps) {
  return (
    <div className={cn("prose prose-neutral dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ className, ...props }: any) => (
            <h1
              className={cn(
                "font-georgia text-foreground mt-8 mb-4 text-3xl font-medium tracking-tight first:mt-0",
                className,
              )}
              {...props}
            />
          ),
          h2: ({ className, ...props }: any) => (
            <h2
              className={cn(
                "font-georgia text-foreground mt-6 mb-3 text-2xl font-medium tracking-tight",
                className,
              )}
              {...props}
            />
          ),
          h3: ({ className, ...props }: any) => (
            <h3
              className={cn(
                "font-georgia text-foreground mt-5 mb-2 text-xl font-medium tracking-tight",
                className,
              )}
              {...props}
            />
          ),
          h4: ({ className, ...props }: any) => (
            <h4
              className={cn(
                "font-georgia text-foreground mt-4 mb-2 text-lg font-medium tracking-tight",
                className,
              )}
              {...props}
            />
          ),
          p: ({ className, ...props }: any) => (
            <p
              className={cn("text-muted-foreground mb-4 leading-relaxed font-light", className)}
              {...props}
            />
          ),
          ul: ({ className, ...props }: any) => (
            <ul
              className={cn(
                "text-muted-foreground mb-4 list-inside list-disc space-y-1",
                className,
              )}
              {...props}
            />
          ),
          ol: ({ className, ...props }: any) => (
            <ol
              className={cn(
                "text-muted-foreground mb-4 list-inside list-decimal space-y-1",
                className,
              )}
              {...props}
            />
          ),
          li: ({ className, ...props }: any) => (
            <li className={cn("leading-relaxed", className)} {...props} />
          ),
          a: ({ className, href, ...props }: any) => {
            const isExternal = href?.startsWith("http")

            if (href?.startsWith("/")) {
              return (
                <Link
                  href={href}
                  className={cn(
                    "text-primary hover:text-primary/80 underline underline-offset-2 transition-colors",
                    className,
                  )}
                  {...props}
                />
              )
            }

            if (href?.startsWith("#")) {
              return (
                <a
                  className={cn("text-primary hover:text-primary/80", className)}
                  href={href}
                  {...props}
                />
              )
            }

            return (
              <a
                className={cn(
                  "text-primary hover:text-primary/80 underline underline-offset-2 transition-colors",
                  isExternal && "after:ml-1 after:text-xs after:content-['_↗']",
                  className,
                )}
                href={href}
                {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                {...props}
              />
            )
          },
          code: ({ className, inline, children, ...props }: any) => {
            const isInline = inline || !className?.includes("language-")

            return (
              <code
                className={cn(
                  "font-mono text-sm",
                  isInline ? "bg-muted text-muted-foreground rounded px-1.5 py-0.5" : "hljs block",
                  className,
                )}
                {...props}
              >
                {children}
              </code>
            )
          },
          pre: (props: any) => <MarkdownCodeBlock {...props} />,
          strong: ({ className, ...props }: any) => (
            <strong className={cn("text-foreground font-medium", className)} {...props} />
          ),
          em: ({ className, ...props }: any) => (
            <em className={cn("text-foreground italic", className)} {...props} />
          ),
          blockquote: ({ className, ...props }: any) => (
            <blockquote
              className={cn(
                "border-primary/20 text-muted-foreground my-4 border-l-4 pl-4 italic",
                className,
              )}
              {...props}
            />
          ),
          hr: ({ className, ...props }: any) => (
            <hr className={cn("border-border my-8", className)} {...props} />
          ),
          table: ({ className, ...props }: any) => (
            <div className="my-4 overflow-x-auto">
              <table className={cn("w-full border-collapse", className)} {...props} />
            </div>
          ),
          th: ({ className, ...props }: any) => (
            <th
              className={cn(
                "border-border bg-muted border px-4 py-2 text-left font-medium",
                className,
              )}
              {...props}
            />
          ),
          td: ({ className, ...props }: any) => (
            <td className={cn("border-border border px-4 py-2", className)} {...props} />
          ),
          img: ({ className, alt, src }: any) => {
            if (!src || typeof src !== "string") return null

            return (
              <Image
                src={src}
                alt={alt || ""}
                width={800}
                height={600}
                className={cn("h-auto max-w-full rounded-lg", className)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
