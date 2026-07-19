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

## Utilities & hooks

Reusable building blocks live under `src/utils` and `src/hooks`:

- `utils/format.js` — currency, percent, share and address formatting
- `utils/positions.js` — portfolio aggregation (`summarizePositions`)
- `utils/shares.js` — vault share-price and deposit/withdraw math
- `hooks/useMediaQuery` — subscribe to a CSS media query
- `hooks/useClipboard` — copy text with transient "copied" feedback
- `hooks/useDocumentTitle` — set the browser tab title per page

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start the dev server     |
| `npm run build`   | Build for production     |
| `npm run test`    | Run the test suite        |
| `npm run preview` | Preview the build        |
