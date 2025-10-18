"use client"

import Link from "next/link"
import { RiTwitterXLine, RiRedditLine } from "react-icons/ri"

import { Button } from "@/components/ui"

export function ShareButton({ url }: { url: string }) {
  return (
    <div className="mt-2 flex w-full flex-row items-center justify-end gap-2 text-xs">
      <span className="text-muted-foreground">Share it on</span>
      <Button variant="link" size="sm" asChild className="p-0">
        <Link href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}>
          <RiTwitterXLine className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="link" size="sm" asChild className="p-0">
        <Link href={`https://www.reddit.com/submit?url=${encodeURIComponent(url)}`}>
          <RiRedditLine className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
