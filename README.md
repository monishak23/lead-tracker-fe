# Lead Tracker — Frontend

**Live app:** https://lead-tracker-gksglor15-monisha22.vercel.app/

## Architecture

- **Framework:** React + TypeScript, built with Vite
- **Routing:** `react-router-dom`
- **State management:** local component state only (`useState`/`useEffect`) — no
  external state library, since the app's data needs are simple enough not to justify one
- **Data fetching:** native `fetch`, no data-fetching library (React Query, SWR, etc.) —
  a deliberate trade-off, see below
- **Styling:** plain CSS with design tokens (CSS custom properties) for color/spacing/type,
  no CSS framework

### Key patterns

- **Debounced search:** the search input updates local `query` state on every keystroke,
  but a separate `debouncedQuery` state (updated via a 400ms `setTimeout` effect) is what
  actually triggers a fetch — so typing doesn't fire a request per keystroke.
- **Pagination:** `page` state drives `limit`/`offset` query params sent to the backend;
  changing the search term or status filter resets `page` back to 1 automatically.

## Setup Instructions (local)

```bash
git clone https://github.com/monishak23/lead-tracker-fe
cd lead-tracker-fe
npm install
cp .env.example .env   # set VITE_API_BASE_URL, e.g. http://localhost:5000/api
npm run dev              # http://localhost:5173
```

Requires the backend running (locally or pointed at the deployed API) for data to load.

### Environment variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API, e.g. `https://lead-tracker-ctvb.onrender.com/api` |

## Deployment Steps

1. Pushed this repo to GitHub.
2. On Vercel: New Project → imported this repo → Framework Preset: Vite (auto-detected).
3. Set `VITE_API_BASE_URL` in Vercel's Environment Variables to the live Render backend
   URL + `/api`.
4. Deployed. Vercel auto-redeploys on every push to the connected branch.
5. Confirmed the backend's `CLIENT_ORIGIN` env var was updated to this Vercel URL so CORS
   allows requests from production.

## Trade-offs

- **No data-fetching library (React Query/SWR):** at this app's scale (one main list
  view), hand-rolled `useEffect` + `fetch` + a `cancelled` guard covers the real failure
  mode (race conditions) without adding a dependency; would switch to React Query if the
  app grew more views that share/cache the same data.
- **No global state management (Redux/Zustand/Context):** all state is local to the
  components that use it; there's no cross-cutting state yet that would justify the
  added complexity.
- **Manual debounce implementation over a library (`use-debounce`, lodash):** the debounce
  logic is ~6 lines; not worth a dependency for something this small.
- **Plain CSS over Tailwind/a component library:** kept full control over the specific
  look (custom color tokens) without pulling in a framework's default aesthetic.

## Future Improvements

- Loading skeletons instead of a plain "Loading…" text state
- Optimistic UI updates for status changes (update instantly, roll back on failure)
- Extract the inline fetch logic in `App.tsx` into a dedicated `api/` module
- Automated component tests
