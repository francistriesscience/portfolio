import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import { env } from "../lib/env"

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql"
const OUTPUT_PATH = path.resolve(process.cwd(), "public/graph/github-contributions.json")
const CONTRIBUTION_LEVEL_MAP = {
  FIRST_QUARTILE: 1,
  FOURTH_QUARTILE: 4,
  NONE: 0,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
} as const

const GITHUB_CONTRIBUTIONS_QUERY = `
  query GitHubContributions(
    $login: String!
    $from: DateTime!
    $to: DateTime!
    $lastYearFrom: DateTime!
    $lastYearTo: DateTime!
  ) {
    user(login: $login) {
      visibleRange: contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              contributionLevel
              date
            }
          }
        }
      }
      lastYearRange: contributionsCollection(from: $lastYearFrom, to: $lastYearTo) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              contributionLevel
              date
            }
          }
        }
      }
    }
  }
`

interface GitHubContributionDay {
  contributionCount: number
  contributionLevel: keyof typeof CONTRIBUTION_LEVEL_MAP
  date: string
}

interface GitHubContributionCalendar {
  totalContributions: number
  weeks: Array<{
    contributionDays: GitHubContributionDay[]
  }>
}

interface GitHubGraphQLResponse {
  data?: {
    user?: {
      lastYearRange?: {
        contributionCalendar?: GitHubContributionCalendar
      }
      visibleRange?: {
        contributionCalendar?: GitHubContributionCalendar
      }
    }
  }
  errors?: Array<{ message: string }>
}

const formatDateParam = (date: Date) => {
  const year = date.getUTCFullYear()
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0")
  const day = `${date.getUTCDate()}`.padStart(2, "0")
  return `${year}-${month}-${day}`
}

const toGitHubDateTime = (dateString: string, endOfDay = false) =>
  `${dateString}T${endOfDay ? "23:59:59" : "00:00:00"}Z`

const shiftDateByYears = (dateString: string, years: number) => {
  const date = new Date(`${dateString}T00:00:00Z`)
  date.setUTCFullYear(date.getUTCFullYear() + years)
  return formatDateParam(date)
}

const getVisibleRange = () => {
  const now = new Date()
  const rangeEnd = formatDateParam(now)
  const rangeStart = formatDateParam(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 8, 1)))
  return { rangeEnd, rangeStart, year: now.getUTCFullYear() }
}

async function main() {
  if (!env.githubToken) {
    throw new Error("Missing GITHUB_TOKEN or GITHUB_PAT.")
  }

  const { rangeEnd, rangeStart, year } = getVisibleRange()
  const lastYearStart = shiftDateByYears(rangeEnd, -1)

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    body: JSON.stringify({
      query: GITHUB_CONTRIBUTIONS_QUERY,
      variables: {
        from: toGitHubDateTime(rangeStart),
        lastYearFrom: toGitHubDateTime(lastYearStart),
        lastYearTo: toGitHubDateTime(rangeEnd, true),
        login: env.githubUsername,
        to: toGitHubDateTime(rangeEnd, true),
      },
    }),
    headers: {
      Authorization: `Bearer ${env.githubToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  })

  const payload = (await response.json()) as GitHubGraphQLResponse

  if (!response.ok || payload.errors?.length) {
    throw new Error(payload.errors?.[0]?.message ?? `GitHub request failed with status ${response.status}.`)
  }

  const visibleCalendar = payload.data?.user?.visibleRange?.contributionCalendar
  const lastYearCalendar = payload.data?.user?.lastYearRange?.contributionCalendar
  const weeks = visibleCalendar?.weeks ?? []
  const data = weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      count: day.contributionCount,
      date: day.date,
      level: CONTRIBUTION_LEVEL_MAP[day.contributionLevel] ?? 0,
    })),
  )

  const output = {
    data,
    end: rangeEnd,
    start: rangeStart,
    totalContributions: visibleCalendar?.totalContributions ?? 0,
    totalLastYearContributions: lastYearCalendar?.totalContributions ?? 0,
    updatedAt: new Date().toISOString(),
    username: env.githubUsername,
    year,
  }

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true })
  await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf8")
  console.log(`Wrote ${OUTPUT_PATH}`)
}

void main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
