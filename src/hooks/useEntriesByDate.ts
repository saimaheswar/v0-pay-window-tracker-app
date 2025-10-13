import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@services/storage/database"
import type { WorkEntry } from "@types/index"

/**
 * Hook to get all work entries for a specific date
 * Uses Dexie's live query for reactive updates
 *
 * @param dateISO - ISO date string (YYYY-MM-DD)
 * @returns Array of work entries on that date or undefined while loading
 */
export function useEntriesByDate(dateISO: string): WorkEntry[] | undefined {
  return useLiveQuery(() => db.workEntries.where("dateISO").equals(dateISO).toArray(), [dateISO])
}
