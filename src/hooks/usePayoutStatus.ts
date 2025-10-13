import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@services/storage/database"
import type { PaidBlock } from "@types/index"

/**
 * Fetches all pay windows with their payment status and totals
 * Sorted by payday descending (most recent first)
 *
 * @returns Array of PaidBlock objects or undefined while loading
 */
export function usePayoutStatus(): PaidBlock[] | undefined {
  return useLiveQuery(async () => {
    const blocks = await db.paidBlocks.toArray()

    // Sort by payday descending (most recent first)
    return blocks.sort((a, b) => {
      return new Date(b.paydayDate).getTime() - new Date(a.paydayDate).getTime()
    })
  })
}
