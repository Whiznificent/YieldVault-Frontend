import { withLatency, clone } from './api.js';
import { MOCK_VAULTS, MOCK_POSITIONS } from './mockData.js';
import { previewDeposit, previewWithdraw } from '../utils/shares.js';

/**
 * Mock vault service. Reads vault stats and user positions, and simulates
 * deposit/withdraw flows by computing the resulting shares locally.
 */

/**
 * List all available vaults with their stats.
 * @returns {Promise<Array>}
 */
export async function listVaults() {
  return withLatency(clone(MOCK_VAULTS));
}

/**
 * Fetch a single vault by id.
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export async function getVault(id) {
  const vault = MOCK_VAULTS.find((v) => v.id === id) || null;
  return withLatency(vault ? clone(vault) : null);
}

/**
 * Fetch the connected user's open positions.
 * @returns {Promise<Array>}
 */
export async function getPositions() {
  return withLatency(clone(MOCK_POSITIONS));
}

/**
 * Aggregate protocol-wide stats from all vaults.
 * @returns {Promise<{ totalTvl: number, avgApy: number, vaultCount: number }>}
 */
export async function getProtocolStats() {
  const totalTvl = MOCK_VAULTS.reduce((sum, v) => sum + v.tvl, 0);
  const avgApy =
    MOCK_VAULTS.reduce((sum, v) => sum + v.apy, 0) / MOCK_VAULTS.length;
  return withLatency({ totalTvl, avgApy, vaultCount: MOCK_VAULTS.length });
}

/**
 * Simulate a deposit and return the minted shares plus a receipt.
 * @param {string} vaultId
 * @param {number} amount
 * @returns {Promise<{ shares: number, vaultId: string }>}
 */
export async function deposit(vaultId, amount) {
  const vault = MOCK_VAULTS.find((v) => v.id === vaultId);
  if (!vault) throw new Error('Vault not found');
  const shares = previewDeposit(amount, vault.totalAssets, vault.totalShares);
  return withLatency({ shares, vaultId });
}

/**
 * Simulate a withdrawal and return the burned shares plus a receipt.
 * @param {string} vaultId
 * @param {number} amount
 * @returns {Promise<{ shares: number, vaultId: string }>}
 */
export async function withdraw(vaultId, amount) {
  const vault = MOCK_VAULTS.find((v) => v.id === vaultId);
  if (!vault) throw new Error('Vault not found');
  const shares = previewWithdraw(amount, vault.totalAssets, vault.totalShares);
  return withLatency({ shares, vaultId });
}
