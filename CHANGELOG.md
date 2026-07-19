# Changelog

All notable changes to the YieldVault frontend are documented here. This
project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- i18n readiness: language/locale constants (`src/constants/i18n.js`) as the
  single source of truth, a `useDocumentLang` hook that keeps
  `document.documentElement.lang` in sync at runtime, an explicit `lang`
  attribute on the app root, and formatters that read the locale from the
  i18n constants instead of hardcoding `en-US`.

- Multi-step form wizard (`FormWizard`) — a reusable component with step
  indicator, animated panel transitions, per-step validation, progress bar,
  keyboard support, and customizable submit labels.
- `DepositWizard` — multi-step deposit flow (Amount → Review → Confirm)
  replacing the single-step deposit form on vault detail pages.
- `WithdrawWizard` — multi-step withdraw flow (Amount → Review → Confirm)
  replacing the single-step withdraw form on vault detail pages.
- `WizardDemo` page at `/wizard-demo` showcasing the wizard with a
  four-step "Create Vault" form (Basics → Strategy → Review → Deploy).
- Reusable UI components: `Tag`, `ProgressBar`, `CopyButton`, `Alert`,
  `Modal`, `Tooltip`, `Avatar`, `StatGrid`, `Pagination` and `ThemeToggle`.
- Hooks: `useToggle`, `usePrevious`, `useInterval`, `useOnClickOutside`,
  `useWindowSize` and `useKeyPress`.
- Formatting helpers for APY, projected yield and signed amounts.
- Validators for Stellar addresses and percentage ranges.
- Vault metadata and risk-tier constants under `src/constants/vaults.js`.
- Opt-in light theme via a persisted `data-theme` attribute.

## [0.1.0]

### Added

- Initial React + Vite frontend with routing, mock services and core pages
  (Home, Dashboard, VaultDetail, Positions).
