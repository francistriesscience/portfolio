"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { highlight } from "sugar-high"

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui"

interface CodeBlockProps {
  children: any
  className?: string
}

export function MarkdownCodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const codeElement = React.Children.toArray(children).find((child: any) =>
    child?.props?.className?.includes("language-"),
  ) as any

  const match = /language-(\w+)/.exec(codeElement?.props?.className || "")
  const language = match ? match[1] : "code"

  // Extract code content
  let codeContent = ""
  if (codeElement?.props?.children) {
    const content = codeElement.props.children
    if (Array.isArray(content)) {
      codeContent = content.join("")
    } else if (typeof content === "string") {
      codeContent = content
    }
  }

  // Trim trailing newline if present
  codeContent = codeContent.replace(/\n$/, "")

  // Highlight the code using sugar-high
  const highlightedCode = React.useMemo(() => highlight(codeContent), [codeContent])

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
        <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {language}
        </span>
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
      <pre
        className="bg-muted !m-0 overflow-x-auto rounded-b-lg border p-4 font-mono text-sm"
        {...props}
      >
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  )
}
