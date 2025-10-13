"use client"

import { useMemo } from "react"
import { startOfDay, addDays, differenceInDays, format, isValid } from "date-fns"
import type { PayWindow } from "@types/index"

// Reference date for calculating pay periods (Oct 2, 2024)
const REFERENCE_DATE = new Date(2024, 9, 2) // Month is 0-indexed, so 9 = October

/**
 * Calculates pay window boundaries for any given date
 *
 * Pay Window Rules:
 * - Fixed 2-week (14-day) pay periods starting from Oct 2, 2024
 * - Any work date falls into one of these fixed periods
 * - Payday is 14 days after the period ends
 *
 * @param date - Any date to calculate the window for (can be undefined)
 * @returns PayWindow object with start, end, and payday dates, or null if date is invalid
 *
 * @example
 * // For Oct 9, 2024 (falls into Oct 2-15 period)
 * const window = useWindowCalculation(new Date('2024-10-09'));
 * // Returns: { startDate: Oct 2, endDate: Oct 15, paydayDate: Oct 29 }
 */
export function useWindowCalculation(date: Date | undefined): PayWindow | null {
  return useMemo(() => {
    if (!date || !isValid(date)) {
      return null
    }

    const normalized = startOfDay(date)
    const refDate = startOfDay(REFERENCE_DATE)

    // Calculate how many days since reference date
    const daysSinceRef = differenceInDays(normalized, refDate)

    // Determine which 2-week period this date falls into
    // Each period is 14 days (0-13, 14-27, 28-41, etc.)
    const periodIndex = Math.floor(daysSinceRef / 14)

    // Calculate the start of this period
    const startDate = addDays(refDate, periodIndex * 14)

    // End date is 13 days after start (14 days total including start)
    const endDate = addDays(startDate, 13)

    // Payday is 14 days after period ends
    const paydayDate = addDays(endDate, 14)

    return {
      startDate,
      endDate,
      paydayDate,
      windowEndDateISO: format(endDate, "yyyy-MM-dd"),
    }
  }, [date])
}
