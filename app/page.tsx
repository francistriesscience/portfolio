import * as React from "react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui"

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-start gap-16">
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col items-start">
          <h1 className="font-georgia text-4xl font-medium">Francis Ignacio</h1>
          <h2 className="text-muted-foreground text-sm">Software Engineer</h2>
        </div>
        <p className="text-muted-foreground text-sm italic">
          Loves teaching and sharing what I have learned—practical tips, stories, and workflows that
          help others grow. By training I am a software engineer, but I am deeply curious about data
          science and enjoy applying data-driven thinking to real problems.
        </p>
      </div>

      <div className="flex w-full flex-col items-start gap-4">
        <h2 className="text-xl font-medium">Projects</h2>

        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
          <Card className="w-full border-none bg-transparent p-0">
            <CardHeader className="p-0">
              <div className="h-40 w-full rounded-xl border bg-transparent" />
            </CardHeader>
            <CardContent className="flex w-full flex-col gap-1 p-0">
              <CardTitle>Motion Primitives Pro</CardTitle>
              <CardDescription className="line-clamp-2 text-xs">
                Advanced components and templates to craft beautiful websites.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-none bg-transparent p-0">
            <CardHeader className="p-0">
              <div className="h-40 w-full rounded-xl border bg-transparent" />
            </CardHeader>
            <CardContent className="flex w-full flex-col gap-1 p-0">
              <CardTitle>Motion Primitives Pro</CardTitle>
              <CardDescription className="line-clamp-2 text-xs">
                Advanced components and templates to craft beautiful websites.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-4">
        <h2 className="text-xl font-medium">Experiences</h2>

        <div className="flex w-full flex-col gap-2">
          <Card className="rounded-xl bg-transparent p-0">
            <CardContent className="flex w-full items-start justify-between p-3">
              <div className="flex flex-col items-start">
                <h2>Senior Software Engineer</h2>
                <p className="text-muted-foreground text-sm">SimpleProjeX — USA</p>
              </div>
              <p className="text-muted-foreground text-sm">2025 - Present</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl bg-transparent p-0">
            <CardContent className="flex w-full items-start justify-between p-3">
              <div className="flex flex-col items-start">
                <h2>Professor</h2>
                <p className="text-muted-foreground text-sm">Holy Angel University — Philippines</p>
              </div>
              <p className="text-muted-foreground text-sm">2024 - Present</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
