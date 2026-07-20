/**
 * Static app configuration. Values can be overridden via Vite env vars
 * (see .env.example) but sensible defaults keep the app working offline.
 */
export const CONFIG = {
  appName: 'YieldVault',
  network: import.meta.env?.VITE_NETWORK || 'testnet',
  rpcUrl: import.meta.env?.VITE_RPC_URL || 'https://soroban-testnet.stellar.org',
  vaultContract:
    import.meta.env?.VITE_VAULT_CONTRACT ||
    'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC',
  // Simulated network latency for mock services, in milliseconds.
  mockLatency: 600,

  // Idle session auto-lock. After IDLE_TIMEOUT_MS of inactivity the wallet
  // disconnects. IDLE_WARNING_MS before expiry a modal warns the user.
  idleTimeoutMs: 15 * 60 * 1000, // 15 minutes
  idleWarningMs: 1 * 60 * 1000,   // 1 minute warning
};

export default CONFIG;
