"use client"

import { format } from "date-fns"
import { motion } from "framer-motion"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@services/storage/database"
import { useCurrentWindow } from "@hooks/useCurrentWindow"

export function WindowIndicator() {
  const currentWindow = useCurrentWindow()

  const totalHours = useLiveQuery(async () => {
    const entries = await db.workEntries.where("windowEndDate").equals(currentWindow.windowEndDateISO).toArray()

    return entries.reduce((sum, entry) => sum + entry.hours, 0)
  }, [currentWindow.windowEndDateISO])

  return (
    <div className="mt-6 glass-card p-6">
      <h3 className="text-sm font-semibold text-gray-600 mb-3">Current Pay Window</h3>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Window:</span>
          <span className="text-sm font-semibold text-gray-800">
            {format(currentWindow.startDate, "EEE MM/dd")} → {format(currentWindow.endDate, "EEE MM/dd")}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Total Hours:</span>
          <motion.span
            key={totalHours}
            initial={{ scale: 1.2, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-bold text-violet-600"
          >
            {totalHours?.toFixed(1) || "0.0"}h
          </motion.span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Payday:</span>
          <span className="text-sm font-semibold text-gray-800">{format(currentWindow.paydayDate, "EEE MM/dd")}</span>
        </div>
      </div>
    </div>
  )
}
