"use client"

import { useState, useEffect, type FormEvent } from "react"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@components/ui/Input"
import { Textarea } from "@components/ui/Textarea"
import { Button } from "@components/ui/Button"
import { useWorkEntry } from "@hooks/useWorkEntry"
import { useWindowCalculation } from "@hooks/useWindowCalculation"

interface EntryFormProps {
  selectedDate: Date | undefined
}

export function EntryForm({ selectedDate }: EntryFormProps) {
  const { add } = useWorkEntry()
  const window = useWindowCalculation(selectedDate)
  const [hours, setHours] = useState<string>("")
  const [note, setNote] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when date changes
  useEffect(() => {
    setHours("")
    setNote("")
    setError("")
  }, [selectedDate])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !window) {
      setError("Please select a valid date")
      return
    }

    const hoursNum = Number.parseFloat(hours)

    // Validation
    if (isNaN(hoursNum) || hoursNum <= 0 || hoursNum > 24) {
      setError("Please enter valid hours between 0 and 24")
      return
    }

    if (note.length > 200) {
      setError("Note must be 200 characters or less")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      await add({
        dateISO: format(selectedDate, "yyyy-MM-dd"),
        hours: hoursNum,
        note: note.trim() || undefined,
        windowEndDate: window.windowEndDateISO,
      })

      // Reset form
      setHours("")
      setNote("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save entry")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {selectedDate ? (
        <motion.div
          key="form"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="h-full flex flex-col p-8"
        >
          <div className="glass-card p-6 flex-1 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Add Work Entry</h2>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div className="space-y-4 flex-1">
                <Input
                  label="Date"
                  type="text"
                  value={format(selectedDate, "EEEE, MMMM d, yyyy")}
                  disabled
                  className="bg-white/30"
                />

                <Input
                  label="Hours Worked"
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="8.0"
                  required
                  error={error && error.includes("hours") ? error : undefined}
                />

                <Textarea
                  label="Note (Optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add any notes about this work day..."
                  rows={3}
                  maxLength={200}
                  error={error && error.includes("Note") ? error : undefined}
                />

                <div className="text-xs text-gray-600 text-right">{note.length}/200 characters</div>
              </div>

              {error && !error.includes("hours") && !error.includes("Note") && (
                <div className="mt-4 p-3 bg-red-100/50 border border-red-300 rounded-xl text-sm text-red-700">
                  {error}
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" className="w-full mt-6" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Entry"}
              </Button>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="placeholder"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full flex items-center justify-center p-8"
        >
          <div className="text-center text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-lg font-medium">Select a date</p>
            <p className="text-sm mt-1">Choose a date from the calendar to add work hours</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
