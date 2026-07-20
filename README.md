# YieldVault Frontend

A React + Vite frontend for **YieldVault**, a Soroban DeFi yield vault on the
Stellar network. The app lets users browse vaults, deposit and withdraw, and
track their positions and earned yield.

> This build runs entirely on mock data — no network calls are made — so it
> works offline for development and demos.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

To use custom network settings, copy `.env.example` to `.env.local` and edit
the values. All variables are optional.

## Project structure

```
src/
  components/   reusable UI (Button, StatCard, VaultCard, FormWizard, ...)
  pages/        routed views (Home, Dashboard, VaultDetail, Positions, WizardDemo)
  hooks/        data hooks (useWallet, useVault, useVaults, usePositions)
  context/      AppContext for shared wallet state
  services/     mock api / wallet / vault services
  utils/        formatting, validation and share math
  constants/    assets and app config
  styles/       plain CSS, split by concern
```

## Features

- Landing page with hero and feature highlights
- Dashboard showing protocol TVL, average APY and your aggregate position
- Vault detail pages with multi-step deposit/withdraw wizards (Amount → Review → Confirm) and a live shares preview
- Multi-step form wizard (`FormWizard`) for any guided step-by-step flow — reusable component with validation, animated transitions, progress tracking, and keyboard support
- Wizard demo page at `/wizard-demo` showcasing a 4-step "Create Vault" form example
- Positions list with per-vault value and earned yield
- Mock Stellar wallet (connect/disconnect, balances, signing)
- Loading, error and empty states throughout
- **Browser font scaling** — all font sizes use `rem` units and layout
  constraints scale proportionally, so the UI respects the user's browser
  default font size setting
- **Idle-session auto-lock** — after 15 minutes of inactivity the wallet
  auto-disconnects for security. A warning modal with a live countdown
  appears 1 minute before, letting the user extend the session.

## Design & Typography System

YieldVault uses a structured, standardized design system powered by CSS variables under `:root` in `src/styles/index.css`.

### Typography Scale
- **Font Sizes**:
  - Extra Small (`--fs-xs`): `0.75rem` (12px)
  - Small (`--fs-sm`): `0.875rem` (14px)
  - Base (`--fs-base`): `1rem` (16px)
  - Medium (`--fs-md`): `1.125rem` (18px)
  - Large (`--fs-lg`): `1.25rem` (20px)
  - Extra Large (`--fs-xl`): `1.5rem` (24px)
  - 2X Large (`--fs-2xl`): `1.875rem` (30px)
  - 3X Large (`--fs-3xl`): `2.25rem` (36px)
  - 4X Large (`--fs-4xl`): `2.625rem` (42px)
  - 5X Large (`--fs-5xl`): `3.25rem` (52px)
- **Line Heights**: `--lh-tight` (1.2), `--lh-snug` (1.35), `--lh-normal` (1.5), `--lh-relaxed` (1.625)
- **Font Weights**: `--fw-normal` (400), `--fw-medium` (500), `--fw-semibold` (600), `--fw-bold` (700)

### Utility Classes
To quickly apply standardized font properties, the design system exposes utility classes:
- Sizes: `.text-xs`, `.text-sm`, `.text-base`, `.text-md`, `.text-lg`, `.text-xl`, `.text-2xl`, `.text-3xl`, `.text-4xl`, `.text-5xl`
- Weights: `.fw-normal`, `.fw-medium`, `.fw-semibold`, `.fw-bold`

## Utilities & hooks

Reusable building blocks live under `src/utils` and `src/hooks`:

- `utils/format.js` — currency, percent, share and address formatting
- `utils/positions.js` — portfolio aggregation (`summarizePositions`)
- `utils/shares.js` — vault share-price and deposit/withdraw math
- `hooks/useMediaQuery` — subscribe to a CSS media query
- `hooks/useClipboard` — copy text with transient "copied" feedback
- `hooks/useIdleTimer` — detect user inactivity with configurable timeout and warning threshold
- `hooks/useDocumentTitle` — set the browser tab title per page

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start the dev server     |
| `npm run build`   | Build for production     |
| `npm run test`    | Run the test suite        |
| `npm run preview` | Preview the build        |
| `npm run test`    | Run Vitest tests         |
