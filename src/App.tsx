import { TrackPaySection } from "@features/track-pay/TrackPaySection"
import { PayoutStatusSection } from "@features/payout-status/PayoutStatusSection"

function App() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 mb-2">
            PayWindow Tracker
          </h1>
          <p className="text-gray-600">Track your work hours and payment status</p>
        </header>

        <main className="space-y-12">
          <TrackPaySection />
          <PayoutStatusSection />
        </main>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>All data is stored locally in your browser</p>
        </footer>
      </div>
    </div>
  )
}

export default App
