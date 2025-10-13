import { usePayoutStatus } from "@hooks/usePayoutStatus"
import { PayoutCard } from "./PayoutCard"

export function PayoutStatusSection() {
  const payoutBlocks = usePayoutStatus()

  return (
    <section>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payout Status</h1>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {!payoutBlocks || payoutBlocks.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-medium text-gray-600">No pay windows yet</p>
            <p className="text-sm text-gray-500 mt-2">Start tracking your work hours to see payment windows here</p>
          </div>
        ) : (
          payoutBlocks.map((block, index) => <PayoutCard key={block.windowEndDate} block={block} index={index} />)
        )}
      </div>
    </section>
  )
}
