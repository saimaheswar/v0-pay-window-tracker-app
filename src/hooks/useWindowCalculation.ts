"use client"

import { useMemo } from "react"
import { startOfDay, addDays, differenceInDays, format, isValid } from "date-fns"
import type { PayWindow } from "@types/index"

const REFERENCE_DATE = new Date("2024-09-19") // September 19, 2024 (Thursday)
const WINDOW_LENGTH = 9 // 9 days (Thursday to next Friday, inclusive)
const PAYDAY_OFFSET = 6 // 6 days after window ends

/**
 * Calculates pay window boundaries for any given date
 *
 * Pay Window Rules:
 * - Pay windows start every Thursday (first window: Sep 19, 2024)
 * - Each window lasts 9 days (Thursday to next Friday)
 * - Payday is 6 days after the window ends
 *
 * @param date - Any date to calculate the window for (can be undefined)
 * @returns PayWindow object with start, end, and payday dates, or null if date is invalid
 *
 * @example
 * // For Sep 21, 2024 (falls into Sep 19-27 window)
 * const window = useWindowCalculation(new Date('2024-09-21'));
 * // Returns: { startDate: Sep 19, endDate: Sep 27, paydayDate: Oct 3 }
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

    console.log("[v0] Window calculation debug:", {
      inputDate: format(normalized, "yyyy-MM-dd"),
      refDate: format(refDate, "yyyy-MM-dd"),
      daysSinceRef,
    })

    const windowIndex = Math.floor(daysSinceRef / WINDOW_LENGTH)

    const startDate = addDays(refDate, windowIndex * WINDOW_LENGTH)

    const endDate = addDays(startDate, WINDOW_LENGTH - 1)

    const paydayDate = addDays(endDate, PAYDAY_OFFSET)

    console.log("[v0] Calculated window:", {
      windowIndex,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      paydayDate: format(paydayDate, "yyyy-MM-dd"),
    })

    return {
      startDate,
      endDate,
      paydayDate,
      windowEndDateISO: format(endDate, "yyyy-MM-dd"),
    }
  }, [date])
}
