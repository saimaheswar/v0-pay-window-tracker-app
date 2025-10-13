"use client"

import { useMemo } from "react"
import { useWindowCalculation } from "./useWindowCalculation"
import type { PayWindow } from "@types/index"

/**
 * Returns the current active pay window for today
 *
 * @returns PayWindow object for the current date
 *
 * @example
 * const currentWindow = useCurrentWindow();
 * console.log(`Current window: ${format(currentWindow.startDate, 'EEE MM/dd')} → ${format(currentWindow.endDate, 'EEE MM/dd')}`);
 */
export function useCurrentWindow(): PayWindow {
  const today = useMemo(() => new Date(), [])
  const window = useWindowCalculation(today)

  if (!window) {
    throw new Error("Failed to calculate current pay window")
  }

  return window
}
