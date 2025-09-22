# Step Tracker Frontend (Ocean Professional)

A minimalist React frontend that allows users to input their daily step counts and view their progress over time.

- Theme: Ocean Professional (primary #374151, secondary #9CA3AF, success #10B981, error #EF4444)
- Style: Ultra-minimal, generous whitespace, subtle shadows, clean components
- Data: Mock local in-memory store (no backend)

## Getting Started

- `npm start` — run the dev server at http://localhost:3000
- `npm test` — run tests
- `npm run build` — build for production

## Structure

- `src/ocean.css` — Primary theme and component styles
- `src/App.js` — App shell and route switching
- `src/components/Sidebar.js` — Minimal navigation
- `src/components/Topbar.js` — Header with sidebar toggle
- `src/pages/Dashboard.js` — KPIs and 30-day bar chart (pure CSS)
- `src/pages/History.js` — Table of entries, delete rows
- `src/pages/InputSteps.js` — Form to add/update steps
- `src/pages/Settings.js` — Adjust daily goal
- `src/utils/date.js` — Date utilities
- `src/utils/mockData.js` — Mock dataset generator

## Notes

- Routing is intentionally simple (state-based) to avoid extra deps.
- A future backend can replace the in-memory store by wiring API calls in App state handlers.

