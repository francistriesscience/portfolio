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
  showLegend?: boolean
  showTooltips?: boolean
  year?: number
}

const DAYS_IN_WEEK = 7
const JANUARY_MONTH = 0
const DECEMBER_MONTH = 11
const SUNDAY_DAY = 0
const MIN_WEEKS_FOR_DECEMBER_HEADER = 2
const TOOLTIP_OFFSET_X = 10
const TOOLTIP_OFFSET_Y = 40

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const

// Contribution level colors (similar to GitHub's)
const CONTRIBUTION_COLORS = [
  "bg-primary", // Level 0 - No contributions
  "bg-brand/25", // Level 1
  "bg-brand/50", // Level 2
  "bg-brand/75", // Level 3
  "bg-brand", // Level 4 - Max
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
  isInYear: boolean
}

interface MonthHeader {
  colspan: number
  month: string
  startWeek: number
}

interface MonthHeaderCheck {
  currentMonth: number
  currentYear: number
  startDateDay: number
  targetYear: number
  weekCount: number
}

const shouldShowMonthHeader = ({
  currentYear,
  targetYear,
  currentMonth,
  startDateDay,
  weekCount,
}: MonthHeaderCheck) =>
  currentYear === targetYear ||
  (currentYear === targetYear - 1 &&
    currentMonth === DECEMBER_MONTH &&
    startDateDay !== SUNDAY_DAY &&
    weekCount >= MIN_WEEKS_FOR_DECEMBER_HEADER)

const getMonthLabel = (monthIndex: number) => MONTHS[monthIndex] ?? ""

const formatDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}-${month}-${day}`
}

const clampLevel = (level: number) => Math.min(LEVEL_4, Math.max(LEVEL_0, level))

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
  targetYear: number,
): GraphDay => {
  const dateString = formatDateKey(currentDate)
  const existingData = contributionMap.get(dateString)

  return {
    count: existingData?.count ?? LEVEL_0,
    date: dateString,
    isInYear: currentDate.getFullYear() === targetYear,
    level: getContributionLevel(existingData),
  }
}

const getCalendarBounds = (targetYear: number) => {
  const startDate = new Date(targetYear, JANUARY_MONTH, DAY_1)
  const endDate = new Date(targetYear, DECEMBER_MONTH, DAY_31)
  const firstSunday = new Date(startDate)
  firstSunday.setDate(startDate.getDate() - startDate.getDay())
  const lastSaturday = new Date(endDate)
  lastSaturday.setDate(endDate.getDate() + (DAYS_IN_WEEK - DAY_1 - endDate.getDay()))

  return { endDate, firstSunday, lastSaturday, startDate }
}

const buildWeeks = (contributionData: ContributionData[], targetYear: number) => {
  const contributionMap = new Map(contributionData.map((entry) => [entry.date, entry]))
  const { firstSunday, lastSaturday } = getCalendarBounds(targetYear)
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
      week.push(createGraphDay(currentDate, contributionMap, targetYear))
    }

    weeks.push(week)
  }

  return weeks
}

const calculateMonthHeaders = (targetYear: number, weekCount: number): MonthHeader[] => {
  const headers: MonthHeader[] = []
  const { firstSunday, startDate } = getCalendarBounds(targetYear)
  let currentMonth = -1
  let currentYear = -1
  let monthStartWeek = 0
  let currentMonthWeekCount = 0

  for (let weekNumber = 0; weekNumber < weekCount; weekNumber++) {
    const weekDate = new Date(firstSunday)
    weekDate.setDate(firstSunday.getDate() + weekNumber * DAYS_IN_WEEK)

    const monthKey = weekDate.getMonth()
    const yearKey = weekDate.getFullYear()

    if (monthKey !== currentMonth || yearKey !== currentYear) {
      if (
        currentMonth !== -1 &&
        shouldShowMonthHeader({
          currentYear,
          targetYear,
          currentMonth,
          startDateDay: startDate.getDay(),
          weekCount: currentMonthWeekCount,
        })
      ) {
        headers.push({
          month: getMonthLabel(currentMonth),
          colspan: currentMonthWeekCount,
          startWeek: monthStartWeek,
        })
      }
      currentMonth = monthKey
      currentYear = yearKey
      monthStartWeek = weekNumber
      currentMonthWeekCount = 1
    } else {
      currentMonthWeekCount++
    }
  }

  if (
    currentMonth !== -1 &&
    shouldShowMonthHeader({
      currentYear,
      targetYear,
      currentMonth,
      startDateDay: startDate.getDay(),
      weekCount: currentMonthWeekCount,
    })
  ) {
    headers.push({
      month: getMonthLabel(currentMonth),
      colspan: currentMonthWeekCount,
      startWeek: monthStartWeek,
    })
  }

  return headers
}

export function ContributionGraph({
  data = [],
  year = new Date().getFullYear(),
  className = "",
  showLegend = true,
  showTooltips = true,
}: ContributionGraphProps) {
  const [hoveredDay, setHoveredDay] = React.useState<ContributionData | null>(null)
  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 })
  const shouldReduceMotion = useReducedMotion()

  const weeks = React.useMemo(() => buildWeeks(data, year), [data, year])
  const monthHeaders = React.useMemo(() => calculateMonthHeaders(year, weeks.length), [year, weeks.length])

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
              <td className="w-7 min-w-7" />
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
                <td className="text-foreground relative w-7 min-w-7">
                  {dayIndex % 2 === 0 && (
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
                      className="h-2.5 w-2.5 cursor-pointer p-0"
                      key={cellKey}
                      onMouseEnter={(e) => handleDayHover(dayData, e)}
                      onMouseLeave={handleDayLeave}
                      title={
                        showTooltips
                          ? `${formatDate(dayData.date)}: ${getContributionText(dayData.count)}`
                          : undefined
                      }
                    >
                      <div
                        className={cn(
                          "h-2.5 w-2.5 rounded-sm hover:ring-2 hover:ring-background",
                          CONTRIBUTION_COLORS[dayData.level],
                          !dayData.isInYear && "opacity-70",
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
          className="bg-primary text-foreground pointer-events-none fixed z-50 rounded-lg border px-3 py-2 text-sm shadow-lg"
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
