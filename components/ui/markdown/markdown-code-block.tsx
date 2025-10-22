"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { highlight } from "sugar-high"

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui"
import { getLanguageIcon } from "@/helper/get-icon-component"

interface CodeBlockProps {
  children: any
  className?: string
}

export function MarkdownCodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const codeElement = React.Children.toArray(children).find((child: any) =>
    child?.props?.className?.includes("language-"),
  ) as any

  const match = /language-([\w+-]+)(?:\{([0-9,\-]+)\})?/.exec(codeElement?.props?.className || "")
  const language = match ? match[1] : "code"
  const Icon = getLanguageIcon(language)
  const rangesStr = match && match[2] ? match[2] : undefined

  const highlightedLines = React.useMemo(() => {
    const set = new Set<number>()
    if (!rangesStr) return set
    for (const part of rangesStr.split(",")) {
      if (part.includes("-")) {
        const [startStr, endStr] = part.split("-")
        const start = parseInt(startStr, 10)
        const end = parseInt(endStr, 10)
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) set.add(i)
        }
      } else {
        const n = parseInt(part, 10)
        if (!isNaN(n)) set.add(n)
      }
    }
    return set
  }, [rangesStr])

  let codeContent = ""
  if (codeElement?.props?.children) {
    const content = codeElement.props.children
    if (Array.isArray(content)) {
      codeContent = content.join("")
    } else if (typeof content === "string") {
      codeContent = content
    }
  }

  codeContent = codeContent.replace(/\n$/, "")

  const highlightedCode = React.useMemo(() => highlight(codeContent), [codeContent])

  const highlightedLinesArr = React.useMemo(() => {
    const raw = codeContent.split("\n")
    const highlighted = highlightedCode.split("\n")

    if (highlighted.length !== raw.length) {
      return raw.map((ln) => {
        const trimmed = ln.trim()
        return trimmed === "" ? "" : highlight(ln)
      })
    }

    return highlighted.map((ln, i) => {
      const rawLine = raw[i] || ""
      const trimmed = rawLine.trim()

      return trimmed === "" ? "" : ln
    })
  }, [codeContent, highlightedCode])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  return (
    <div className="not-prose group relative my-6">
      <div className="bg-muted/50 border-border/50 flex items-center justify-between rounded-t-lg border border-b-0 px-3 py-2">
        <div className="flex flex-row items-center gap-2">
          {Icon && <Icon className="size-4" />}
          <span className="text-muted-foreground text-xs font-medium uppercase">{language}</span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-muted size-7"
                onClick={handleCopy}
              >
                {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">{copied ? "Copied!" : "Copy to Clipboard"}</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <pre
        className="bg-muted !m-0 overflow-x-auto rounded-b-lg border p-2 font-mono text-xs tracking-normal"
        {...props}
      >
        <code className="block">
          {highlightedLinesArr.map((lineHtml, i) => {
            const lineNumber = i + 1
            const isHighlighted = highlightedLines.has(lineNumber)
            const html = lineHtml || " "
            return (
              <div
                key={i}
                className={cn(
                  "flex min-w-full",
                  isHighlighted ? "bg-primary/5 dark:bg-primary-950/20" : "",
                )}
              >
                <span
                  className="flex-1 whitespace-pre"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            )
          })}
        </code>
      </pre>
    </div>
  )
}
