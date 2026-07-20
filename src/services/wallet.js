import { withLatency, clone } from './api.js';
import { MOCK_BALANCES } from './mockData.js';
import { CONFIG } from '../constants/config.js';

/**
 * Mock Stellar wallet service. Simulates connecting a Freighter-style
 * wallet and reading token balances without touching the network.
 */

const MOCK_ADDRESS = 'GAYV7XALOK6PTT5XJVMGCPTUEPFM4AVSRCJ55ZDRIPSXYLD7VAULT';

/**
 * Get the current network the wallet is connected to.
 * In a real implementation, this would query the wallet extension.
 * For mock purposes, we simulate a mismatch based on environment.
 * @returns {Promise<string>}
 */
export async function getNetwork() {
  // Simulate network detection - in production this would come from the actual wallet
  // For testing, we return the configured network to simulate correct connection
  return withLatency(CONFIG.network);
}

/**
 * Connect the (mock) wallet and return the account address.
 * @returns {Promise<{ address: string }>}
 */
export async function connect() {
  return withLatency({ address: MOCK_ADDRESS });
}

/**
 * Disconnect the wallet. Resolves immediately.
 * @returns {Promise<void>}
 */
export async function disconnect() {
  return withLatency(undefined, 150);
}

/**
 * Fetch token balances for the connected account.
 * @returns {Promise<Record<string, number>>}
 */
export async function getBalances() {
  return withLatency(clone(MOCK_BALANCES));
}

/**
 * Sign and submit a transaction. Always succeeds in the mock.
 * @param {string} summary - human-readable description of the tx
 * @returns {Promise<{ hash: string, summary: string }>}
 */
export async function signAndSubmit(summary) {
  const hash = `mock-${Math.random().toString(16).slice(2, 10)}`;
  return withLatency({ hash, summary });
}
