import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@services/storage/database"
import type { WorkEntry } from "@types/index"

/**
 * Hook to get all work entries for a specific pay window
 * Uses Dexie's live query for reactive updates
 *
 * @param windowEndDate - ISO date string of the window's end date
 * @returns Array of work entries in the window or undefined while loading
 */
export function useEntriesByWindow(windowEndDate: string): WorkEntry[] | undefined {
  return useLiveQuery(() => db.workEntries.where("windowEndDate").equals(windowEndDate).toArray(), [windowEndDate])
}
