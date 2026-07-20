/**
 * Stellar network definitions. This app currently runs entirely on mock
 * data (see src/services/wallet.js), so nothing here is wired to real
 * Horizon/Soroban calls yet — it exists so the app has a single source of
 * truth for "which network is selected" ahead of that integration, and so
 * UI (NetworkToggle, badges, etc.) has real values to render.
 */

export const NETWORKS = {
  testnet: {
    id: 'testnet',
    label: 'Testnet',
    networkPassphrase: 'Test SDF Network ; September 2015',
    horizonUrl: 'https://horizon-testnet.stellar.org',
    sorobanRpcUrl: 'https://soroban-testnet.stellar.org',
  },
  mainnet: {
    id: 'mainnet',
    label: 'Mainnet',
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
    horizonUrl: 'https://horizon.stellar.org',
    sorobanRpcUrl: 'https://soroban-rpc.mainnet.stellar.gateway.fm',
  },
};

/** Default network on first load. Testnet, so nobody lands on mainnet by accident. */
export const DEFAULT_NETWORK = 'testnet';
