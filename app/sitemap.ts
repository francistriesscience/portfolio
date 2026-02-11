import { MetadataRoute } from "next"

import { getAllNotebooks } from "@/lib/notebooks/get-all-notebooks"
import { getAllProjects } from "@/lib/projects/get-all-projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects()
  const notebooks = getAllNotebooks()

  const projectUrls = projects.map((project) => ({
    url: `https://francistries.science/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const notebookUrls = notebooks.map((notebook) => ({
    url: `https://francistries.science/notebooks/${notebook.slug}`,
    lastModified: new Date(notebook.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: "https://francistries.science",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://francistries.science/projects",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://francistries.science/notebooks",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectUrls,
    ...notebookUrls,
  ]
}
