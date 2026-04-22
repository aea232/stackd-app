# Stackd — CLAUDE.md

## Project Overview

Stackd is a credit card rewards optimizer app. Users build a wallet of their cards, then get AI-powered recommendations on which card to use for a given purchase. It also includes a wallet dashboard, purchase history logger, and a "Card Check" analyzer that tells users whether a new card would add value to their stack.

## Tech Stack

- **React 19** + **TypeScript** (strict mode via `tsconfig.app.json`)
- **Vite 8** as the build tool and dev server
- **Netlify** for hosting and serverless functions (`netlify/functions/`)
- **Claude API** (via a Netlify serverless proxy at `/.netlify/functions/claude`) — model: `claude-sonnet-4-6`
- No component library or CSS framework — all styles are inline React style objects
- No routing library — navigation is a local `step` state string (`"profile"`, `"dashboard"`, `"recommend"`, `"history"`, `"analyzer"`)

## Key Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Entire app — all UI, state, and logic lives here |
| `netlify/functions/claude.js` | Serverless proxy that forwards requests to the Anthropic API |
| `netlify.toml` | Build config (`npm run build`, publish `dist`, functions from `netlify/functions`) |
| `vite.config.ts` | Minimal Vite config with `@vitejs/plugin-react` |

## Commands

```bash
npm run dev       # start dev server (hot module reload)
npm run build     # tsc -b && vite build
npm run lint      # eslint
npm run preview   # preview production build locally
```

## Environment Variables

| Variable | Where set | Purpose |
|----------|-----------|---------|
| `VITE_ANTHROPIC_API_KEY` | Netlify dashboard → Environment Variables | Anthropic API key used by the serverless proxy |

The key is read server-side in `netlify/functions/claude.js` — it is **not** exposed to the browser.

## Architecture Notes

- **Single-file app**: All logic is in `src/App.tsx`. `PRESET_CARDS` defines the card catalog (20 cards). `CATEGORIES` defines spend categories. The `Stackd` component manages all state.
- **State persistence**: `cards` (wallet) and `history` (purchase log) are persisted to `localStorage` via `useEffect`.
- **AI calls**: Both `getRecommendation()` and `analyzeCard()` POST to `/.netlify/functions/claude`, which proxies to `https://api.anthropic.com/v1/messages`. Responses are expected as raw JSON (no markdown fences).
- **Responsive layout**: Desktop uses a top tab bar (`.top-nav-tabs`); mobile (<600px) hides it and shows a fixed bottom nav bar (`.bottom-nav`). All breakpoint logic is in the inline `<style>` block inside the component.
- **No test suite** is currently set up.

## Development Patterns

- All styles are inline style objects — avoid introducing a CSS-in-JS library or external stylesheet unless explicitly requested.
- The app has no routing — tab navigation is purely `setStep(...)`.
- When adding new cards to `PRESET_CARDS`, follow the existing shape: `id`, `name`, `issuer`, `color`, `textColor`, `accent`, `categories` (object with multiplier values), `annualFee`, `perks`, `pointSystem`.
- The Claude prompts in `getRecommendation()` and `analyzeCard()` embed strict rules for point valuations and booking portal logic — update them carefully when card data changes.
- When deploying, Netlify automatically runs `npm run build` and deploys `dist/`.
