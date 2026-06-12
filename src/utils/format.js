/**
 * Formatting helpers for currency, percentages and addresses.
 * Pure functions — no side effects, safe to use anywhere in the UI.
 */

/**
 * Format a number as a currency-style amount with thousands separators.
 * @param {number} value
 * @param {number} [decimals=2]
 * @returns {string}
 */
export function formatAmount(value, decimals = 2) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '0.00';
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format a large value into a compact form (e.g. 1.2M, 3.4K).
 * @param {number} value
 * @returns {string}
 */
export function formatCompact(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '0';
  if (Math.abs(num) >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (Math.abs(num) >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
  return num.toFixed(2);
}

/**
 * Format a ratio (0.085) as a percentage string ("8.50%").
 * @param {number} value
 * @param {number} [decimals=2]
 * @returns {string}
 */
export function formatPercent(value, decimals = 2) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '0.00%';
  return `${(num * 100).toFixed(decimals)}%`;
}

/**
 * Format a US dollar value with a leading $ and compact notation.
 * @param {number} value
 * @returns {string}
 */
export function formatUsd(value) {
  return `$${formatCompact(value)}`;
}

/**
 * Shorten a Stellar address for display (GABC...WXYZ).
 * @param {string} address
 * @returns {string}
 */
export function shortenAddress(address) {
  if (!address || typeof address !== 'string') return '';
  if (address.length <= 12) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

/**
 * Clamp a number into the inclusive [min, max] range.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
