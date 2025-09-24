import * as React from "react"
import Link from "next/link"
import { MailsIcon, GitlabIcon, LinkedinIcon } from "lucide-react"

export function ConnectSection() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <h2 className="text-xl font-medium">Connect</h2>
      <div className="flex flex-col items-start gap-4">
        <div className="text-muted-foreground flex flex-row flex-wrap items-center gap-2 text-sm">
          <span className="whitespace-nowrap">Feel free to contact me at</span>
          <div className="flex items-center gap-1">
            <MailsIcon className="size-4" />
            <Link
              className="text-primary underline underline-offset-4"
              href="mailto:hello@francistries.science"
            >
              hello@francistries.science.
            </Link>
          </div>
        </div>
        <div className="text-muted-foreground flex flex-row items-center gap-2">
          <Link
            className="text-primary underline underline-offset-4"
            href="https://gitlab.com/francistriesscience"
          >
            <GitlabIcon className="size-5" />
          </Link>
          <Link
            className="text-primary underline underline-offset-4"
            href="https://www.linkedin.com/in/noeyislearning"
          >
            <LinkedinIcon className="size-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
