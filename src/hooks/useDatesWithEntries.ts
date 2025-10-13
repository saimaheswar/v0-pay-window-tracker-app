import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@services/storage/database"

/**
 * Returns a Set of ISO date strings that have work entries
 * Used to highlight dates in the calendar
 *
 * @returns Set of date strings or undefined while loading
 */
export function useDatesWithEntries(): Set<string> | undefined {
  const entries = useLiveQuery(() => db.workEntries.toArray())

  if (!entries) return undefined

  return new Set(entries.map((entry) => entry.dateISO))
}
