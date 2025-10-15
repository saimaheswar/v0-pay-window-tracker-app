"use client"

import { useState } from "react"
import { CalendarPanel } from "./CalendarPanel"
import { EntryForm } from "./EntryForm"
import { WindowIndicator } from "./WindowIndicator"

export function TrackPaySection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  return (
    <section className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Track My Pay</h1>

      <div className="glass-panel overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-0 min-h-[500px]">
          {/* Left Panel - Calendar */}
          <div className="lg:border-r lg:border-white/20">
            <CalendarPanel selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          </div>

          {/* Right Panel - Form */}
          <div className="flex flex-col">
            <EntryForm selectedDate={selectedDate} />
            {selectedDate && (
              <div className="px-8 pb-8">
                <WindowIndicator />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
