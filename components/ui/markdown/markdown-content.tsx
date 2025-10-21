"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"

import {
  MarkdownCodeBlock,
  MarkdownCallout,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui"

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
          p: ({ className, children, ...props }: any) => {
            const childrenArray = React.Children.toArray(children)
            const firstChild = childrenArray[0]

            if (typeof firstChild === "string") {
              const calloutMatch = firstChild.match(/^::\s*(info|warning|error|success)\s*/)
              const lastChild = childrenArray[childrenArray.length - 1]
              const endsWithCallout =
                typeof lastChild === "string" && lastChild.trim().endsWith("::")

              if (calloutMatch && endsWithCallout) {
                const type = calloutMatch[1] as "info" | "warning" | "error" | "success"
                const content = childrenArray
                  .map((child) => (typeof child === "string" ? child : ""))
                  .join("")
                  .replace(/^::\s*(info|warning|error|success)\s*/, "")
                  .replace(/\s*::$/, "")
                  .trim()

                return <MarkdownCallout type={type}>{content}</MarkdownCallout>
              }
            }

            return (
              <p
                className={cn("text-muted-foreground mb-4 leading-relaxed font-light", className)}
                {...props}
              >
                {children}
              </p>
            )
          },
          ul: ({ className, ...props }: any) => (
            <ul
              className={cn("text-muted-foreground mb-4 ml-6 list-disc space-y-1", className)}
              {...props}
            />
          ),
          ol: ({ className, ...props }: any) => (
            <ol
              className={cn("text-muted-foreground mb-4 ml-6 list-decimal space-y-1", className)}
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    className={cn(
                      "text-primary hover:text-primary/80 underline underline-offset-2 transition-colors",
                      isExternal,
                      className,
                    )}
                    href={href}
                    {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                    {...props}
                  />
                </TooltipTrigger>
                <TooltipContent>{href.replace(/^https?:\/\//, "")}</TooltipContent>
              </Tooltip>
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
            <div className="overflow-x-auto pb-4">
              <table className={cn("min-w-full text-sm", className)} {...props} />
            </div>
          ),
          tr: ({ className, children, ...props }: any) => {
            const shouldHighlightRow = React.Children.toArray(children).some((child: any) => {
              if (child?.props?.children) {
                return React.Children.toArray(child.props.children).some((grandChild) => {
                  if (typeof grandChild === "string") {
                    return grandChild.trim().includes("{$row}")
                  }
                  return false
                })
              }
              return false
            })

            return (
              <tr className={cn(shouldHighlightRow && "bg-table-cell", className)} {...props}>
                {children}
              </tr>
            )
          },
          th: ({ className, ...props }: any) => (
            <th
              className={cn(
                "border-border bg-muted border px-4 py-2 text-left font-medium",
                className,
              )}
              {...props}
            />
          ),
          td: ({ className, children, ...props }: any) => {
            const shouldHighlightCell = React.Children.toArray(children).some((child) => {
              if (typeof child === "string") {
                return child.trim().includes("{$cell}")
              }
              return false
            })

            const processedChildren = React.Children.map(children, (child) => {
              if (typeof child === "string") {
                return child.replace(/\{\$cell\}/g, "").replace(/\{\$row\}/g, "")
              }
              return child
            })

            return (
              <td
                className={cn(
                  "border-border border px-4 py-2",
                  shouldHighlightCell && "bg-table-cell text-primary font-medium",
                  className,
                )}
                {...props}
              >
                {processedChildren}
              </td>
            )
          },
          img: ({ className, alt, src }: any) => {
            if (!src || typeof src !== "string") return null

            return (
              <span className="flex flex-col items-center gap-1">
                <Image
                  src={src}
                  alt={alt || ""}
                  width={1000}
                  height={1000}
                  className={cn("border-border h-auto max-w-full rounded-sm border", className)}
                  loading="lazy"
                />
                {alt ? <span className="text-muted-foreground text-xs italic">{alt}</span> : null}
              </span>
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
