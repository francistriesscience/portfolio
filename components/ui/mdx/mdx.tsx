/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MDXContentProps {
  children: React.ReactNode
  className?: string
}

interface MDXComponents {
  [key: string]: React.ComponentType<any>
}

function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "error" | "success"
  children: React.ReactNode
}) {
  const typeStyles = {
    info: "border-blue-500/20 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100",
    warning:
      "border-yellow-500/20 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100",
    error: "border-red-500/20 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100",
    success: "border-green-500/20 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100",
  }

  return <div className={cn("my-4 rounded-r-lg border-l-4 p-4", typeStyles[type])}>{children}</div>
}

export function MDXContent({ children, className }: MDXContentProps) {
  return (
    <div className={cn("prose prose-neutral dark:prose-invert max-w-none", className)}>
      <div className="text-foreground">{children}</div>
    </div>
  )
}

export const mdxComponents: MDXComponents = {
  Callout,
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
      className={cn("text-muted-foreground mb-4 list-inside list-disc space-y-1", className)}
      {...props}
    />
  ),

  ol: ({ className, ...props }: any) => (
    <ol
      className={cn("text-muted-foreground mb-4 list-inside list-decimal space-y-1", className)}
      {...props}
    />
  ),

  li: ({ className, ...props }: any) => (
    <li className={cn("leading-relaxed", className)} {...props} />
  ),

  a: ({ className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http")
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

  code: ({ className, ...props }: any) => {
    const isInline = !className?.includes("language-")
    return (
      <code
        className={cn(
          "rounded px-1.5 py-0.5 font-mono text-sm",
          isInline
            ? "bg-muted text-muted-foreground"
            : "bg-muted text-foreground block overflow-x-auto p-4",
          className,
        )}
        {...props}
      />
    )
  },

  pre: ({ className, ...props }: any) => (
    <pre
      className={cn(
        "bg-muted text-foreground mb-4 overflow-x-auto rounded-lg p-4 font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),

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
      className={cn("border-border bg-muted border px-4 py-2 text-left font-medium", className)}
      {...props}
    />
  ),

  td: ({ className, ...props }: any) => (
    <td className={cn("border-border border px-4 py-2", className)} {...props} />
  ),

  img: ({ className, alt, src, width, height }: any) => {
    if (!src || typeof src !== "string") return null

    return (
      <Image
        src={src}
        alt={alt || ""}
        width={width ? parseInt(width.toString()) : 800}
        height={height ? parseInt(height.toString()) : 600}
        className={cn("h-auto max-w-full rounded-lg", className)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    )
  },
}

export function useMDXComponents(customComponents?: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...customComponents,
  }
}
