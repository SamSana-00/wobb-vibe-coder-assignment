# Wobb Vibe Coder Intern Assignment

A redesigned influencer search application built with React, TypeScript, Vite, and Tailwind CSS.

## Live Demo
https://wobb-vibe-coder-assignment-sana8.vercel.app

## What I Changed

### Bug Fixes
1. **Engagement Rate calculation** — was multiplying by 10000 instead of 100, showing 125% instead of 1.26%. Fixed by using the existing `formatEngagementRate` utility.
2. **Duplicate Engagements stat** — the Engagements box was incorrectly showing engagement rate percentage instead of actual engagement count. Fixed to use `formatFollowersDetail`.
3. **Case-sensitive username search** — `p.username.includes(query)` was case-sensitive while fullname search was not. Fixed by converting both sides to lowercase before comparison. Also moved `lowerQuery` outside the filter loop for performance.
4. **Stale closure in click counter** — `console.log(clickCount)` was reading stale state after `setClickCount`. Fixed using functional update form `setClickCount(prev => ...)` to get the guaranteed latest value.

### State Management
- Replaced the pattern of passing props down with **Zustand** store (`src/store/useShortlistStore.ts`)
- Store handles: add to shortlist, remove from shortlist, duplicate prevention, localStorage persistence

### Add to List Feature
- Fully implemented the shortlist feature on both search page and profile detail page
- Add profiles to shortlist with one click
- Button changes to "Added!" when profile is in shortlist (prevents duplicate adds)
- Shortlist panel displayed below search results showing all selected profiles
- Remove profiles individually with the x button
- List persists after page refresh using Zustand persist middleware with localStorage

### UI/UX Redesign
- **Header** — Purple gradient navbar with Wobb branding and live shortlist counter badge
- **Platform filters** — Pill-shaped buttons with active/inactive states
- **Search bar** — Rounded input with search icon and violet focus ring
- **Profile cards** — White cards with shadow, hover effects, responsive layout, violet follower count
- **Shortlist panel** — Purple gradient header matching navbar, clean profile rows with remove buttons
- **Profile detail page** — Banner-style header, profile picture overlap effect, colored stat boxes (violet, green, blue, pink, orange, teal, yellow), loading spinner, proper 404 error page

### Code Quality
- Removed unused `react-beautiful-dnd` dependency conflict workaround
- Added `alt` attributes to all images for accessibility
- Extracted Zustand store into dedicated `src/store/` folder
- Consistent TypeScript types throughout
- Removed duplicate inline calculations in favour of shared utility functions

### Performance
- `lowerQuery` computed once outside filter loop instead of per-profile
- Zustand only re-renders components that consume changed state slices
- Functional setState updates avoid stale closures

## Libraries Added
- **zustand** — lightweight state management with built-in localStorage persistence

## Assumptions
- Missing profile JSON files (leomessi, selenagomez, etc.) are intentional — the error state is handled gracefully with a 404 page
- The `react-beautiful-dnd` package in the original repo was unused and incompatible with React 19 — installed with `--legacy-peer-deps` flag

## Trade-offs
- Kept `react-beautiful-dnd` in package.json (unused) rather than removing it, to stay close to the original repo structure
- Shortlist is stored in localStorage under key `wobb-shortlist` — would use a backend/database in production

## Remaining Improvements
- Add drag-to-reorder shortlist (react-beautiful-dnd was likely intended for this)
- Add unit tests for store actions and filter functions
- Add skeleton loading states for profile cards
- Paginate results for larger datasets

## Setup

```bash
npm install --legacy-peer-deps
npm run dev
```

## Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run lint` | Run ESLint |
