import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui"
import projectsData from "@/data/projects.json"

type Project = {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
}

export function ProjectsSection() {
  const items = Array.isArray(projectsData) ? (projectsData as Project[]) : []

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <h2 className="text-xl font-medium">Projects</h2>
      {items.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
          {items.map((p: Project, i: number) => (
            <Card key={p?.title ?? i} className="w-full border-none bg-transparent p-0">
              <CardHeader className="p-0">
                <div className="h-40 w-full rounded-xl border bg-transparent" aria-hidden />
              </CardHeader>
              <CardContent className="flex w-full flex-col gap-1 p-0">
                <CardTitle>{p?.title ?? "Untitled"}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                  {p?.description ?? ""}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="w-full">
          <Card className="h-24 border border-dashed bg-transparent p-4">
            <CardContent className="text-muted-foreground flex h-full flex-col justify-center text-center text-sm">
              Still collecting projects...
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
