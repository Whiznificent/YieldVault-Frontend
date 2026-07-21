/**
 * Vault share math. A vault tracks total assets and total shares; the
 * share price is assets / shares. These helpers compute how many shares
 * a deposit mints and how many assets a withdrawal returns.
 */

import { safeParseNumber } from './format.js';

/**
 * Current price of a single share, in underlying asset units.
 * Falls back to 1.0 when the vault is empty (first deposit).
 * @param {number} totalAssets
 * @param {number} totalShares
 * @returns {number}
 */
export function sharePrice(totalAssets, totalShares) {
  if (!totalShares || totalShares <= 0) return 1;
  return totalAssets / totalShares;
}

/**
 * Shares minted for a given deposit amount.
 * @param {number} amount - deposit amount in asset units
 * @param {number} totalAssets
 * @param {number} totalShares
 * @returns {number}
 */
export function previewDeposit(amount, totalAssets, totalShares) {
  const value = safeParseNumber(amount);
  if (value === null || value <= 0) return 0;
  const price = sharePrice(totalAssets, totalShares);
  return value / price;
}

/**
 * Asset amount returned when redeeming a number of shares.
 * @param {number} shares
 * @param {number} totalAssets
 * @param {number} totalShares
 * @returns {number}
 */
export function previewRedeem(shares, totalAssets, totalShares) {
  const value = safeParseNumber(shares);
  if (value === null || value <= 0) return 0;
  const price = sharePrice(totalAssets, totalShares);
  return value * price;
}

/**
 * Shares to burn to withdraw a target asset amount.
 * @param {number} amount - desired asset amount out
 * @param {number} totalAssets
 * @param {number} totalShares
 * @returns {number}
 */
export function previewWithdraw(amount, totalAssets, totalShares) {
  const value = safeParseNumber(amount);
  if (value === null || value <= 0) return 0;
  const price = sharePrice(totalAssets, totalShares);
  return value / price;
}
