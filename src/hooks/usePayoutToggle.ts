"use client"

import { useCallback } from "react"
import { db } from "@services/storage/database"

/**
 * Hook for toggling paid status of a specific pay window
 *
 * @param windowEndDate - ISO date string of the window's end date
 * @returns Function to toggle the paid status
 */
export function usePayoutToggle(windowEndDate: string) {
  const toggle = useCallback(
    async (isPaid: boolean) => {
      try {
        const existingBlock = await db.paidBlocks.get(windowEndDate)

        if (existingBlock) {
          await db.paidBlocks.update(windowEndDate, {
            isPaid,
            updatedAt: new Date(),
          })
        }
      } catch (error) {
        console.error("Failed to toggle payout status:", error)
        throw new Error("Could not update payment status. Please try again.")
      }
    },
    [windowEndDate],
  )

  return toggle
}
