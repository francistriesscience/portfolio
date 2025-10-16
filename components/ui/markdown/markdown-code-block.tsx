"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui"

interface CodeBlockProps {
  children: any
  className?: string
}

export function MarkdownCodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const preRef = React.useRef<HTMLPreElement>(null)

  const codeElement = React.Children.toArray(children).find((child: any) =>
    child?.props?.className?.includes("language-"),
  ) as any

  const match = /language-(\w+)/.exec(codeElement?.props?.className || "")
  const language = match ? match[1] : "code"

  const handleCopy = async () => {
    try {
      if (preRef.current) {
        const codeElement = preRef.current.querySelector("code")
        const text = codeElement?.textContent || preRef.current.textContent || ""
        await navigator.clipboard.writeText(text.trim())
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        return
      }

      let code = codeElement?.props?.children

      if (Array.isArray(code)) {
        code = code.join("")
      }

      if (typeof code === "string") {
        await navigator.clipboard.writeText(code.trim())
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
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
        ref={preRef}
        className="!m-0 overflow-x-auto rounded-b-lg border font-mono text-sm"
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}
