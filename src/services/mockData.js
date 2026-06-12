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
