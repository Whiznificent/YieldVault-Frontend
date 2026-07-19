/**
 * Formatting helpers for currency, percentages and addresses.
 * Pure functions — no side effects, safe to use anywhere in the UI.
 */
import { DEFAULT_LOCALE } from '../constants/i18n.js';

/**
 * Format a number as a currency-style amount with thousands separators.
 * @param {number} value
 * @param {number} [decimals=2]
 * @returns {string}
 */
export function formatAmount(value, decimals = 2) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '0.00';
  return num.toLocaleString(DEFAULT_LOCALE, {
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
 * Format a vault share balance with thousands separators. Shares are
 * displayed with fewer decimals than asset amounts.
 * @param {number} value
 * @param {number} [decimals=2]
 * @returns {string}
 */
export function formatShares(value, decimals = 2) {
  return `${formatAmount(value, decimals)} shares`;
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
 * Format an APY ratio (0.085) as a labelled percentage ("8.50% APY").
 * @param {number} value
 * @param {number} [decimals=2]
 * @returns {string}
 */
export function formatApy(value, decimals = 2) {
  return `${formatPercent(value, decimals)} APY`;
}

/**
 * Convert an APY ratio into the projected yield on a principal amount.
 * @param {number} principal - deposited amount
 * @param {number} apy - annual percentage yield as a ratio (0.085)
 * @returns {number} projected earnings over one year
 */
export function projectedYield(principal, apy) {
  const p = Number(principal);
  const r = Number(apy);
  if (!Number.isFinite(p) || !Number.isFinite(r)) return 0;
  return p * r;
}

/**
 * Format a signed value with an explicit + or − prefix, useful for showing
 * gains and losses (e.g. "+12.50", "−3.40").
 * @param {number} value
 * @param {number} [decimals=2]
 * @returns {string}
 */
export function formatSigned(value, decimals = 2) {
  const num = Number(value);
  if (!Number.isFinite(num) || num === 0) return formatAmount(0, decimals);
  const sign = num > 0 ? '+' : '−';
  return `${sign}${formatAmount(Math.abs(num), decimals)}`;
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
