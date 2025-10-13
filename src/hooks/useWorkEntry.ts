"use client"

import { useCallback } from "react"
import { format, addDays } from "date-fns"
import { db } from "@services/storage/database"
import type { WorkEntry } from "@types/index"

/**
 * Updates the cached total hours for a pay window in paidBlocks table
 */
async function updateWindowTotalHours(windowEndDate: string): Promise<void> {
  try {
    const entries = await db.workEntries.where("windowEndDate").equals(windowEndDate).toArray()

    const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0)

    const endDate = new Date(windowEndDate)
    const paydayDate = format(addDays(endDate, 14), "yyyy-MM-dd")

    // Upsert the paidBlock
    const existingBlock = await db.paidBlocks.get(windowEndDate)

    if (existingBlock) {
      await db.paidBlocks.update(windowEndDate, {
        totalHours,
        updatedAt: new Date(),
      })
    } else {
      await db.paidBlocks.add({
        windowEndDate,
        isPaid: false,
        paydayDate,
        totalHours,
        updatedAt: new Date(),
      })
    }
  } catch (error) {
    console.error("Failed to update window total hours:", error)
  }
}

/**
 * Custom hook for CRUD operations on work entries
 *
 * @returns Object with methods to add, update, and delete work entries
 */
export function useWorkEntry() {
  /**
   * Adds a new work entry to the database
   *
   * @param entry - Work entry data (without id and createdAt)
   * @throws Error if database operation fails
   */
  const add = useCallback(async (entry: Omit<WorkEntry, "id" | "createdAt">) => {
    try {
      const newEntry: Omit<WorkEntry, "id"> = {
        ...entry,
        createdAt: new Date(),
      }

      const id = await db.workEntries.add(newEntry as WorkEntry)

      // Update cached total hours in paidBlocks
      await updateWindowTotalHours(entry.windowEndDate)

      return id
    } catch (error) {
      console.error("Failed to add work entry:", error)
      throw new Error("Could not save work entry. Please try again.")
    }
  }, [])

  /**
   * Updates an existing work entry
   *
   * @param id - Entry ID to update
   * @param updates - Partial entry data to update
   */
  const update = useCallback(async (id: number, updates: Partial<WorkEntry>) => {
    try {
      const existingEntry = await db.workEntries.get(id)
      if (!existingEntry) {
        throw new Error("Entry not found")
      }

      await db.workEntries.update(id, updates)

      // Update totals for both old and new windows if windowEndDate changed
      await updateWindowTotalHours(existingEntry.windowEndDate)
      if (updates.windowEndDate && updates.windowEndDate !== existingEntry.windowEndDate) {
        await updateWindowTotalHours(updates.windowEndDate)
      }
    } catch (error) {
      console.error("Failed to update work entry:", error)
      throw new Error("Could not update work entry. Please try again.")
    }
  }, [])

  /**
   * Deletes a work entry
   *
   * @param id - Entry ID to delete
   */
  const deleteEntry = useCallback(async (id: number) => {
    try {
      const entry = await db.workEntries.get(id)
      if (!entry) return

      await db.workEntries.delete(id)
      await updateWindowTotalHours(entry.windowEndDate)
    } catch (error) {
      console.error("Failed to delete work entry:", error)
      throw new Error("Could not delete work entry. Please try again.")
    }
  }, [])

  return {
    add,
    update,
    delete: deleteEntry,
  }
}
