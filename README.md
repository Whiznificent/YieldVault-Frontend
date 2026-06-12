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
  components/   reusable UI (Button, StatCard, VaultCard, forms, ...)
  pages/        routed views (Home, Dashboard, VaultDetail, Positions)
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
- Vault detail pages with deposit/withdraw forms and a live shares preview
- Positions list with per-vault value and earned yield
- Mock Stellar wallet (connect/disconnect, balances, signing)
- Loading, error and empty states throughout

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start the dev server     |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview the build        |
