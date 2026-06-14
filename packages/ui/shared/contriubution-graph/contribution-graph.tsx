"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "../../lib/utils"

export interface ContributionData {
  count: number
  date: string
  level: number
}

export interface ContributionGraphProps {
  className?: string
  data?: ContributionData[]
  endDate?: Date
  showDayLabels?: boolean
  showLegend?: boolean
  startDate?: Date
  showTooltips?: boolean
  year?: number
}

const DAYS_IN_WEEK = 7
const JANUARY_MONTH = 0
const DECEMBER_MONTH = 11
const TOOLTIP_OFFSET_X = 10
const TOOLTIP_OFFSET_Y = 40

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const

// Contribution level colors (similar to GitHub's)
const CONTRIBUTION_COLORS = [
  "bg-muted", // Level 0 - No contributions
  "bg-success/20", // Level 1
  "bg-success/40", // Level 2
  "bg-success/65", // Level 3
  "bg-success", // Level 4 - Max
]

const LEVEL_0 = 0
const LEVEL_1 = 1
const LEVEL_2 = 2
const LEVEL_3 = 3
const LEVEL_4 = 4
const CONTRIBUTION_LEVELS = [LEVEL_0, LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4]
const DAY_1 = 1
const DAY_31 = 31

interface GraphDay extends ContributionData {
  isVisible: boolean
}

interface MonthHeader {
  colspan: number
  month: string
  startWeek: number
}

const getMonthLabel = (monthIndex: number) => MONTHS[monthIndex] ?? ""

const formatDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}-${month}-${day}`
}

const clampLevel = (level: number) => Math.min(LEVEL_4, Math.max(LEVEL_0, level))

const normalizeDate = (date: Date) => {
  const normalizedDate = new Date(date)
  normalizedDate.setHours(0, 0, 0, 0)
  return normalizedDate
}

const getContributionLevel = (day: Partial<ContributionData> | undefined) => {
  if (!day) {
    return LEVEL_0
  }

  if (typeof day.level === "number") {
    return clampLevel(day.level)
  }

  const count = day.count ?? LEVEL_0
  if (count <= LEVEL_0) {
    return LEVEL_0
  }
  if (count === LEVEL_1) {
    return LEVEL_1
  }
  if (count <= 3) {
    return LEVEL_2
  }
  if (count <= 6) {
    return LEVEL_3
  }
  return LEVEL_4
}

const createGraphDay = (
  currentDate: Date,
  contributionMap: Map<string, ContributionData>,
  visibleRange: { end: Date; start: Date },
): GraphDay => {
  const dateString = formatDateKey(currentDate)
  const existingData = contributionMap.get(dateString)
  const normalizedDate = normalizeDate(currentDate)

  return {
    count: existingData?.count ?? LEVEL_0,
    date: dateString,
    isVisible: normalizedDate >= visibleRange.start && normalizedDate <= visibleRange.end,
    level: getContributionLevel(existingData),
  }
}

const getRangeBounds = (startDate: Date, endDate: Date) => {
  const normalizedStartDate = normalizeDate(startDate)
  const normalizedEndDate = normalizeDate(endDate)
  const firstSunday = new Date(normalizedStartDate)
  firstSunday.setDate(normalizedStartDate.getDate() - normalizedStartDate.getDay())
  const lastSaturday = new Date(normalizedEndDate)
  lastSaturday.setDate(normalizedEndDate.getDate() + (DAYS_IN_WEEK - DAY_1 - normalizedEndDate.getDay()))

  return {
    endDate: normalizedEndDate,
    firstSunday,
    lastSaturday,
    startDate: normalizedStartDate,
  }
}

const buildWeeks = (contributionData: ContributionData[], startDate: Date, endDate: Date) => {
  const contributionMap = new Map(contributionData.map((entry) => [entry.date, entry]))
  const { firstSunday, lastSaturday, startDate: rangeStart, endDate: rangeEnd } = getRangeBounds(
    startDate,
    endDate,
  )
  const weeks: GraphDay[][] = []

  for (
    let cursor = new Date(firstSunday);
    cursor <= lastSaturday;
    cursor.setDate(cursor.getDate() + DAYS_IN_WEEK)
  ) {
    const week: GraphDay[] = []

    for (let day = 0; day < DAYS_IN_WEEK; day++) {
      const currentDate = new Date(cursor)
      currentDate.setDate(cursor.getDate() + day)
      week.push(
        createGraphDay(currentDate, contributionMap, {
          end: rangeEnd,
          start: rangeStart,
        }),
      )
    }

    weeks.push(week)
  }

  return weeks
}

const trimInvisibleWeeks = (weeks: GraphDay[][]) => {
  let startIndex = 0
  let endIndex = weeks.length - 1

  while (startIndex <= endIndex && weeks[startIndex]?.every((day) => !day.isVisible)) {
    startIndex++
  }

  while (endIndex >= startIndex && weeks[endIndex]?.every((day) => !day.isVisible)) {
    endIndex--
  }

  return weeks.slice(startIndex, endIndex + 1)
}

const calculateMonthHeaders = (startDate: Date, endDate: Date, weekCount: number): MonthHeader[] => {
  const headerStarts: Array<{ month: string; startWeek: number }> = []
  const { firstSunday, startDate: normalizedStartDate, endDate: normalizedEndDate } = getRangeBounds(startDate, endDate)
  const rangeStartMonth = normalizedStartDate.getMonth()
  const rangeStartYear = normalizedStartDate.getFullYear()

  for (
    let cursor = new Date(rangeStartYear, rangeStartMonth, DAY_1);
    cursor <= normalizedEndDate;
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, DAY_1)
  ) {
    const isRangeStartMonth = cursor.getFullYear() === rangeStartYear && cursor.getMonth() === rangeStartMonth

    let startWeek = -1

    for (let weekNumber = 0; weekNumber < weekCount; weekNumber++) {
      const weekStart = new Date(firstSunday)
      weekStart.setDate(firstSunday.getDate() + weekNumber * DAYS_IN_WEEK)
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + (DAYS_IN_WEEK - DAY_1))

      if (weekEnd < normalizedStartDate || weekStart > normalizedEndDate) {
        continue
      }

      if (isRangeStartMonth) {
        startWeek = weekNumber
        break
      }

      if (weekStart.getFullYear() === cursor.getFullYear() && weekStart.getMonth() === cursor.getMonth()) {
        startWeek = weekNumber
        break
      }
    }

    if (startWeek !== -1) {
      headerStarts.push({
        month: getMonthLabel(cursor.getMonth()),
        startWeek,
      })
    }
  }

  return headerStarts.map((header, index) => ({
    colspan: (headerStarts[index + 1]?.startWeek ?? weekCount) - header.startWeek,
    month: header.month,
    startWeek: header.startWeek,
  }))
}

export function ContributionGraph({
  data = [],
  year = new Date().getFullYear(),
  className = "",
  endDate,
  showDayLabels = true,
  showLegend = true,
  startDate,
  showTooltips = true,
}: ContributionGraphProps) {
  const [hoveredDay, setHoveredDay] = React.useState<ContributionData | null>(null)
  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 })
  const shouldReduceMotion = useReducedMotion()
  const resolvedStartDate = React.useMemo(
    () => startDate ?? new Date(year, JANUARY_MONTH, DAY_1),
    [startDate, year],
  )
  const resolvedEndDate = React.useMemo(
    () => endDate ?? new Date(year, DECEMBER_MONTH, DAY_31),
    [endDate, year],
  )

  const weeks = React.useMemo(
    () => trimInvisibleWeeks(buildWeeks(data, resolvedStartDate, resolvedEndDate)),
    [data, resolvedEndDate, resolvedStartDate],
  )
  const monthHeaders = React.useMemo(
    () => calculateMonthHeaders(resolvedStartDate, resolvedEndDate, weeks.length),
    [resolvedEndDate, resolvedStartDate, weeks.length],
  )

  const handleDayHover = (day: ContributionData, event: React.MouseEvent) => {
    if (showTooltips && day.date) {
      setHoveredDay(day)
      setTooltipPosition({ x: event.clientX, y: event.clientY })
    }
  }

  const handleDayLeave = () => {
    setHoveredDay(null)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return ""
    }
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getContributionText = (count: number) => {
    if (count === LEVEL_0) {
      return "No contributions"
    }
    if (count === LEVEL_1) {
      return "1 contribution"
    }
    return `${count} contributions`
  }

  return (
    <div className={cn("contribution-graph", className)}>
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-1 text-xs">
          <caption className="sr-only">Contribution Graph for {year}</caption>

          {/* Month Headers */}
          <thead>
            <tr className="h-3">
              <td className={cn(showDayLabels ? "w-7 min-w-7" : "w-0 min-w-0 p-0")} />
              {monthHeaders.map((header) => (
                <td
                  className="text-foreground relative text-left"
                  colSpan={header.colspan}
                  key={`${header.month}-${header.startWeek}`}
                >
                  <span className="absolute top-0 left-1">{header.month}</span>
                </td>
              ))}
            </tr>
          </thead>

          {/* Day Grid */}
          <tbody>
            {Array.from({ length: DAYS_IN_WEEK }, (_, dayIndex) => (
              <tr className="h-2.5" key={dayIndex}>
                {/* Day Labels */}
                <td className={cn("text-foreground relative", showDayLabels ? "w-7 min-w-7" : "w-0 min-w-0 p-0")}>
                  {showDayLabels && dayIndex % 2 === 0 && (
                    <span className="absolute -bottom-0.5 left-0 text-xs">{DAYS[dayIndex] ?? ""}</span>
                  )}
                </td>

                {/* Day Cells */}
                {weeks.map((week, weekIndex) => {
                  const dayData = week[dayIndex]
                  const cellKey = `${dayData?.date ?? "empty"}-${weekIndex}-${dayIndex}`
                  if (!dayData) {
                    return null
                  }

                  return (
                    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: Table cell is interactive for hover tooltips
                    <td
                      className={cn("h-2.5 w-2.5 p-0", dayData.isVisible && "cursor-pointer")}
                      key={cellKey}
                      onMouseEnter={dayData.isVisible ? (e) => handleDayHover(dayData, e) : undefined}
                      onMouseLeave={dayData.isVisible ? handleDayLeave : undefined}
                    >
                      <div
                        className={cn(
                          "h-2.5 w-2.5 rounded-sm hover:ring-2 hover:ring-background",
                          CONTRIBUTION_COLORS[dayData.level],
                          !dayData.isVisible && "opacity-0",
                        )}
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tooltip */}
      {showTooltips && hoveredDay && (
        <motion.div
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          className="bg-popover text-popover-foreground pointer-events-none fixed z-50 w-max max-w-xs rounded-md border border-border px-3 py-2 text-sm shadow-lg"
          exit={
            shouldReduceMotion
              ? { opacity: 0, transition: { duration: 0 } }
              : { opacity: 0, scale: 0.8 }
          }
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
          style={{
            left: tooltipPosition.x + TOOLTIP_OFFSET_X,
            top: tooltipPosition.y - TOOLTIP_OFFSET_Y,
          }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
        >
          <div className="font-semibold">{getContributionText(hoveredDay.count)}</div>
          <div className="text-foreground/70">{formatDate(hoveredDay.date)}</div>
        </motion.div>
      )}

      {/* Legend */}
      {showLegend && (
        <div className="text-foreground/70 mt-4 flex items-center justify-between text-xs">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {CONTRIBUTION_LEVELS.map((level) => (
              <div className={`h-3 w-3 rounded-sm ${CONTRIBUTION_COLORS[level]}`} key={level} />
            ))}
          </div>
          <span>More</span>
        </div>
      )}
    </div>
  )
}
