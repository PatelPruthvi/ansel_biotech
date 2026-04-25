# Ansel Biotech — Local Development

A React + Vite + TypeScript + Tailwind CSS v4 website.

## Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

## Setup & Run

### Using npm
```bash
npm install
npm run dev
```

### Using yarn
```bash
yarn install
yarn dev
```

### Using pnpm
```bash
pnpm install
pnpm dev
```

The app starts at **http://localhost:5173**

## Other commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run typecheck` | TypeScript type check |

## Project structure

```
src/
  components/     # Navbar, Footer, Canvas components, UI primitives
  pages/          # Home, About, Products, Contact, etc.
  hooks/          # Custom React hooks
  lib/            # Utilities (cn, etc.)
  assets/         # Logo and static images
  index.css       # Global CSS + Tailwind theme tokens
  main.tsx        # Entry point
  App.tsx         # Router setup
```
