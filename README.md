# PayWindow Tracker

A production-ready local-first pay tracking web application built with Next.js 15, React 19, TypeScript, and IndexedDB.

## Quick Start (One Command)

\`\`\`bash
npm install && npm run dev
\`\`\`

This will install all dependencies and start the development server at `http://localhost:3000`

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js**: Version 18.x or higher (recommended: 20.x LTS)
  - Check version: `node --version`
  - Download: [https://nodejs.org](https://nodejs.org)

- **npm**: Version 9.x or higher (comes with Node.js)
  - Check version: `npm --version`
  - Alternative: You can use `yarn` or `pnpm` instead

- **Modern Web Browser**: 
  - Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+
  - Required for IndexedDB support

## Installation & Setup

### Option 1: Quick Start (Recommended)

\`\`\`bash
# Clone the repository (if not already cloned)
git clone <repository-url>
cd paywindow-tracker

# Install dependencies and start development server
npm install && npm run dev
\`\`\`

### Option 2: Step-by-Step

\`\`\`bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:3000
\`\`\`

### Option 3: Production Build

\`\`\`bash
# Install and build for production
npm install && npm run build

# Start production server
npm run start
\`\`\`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server (hot reload enabled) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests with Vitest |
| `npm run test:e2e` | Run end-to-end tests |

## Features

- **Track Work Hours**: Interactive calendar interface to log daily work hours
- **Pay Window Management**: Automatic calculation of 2-week pay periods
- **Payment Status**: Track which pay periods have been paid
- **Local-First**: All data stored in IndexedDB - no server required
- **PWA Support**: Installable as a progressive web app
- **Glassmorphism Design**: Modern, beautiful UI with glass effects and smooth animations
- **Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 15.2 (App Router)
- **Frontend**: React 19 with TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Database**: IndexedDB via Dexie.js 4.x
- **Date Handling**: date-fns 3.x
- **UI Components**: Radix UI (Popover, Switch, Dialog, etc.)
- **Animations**: Framer Motion 11.x
- **Icons**: Lucide React

## Project Structure

\`\`\`
paywindow-tracker/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles and glassmorphism effects
├── src/
│   ├── components/
│   │   └── ui/            # Reusable UI components (Button, Card, etc.)
│   ├── features/
│   │   ├── track-pay/     # Work entry tracking feature
│   │   │   ├── CalendarPanel.tsx
│   │   │   ├── EntryForm.tsx
│   │   │   ├── TrackPaySection.tsx
│   │   │   └── WindowIndicator.tsx
│   │   └── payout-status/ # Payment status feature
│   │       ├── PayoutCard.tsx
│   │       └── PayoutStatusSection.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useWindowCalculation.ts
│   │   ├── useCurrentWindow.ts
│   │   ├── useWorkEntry.ts
│   │   ├── usePayoutToggle.ts
│   │   ├── useEntriesByWindow.ts
│   │   └── useEntriesByDate.ts
│   ├── services/
│   │   └── storage/       # IndexedDB database logic
│   │       └── database.ts
│   └── types/             # TypeScript interfaces
│       └── index.ts
├── components/            # shadcn/ui components
├── next.config.js         # Next.js configuration
├── package.json
└── tsconfig.json
\`\`\`

## Business Logic

### Pay Window Calculation

- **Window Definition**: Fixed 2-week (14-day) periods starting from October 2, 2024
- **Entry Assignment**: Work entry's date determines which 2-week window it belongs to
- **Payday Calculation**: Window end date + 14 days

**Example:**
- Work Period: Oct 2-15 (14 days)
- Payday: Oct 29 (Oct 15 + 14 days)

### Pay Period Examples

| Period | Start Date | End Date | Payday |
|--------|-----------|----------|---------|
| 1 | Oct 2 | Oct 15 | Oct 29 |
| 2 | Oct 16 | Oct 29 | Nov 12 |
| 3 | Oct 30 | Nov 12 | Nov 26 |

## Database Schema

### workEntries Table
- `id`: Auto-increment primary key
- `dateISO`: ISO 8601 date string (YYYY-MM-DD)
- `hours`: Decimal number (work hours)
- `note`: Optional string (work notes)
- `windowEndDate`: Computed, indexed (for grouping)
- `createdAt`: Date timestamp

### paidBlocks Table
- `windowEndDate`: Primary key (ISO date)
- `isPaid`: Boolean (payment status)
- `paydayDate`: Computed date (windowEndDate + 14 days)
- `totalHours`: Cached sum of hours
- `updatedAt`: Date timestamp

## Custom Hooks

| Hook | Purpose |
|------|---------|
| `useWindowCalculation(date)` | Calculate pay window for any date |
| `useCurrentWindow()` | Get current active pay window |
| `useWorkEntry()` | CRUD operations for work entries |
| `usePayoutStatus()` | Fetch all pay windows with status |
| `usePayoutToggle(windowEndDate)` | Toggle paid status for a window |
| `useEntriesByWindow(windowEndDate)` | Get entries for specific window |
| `useEntriesByDate(date)` | Get entries for specific date |

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

\`\`\`bash
# Kill the process using the port (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or specify a different port
PORT=3001 npm run dev
\`\`\`

### Dependencies Installation Issues

\`\`\`bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Browser Compatibility Issues

- Ensure you're using a modern browser with IndexedDB support
- Clear browser cache and local storage
- Try in incognito/private mode

### Build Errors

\`\`\`bash
# Clean Next.js cache and rebuild
rm -rf .next
npm run build
\`\`\`

## Accessibility

- WCAG AA compliant
- Full keyboard navigation support
- ARIA labels on all interactive elements
- Screen reader friendly
- High contrast mode support

## Performance

- Code splitting with React.lazy()
- Memoized calculations with useMemo/useCallback
- Optimistic UI updates for instant feedback
- Efficient IndexedDB queries with indexes
- Lazy loading of components

## Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

MIT

## Support

For issues or questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the troubleshooting section above

---

**Built with ❤️ using Next.js, React, and TypeScript**
