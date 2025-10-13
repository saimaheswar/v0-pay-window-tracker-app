# PayWindow Tracker

A production-ready local-first pay tracking web application built with React 19, TypeScript, and IndexedDB.

## Features

- **Track Work Hours**: Interactive calendar interface to log daily work hours
- **Pay Window Management**: Automatic calculation of pay windows (Thursday → Friday, 8-day periods)
- **Payment Status**: Track which pay periods have been paid
- **Local-First**: All data stored in IndexedDB - no server required
- **PWA Support**: Installable as a progressive web app
- **Glassmorphism Design**: Modern, beautiful UI with glass effects and smooth animations

## Tech Stack

- React 19.2 with TypeScript 5.x
- Vite 6.x
- Tailwind CSS 4.x
- IndexedDB via Dexie.js 4.x
- react-day-picker 9.x
- date-fns 3.x
- Radix UI (Popover, Switch)
- Framer Motion 11.x

## Getting Started

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

### Build

\`\`\`bash
npm run build
\`\`\`

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

### Testing

\`\`\`bash
npm run test
\`\`\`

## Project Structure

\`\`\`
src/
├── components/
│   └── ui/              # Reusable UI components
├── features/
│   ├── track-pay/       # Work entry tracking feature
│   └── payout-status/   # Payment status feature
├── hooks/               # Custom React hooks
├── services/
│   └── storage/         # IndexedDB database logic
├── types/               # TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css
\`\`\`

## Business Logic

### Pay Window Calculation

- **Window Definition**: Starts on Thursday, ends on following Friday (8 days inclusive)
- **Entry Assignment**: Work entry's date determines which window it belongs to
- **Payday Calculation**: Window end Friday + 7 days (always the next Friday)

Example: Thu 09/18 → Fri 09/26 window → Payday Fri 10/03

## Database Schema

### workEntries Table
- `id`: Auto-increment primary key
- `dateISO`: ISO 8601 date string
- `hours`: Decimal number
- `note`: Optional string
- `windowEndDate`: Computed, indexed
- `createdAt`: Date

### paidBlocks Table
- `windowEndDate`: Primary key (ISO date)
- `isPaid`: Boolean
- `paydayDate`: Computed date
- `totalHours`: Cached sum
- `updatedAt`: Date

## Custom Hooks

- `useWindowCalculation(date)`: Calculate pay window for any date
- `useCurrentWindow()`: Get current active pay window
- `useWorkEntry()`: CRUD operations for work entries
- `usePayoutStatus()`: Fetch all pay windows with status
- `usePayoutToggle(windowEndDate)`: Toggle paid status
- `useDatesWithEntries()`: Get dates with work entries for calendar highlighting

## Accessibility

- WCAG AA compliant
- Full keyboard navigation
- ARIA labels on interactive elements
- Screen reader friendly

## Performance

- Code splitting with React.lazy()
- Memoized calculations
- Optimistic UI updates
- Efficient IndexedDB queries

## License

MIT
