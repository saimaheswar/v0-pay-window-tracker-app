/**
 * Core data models for PayWindow Tracker
 */

/**
 * Represents a single work entry
 */
export interface WorkEntry {
  id?: number
  dateISO: string // ISO 8601 format "YYYY-MM-DD"
  hours: number
  note?: string
  windowEndDate: string // Computed Friday end date of the pay window
  createdAt: Date
}

/**
 * Represents a pay window with payment status
 */
export interface PaidBlock {
  windowEndDate: string // Primary key - ISO date of window's Friday
  isPaid: boolean
  paydayDate: string // Computed: windowEndDate + 7 days
  totalHours: number // Cached sum of all entries in this window
  updatedAt: Date
}

/**
 * Calculated pay window information
 */
export interface PayWindow {
  startDate: Date // Thursday
  endDate: Date // Following Friday (8 days later)
  paydayDate: Date // Friday after endDate (7 days later)
  windowEndDateISO: string // ISO string of endDate for indexing
}

/**
 * Combined view of a pay window with entries and status
 */
export interface PayWindowWithStatus extends PayWindow {
  totalHours: number
  isPaid: boolean
  entries: WorkEntry[]
}
