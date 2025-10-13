"use client"

import {
  format,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useDatesWithEntries } from "@hooks/useDatesWithEntries"
import { useCurrentWindow } from "@hooks/useCurrentWindow"
import { useState } from "react"

interface CalendarPanelProps {
  selectedDate: Date | undefined
  onSelectDate: (date: Date | undefined) => void
}

export function CalendarPanel({ selectedDate, onSelectDate }: CalendarPanelProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const datesWithEntries = useDatesWithEntries()
  const currentWindow = useCurrentWindow()

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)

  // Get all days to display (including padding days from previous/next month)
  const startDate = new Date(monthStart)
  startDate.setDate(startDate.getDate() - monthStart.getDay())

  const endDate = new Date(monthEnd)
  endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()))

  const days = eachDayOfInterval({ start: startDate, end: endDate })
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const handleDayClick = (date: Date) => {
    if (selectedDate && isSameDay(date, selectedDate)) {
      onSelectDate(undefined)
    } else {
      onSelectDate(date)
    }
  }

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="glass-card p-8 w-full max-w-md">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            className="h-8 w-8 bg-transparent hover:bg-white/30 rounded-xl transition-colors p-0 inline-flex items-center justify-center"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>

          <h2 className="text-lg font-semibold text-gray-800">{format(currentMonth, "MMMM yyyy")}</h2>

          <button
            onClick={handleNextMonth}
            className="h-8 w-8 bg-transparent hover:bg-white/30 rounded-xl transition-colors p-0 inline-flex items-center justify-center"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-gray-600 text-center text-sm font-medium h-10 flex items-center justify-center"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const isCurrentDay = isToday(day)
            const isCurrentMonth = isSameMonth(day, currentMonth)
            const hasEntry = datesWithEntries?.has(format(day, "yyyy-MM-dd"))
            const inWindow = isWithinInterval(day, {
              start: currentWindow.startDate,
              end: currentWindow.endDate,
            })

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDayClick(day)}
                className={`
                  relative h-10 w-full rounded-xl transition-colors
                  inline-flex items-center justify-center text-sm font-normal
                  ${!isCurrentMonth ? "text-gray-400 opacity-50" : "text-gray-800"}
                  ${isSelected ? "bg-violet-500 text-white hover:bg-violet-600" : "hover:bg-white/30"}
                  ${isCurrentDay && !isSelected ? "bg-white/40 font-semibold" : ""}
                  ${inWindow && !isSelected ? "bg-violet-500/10" : ""}
                `}
                aria-label={format(day, "MMMM d, yyyy")}
              >
                {format(day, "d")}
                {hasEntry && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-violet-500 rounded-full" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
