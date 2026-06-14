"use client"

import * as React from "react"

import { Badge, Separator } from "@packages/ui/shared"
import { ContributionGraph, type ContributionData } from "@packages/ui/shared/contriubution-graph/contribution-graph"

interface ContributionsResponse {
  data: ContributionData[]
  end?: string
  message?: string
  start?: string
  totalContributions: number
  totalLastYearContributions?: number
  username: string
  year: number
}

export function Contribution() {
  const today = React.useMemo(() => new Date(), [])
  const fallbackRangeStart = React.useMemo(
    () => new Date(today.getFullYear(), today.getMonth() - 8, 1),
    [today],
  )
  const fallbackRangeEnd = today
  const [contributions, setContributions] = React.useState<ContributionData[]>([])
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [metadata, setMetadata] = React.useState<Pick<
    ContributionsResponse,
    "totalContributions" | "totalLastYearContributions" | "username" | "year"
  > | null>(null)
  const [range, setRange] = React.useState({
    endDate: fallbackRangeEnd,
    startDate: fallbackRangeStart,
  })

  React.useEffect(() => {
    let isMounted = true

    async function loadContributions() {
      try {
        const response = await fetch("/graph/github-contributions.json")
        const payload = (await response.json()) as ContributionsResponse & { error?: string }

        if (!response.ok) {
          throw new Error(payload.message ?? payload.error ?? "Unable to load contribution data.")
        }

        if (!isMounted) {
          return
        }

        setContributions(payload.data)
        setMetadata({
          totalContributions: payload.totalContributions,
          totalLastYearContributions: payload.totalLastYearContributions ?? payload.totalContributions ?? 0,
          username: payload.username,
          year: payload.year,
        })
        if (payload.start && payload.end) {
          setRange({
            endDate: new Date(`${payload.end}T00:00:00`),
            startDate: new Date(`${payload.start}T00:00:00`),
          })
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load contribution data.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadContributions()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center gap-4">
        <div className="flex shrink-0 items-center gap-2">
          <h2 className="text-muted-foreground text-xs font-medium tracking-widest whitespace-nowrap uppercase">
            Contribution
          </h2>
          {metadata && (
            <Badge variant="outline" size="sm" className="font-mono tabular-nums">
              {(metadata.totalLastYearContributions ?? 0).toLocaleString("en-US")}
            </Badge>
          )}
        </div>
        <Separator className="flex-1" />
      </div>

      {isLoading ? (
        <div className="text-muted-foreground text-sm">Loading contribution graph...</div>
      ) : error ? (
        <div className="text-muted-foreground text-sm">{error}</div>
      ) : (
        <ContributionGraph
          data={contributions}
          year={range.endDate.getFullYear()}
          startDate={range.startDate}
          endDate={range.endDate}
          showDayLabels={false}
          showLegend={false}
        />
      )}
    </section>
  )
}
