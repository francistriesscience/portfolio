import { cn } from "@/lib/utils"

export function MarkdownCallout({
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
