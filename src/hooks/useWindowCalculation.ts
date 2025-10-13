"use client"

import { useMemo } from "react"
import { startOfDay, addDays, format, isValid } from "date-fns"
import type { PayWindow } from "@types/index"

/**
 * Calculates pay window boundaries for any given date
 *
 * Pay Window Rules:
 * - Window starts on Thursday and ends on following Friday (8 days inclusive)
 * - Payday is 7 days after window end (the next Friday)
 *
 * @param date - Any date to calculate the window for (can be undefined)
 * @returns PayWindow object with start, end, and payday dates, or null if date is invalid
 *
 * @example
 * // For a date in the window Thu 09/18 → Fri 09/26
 * const window = useWindowCalculation(new Date('2025-09-20'));
 * // Returns: { startDate: Thu 09/18, endDate: Fri 09/26, paydayDate: Fri 10/03 }
 */
export function useWindowCalculation(date: Date | undefined): PayWindow | null {
  return useMemo(() => {
    if (!date || !isValid(date)) {
      return null
    }

    const normalized = startOfDay(date)
    const dayOfWeek = normalized.getDay() // 0 = Sunday, 4 = Thursday, 5 = Friday

    // Calculate days back to the most recent Thursday (or current day if Thursday)
    // Thursday = 4, so we need to go back (dayOfWeek - 4 + 7) % 7 days
    const daysBackToThursday = (dayOfWeek + 3) % 7 // 0 if Thu, 1 if Fri, 2 if Sat, etc.

    const startDate = addDays(normalized, -daysBackToThursday)
    const endDate = addDays(startDate, 8) // 8 days later = following Friday
    const paydayDate = addDays(endDate, 7) // 7 days after end = next Friday

    return {
      startDate,
      endDate,
      paydayDate,
      windowEndDateISO: format(endDate, "yyyy-MM-dd"),
    }
  }, [date])
}
