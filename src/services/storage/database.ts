import Dexie, { type Table } from "dexie"
import type { WorkEntry, PaidBlock } from "@types/index"

/**
 * IndexedDB database using Dexie.js
 * Manages work entries and payment status
 */
export class PayWindowDatabase extends Dexie {
  workEntries!: Table<WorkEntry, number>
  paidBlocks!: Table<PaidBlock, string>

  constructor() {
    super("PayWindowTrackerDB")

    this.version(1).stores({
      workEntries: "++id, dateISO, windowEndDate, createdAt",
      paidBlocks: "windowEndDate, isPaid, paydayDate, updatedAt",
    })
  }
}

// Singleton instance
export const db = new PayWindowDatabase()
