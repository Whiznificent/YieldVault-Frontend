/**
 * Mock data backing the offline services. No network calls are made;
 * this lets the UI run end to end during development and demos.
 */

export const MOCK_VAULTS = [
  {
    id: 'usdc-vault',
    name: 'USDC Yield Vault',
    asset: 'USDC',
    apy: 0.0842,
    tvl: 4_820_000,
    totalAssets: 4_820_000,
    totalShares: 4_600_000,
    strategy: 'Lends USDC across Soroban money markets.',
    risk: 'Low',
  },
  {
    id: 'xlm-vault',
    name: 'XLM Yield Vault',
    asset: 'XLM',
    apy: 0.1135,
    tvl: 1_240_000,
    totalAssets: 1_240_000,
    totalShares: 1_180_000,
    strategy: 'Provides XLM liquidity to AMM pools.',
    risk: 'Medium',
  },
  {
    id: 'eurc-vault',
    name: 'EURC Yield Vault',
    asset: 'EURC',
    apy: 0.0671,
    tvl: 760_000,
    totalAssets: 760_000,
    totalShares: 745_000,
    strategy: 'Conservative EURC lending strategy.',
    risk: 'Low',
  },
];

export const MOCK_BALANCES = {
  USDC: 12_500,
  XLM: 48_000,
  EURC: 3_200,
};

/**
 * 14 days of APY history per vault, most recent last, ending at each
 * vault's current `apy` in MOCK_VAULTS above. Shaped to match
 * YieldVault-Backend's real GET /api/vaults/:id/apy-history response
 * (`{ date, apy }` entries per vault) rather than an invented shape, so
 * swapping this mock for the real endpoint later is a drop-in change.
 * Hardcoded rather than generated so the chart's mock data (and any test
 * asserting against it) stays deterministic between runs.
 */
export const MOCK_APY_HISTORY = {
  'usdc-vault': [
    { date: '2026-07-07', apy: 0.0790 },
    { date: '2026-07-08', apy: 0.0805 },
    { date: '2026-07-09', apy: 0.0812 },
    { date: '2026-07-10', apy: 0.0798 },
    { date: '2026-07-11', apy: 0.0821 },
    { date: '2026-07-12', apy: 0.0835 },
    { date: '2026-07-13', apy: 0.0818 },
    { date: '2026-07-14', apy: 0.0840 },
    { date: '2026-07-15', apy: 0.0852 },
    { date: '2026-07-16', apy: 0.0830 },
    { date: '2026-07-17', apy: 0.0845 },
    { date: '2026-07-18', apy: 0.0838 },
    { date: '2026-07-19', apy: 0.0850 },
    { date: '2026-07-20', apy: 0.0842 },
  ],
  'xlm-vault': [
    { date: '2026-07-07', apy: 0.0980 },
    { date: '2026-07-08', apy: 0.1050 },
    { date: '2026-07-09', apy: 0.1015 },
    { date: '2026-07-10', apy: 0.1090 },
    { date: '2026-07-11', apy: 0.1120 },
    { date: '2026-07-12', apy: 0.1065 },
    { date: '2026-07-13', apy: 0.1150 },
    { date: '2026-07-14', apy: 0.1100 },
    { date: '2026-07-15', apy: 0.1180 },
    { date: '2026-07-16', apy: 0.1140 },
    { date: '2026-07-17', apy: 0.1160 },
    { date: '2026-07-18', apy: 0.1105 },
    { date: '2026-07-19', apy: 0.1170 },
    { date: '2026-07-20', apy: 0.1135 },
  ],
  'eurc-vault': [
    { date: '2026-07-07', apy: 0.0640 },
    { date: '2026-07-08', apy: 0.0648 },
    { date: '2026-07-09', apy: 0.0652 },
    { date: '2026-07-10', apy: 0.0645 },
    { date: '2026-07-11', apy: 0.0658 },
    { date: '2026-07-12', apy: 0.0663 },
    { date: '2026-07-13', apy: 0.0655 },
    { date: '2026-07-14', apy: 0.0668 },
    { date: '2026-07-15', apy: 0.0672 },
    { date: '2026-07-16', apy: 0.0660 },
    { date: '2026-07-17', apy: 0.0675 },
    { date: '2026-07-18', apy: 0.0665 },
    { date: '2026-07-19', apy: 0.0678 },
    { date: '2026-07-20', apy: 0.0671 },
  ],
};

export const MOCK_POSITIONS = [
  {
    vaultId: 'usdc-vault',
    asset: 'USDC',
    shares: 1_900,
    deposited: 1_900,
    value: 1_991,
    earned: 91,
  },
  {
    vaultId: 'xlm-vault',
    asset: 'XLM',
    shares: 5_000,
    deposited: 5_000,
    value: 5_254,
    earned: 254,
  },
];
