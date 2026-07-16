# SkipQ — Super Admin Portal

A React + Vite + TypeScript + TailwindCSS web application for super administrators to manage the SkipQ canteen management platform.

## Features

- **Dashboard** — Overview stats: colleges, canteens, users, orders, revenue
- **College Management** — CRUD operations for colleges
- **Canteen Management** — CRUD canteens, assign to colleges and owners
- **User Management** — CRUD users, assign roles and college/canteen assignments
- **Global Analytics** — Platform-wide orders, revenue, and ratings insights

## Tech Stack

- Vite 6+
- React 18+
- TypeScript
- TailwindCSS v4
- React Router v7
- Lucide React icons

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env` file in the project root:

```
VITE_API_BASE_URL=https://canteen20.vercel.app
```

## Project Structure

```
src/
├── main.tsx              # App entry point
├── App.tsx               # Router setup & auth
├── config.ts             # API base URL
├── types.ts              # TypeScript interfaces
├── api.ts                # API helper functions
├── index.css             # TailwindCSS + custom theme
├── components/
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── TopBar.tsx        # Header bar
│   ├── StatCard.tsx      # Dashboard stat card
│   ├── DataTable.tsx     # Reusable paginated table
│   └── Modal.tsx         # Reusable modal dialog
└── pages/
    ├── LoginPage.tsx     # Authentication screen
    ├── DashboardPage.tsx # Overview stats
    ├── CollegesPage.tsx  # College CRUD
    ├── CanteensPage.tsx  # Canteen CRUD
    ├── UsersPage.tsx     # User CRUD & role management
    └── AnalyticsPage.tsx # Charts & performance tables
```

## Backend

This app connects to the shared canteen2.0 backend at `https://canteen20.vercel.app`. All API endpoints are prefixed with `/api`.
