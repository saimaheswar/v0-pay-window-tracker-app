"use client"

import { format, parseISO } from "date-fns"
import { motion } from "framer-motion"
import * as Switch from "@radix-ui/react-switch"
import { usePayoutToggle } from "@hooks/usePayoutToggle"
import type { PaidBlock } from "@types/index"

interface PayoutCardProps {
  block: PaidBlock
  index: number
}

export function PayoutCard({ block, index }: PayoutCardProps) {
  const toggle = usePayoutToggle(block.windowEndDate)

  const handleToggle = async (checked: boolean) => {
    try {
      await toggle(checked)
    } catch (error) {
      console.error("Failed to toggle payment status:", error)
    }
  }

  // Calculate window start date (8 days before end for 9-day window)
  const endDate = parseISO(block.windowEndDate)
  const startDate = new Date(endDate)
  startDate.setDate(startDate.getDate() - 8)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass-card glass-card-hover p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-semibold text-gray-700">Worked:</span>
            <span className="text-sm text-gray-800">
              {format(startDate, "EEE MM/dd")} → {format(endDate, "EEE MM/dd")}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-semibold text-gray-700">Payday:</span>
            <span className="text-sm text-gray-800">{format(parseISO(block.paydayDate), "EEE MM/dd")}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">Hours:</span>
            <span className="text-base font-bold text-violet-600">{block.totalHours.toFixed(1)}h</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold text-gray-600">Paid?</span>
          <Switch.Root
            checked={block.isPaid}
            onCheckedChange={handleToggle}
            className="w-12 h-7 bg-gray-300 rounded-full relative neomorphic-switch data-[state=checked]:bg-green-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
          >
            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-200 translate-x-1 data-[state=checked]:translate-x-6" />
          </Switch.Root>
          <span className={`text-xs font-medium ${block.isPaid ? "text-green-600" : "text-gray-500"}`}>
            {block.isPaid ? "Yes" : "No"}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
