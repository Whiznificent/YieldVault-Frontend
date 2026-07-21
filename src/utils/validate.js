/**
 * Input validation helpers for deposit/withdraw forms.
 * Each validator returns { valid: boolean, error: string|null }.
 */

import { safeParseNumber } from './format.js';

/**
 * Validate a deposit amount against the user's wallet balance.
 * @param {string|number} amount
 * @param {number} balance
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateDeposit(amount, balance) {
  if (amount === '' || amount === null || amount === undefined) {
    return { valid: false, error: 'Enter an amount' };
  }
  
  const num = safeParseNumber(amount);
  if (num === null) {
    return { valid: false, error: 'Amount is too large or invalid' };
  }
  if (num <= 0) {
    return { valid: false, error: 'Amount must be greater than zero' };
  }
  if (num > balance) {
    return { valid: false, error: 'Amount exceeds your balance' };
  }
  return { valid: true, error: null };
}

/**
 * Validate a withdrawal amount against the user's deposited position.
 * @param {string|number} amount
 * @param {number} deposited
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateWithdraw(amount, deposited) {
  if (amount === '' || amount === null || amount === undefined) {
    return { valid: false, error: 'Enter an amount' };
  }
  
  const num = safeParseNumber(amount);
  if (num === null) {
    return { valid: false, error: 'Amount is too large or invalid' };
  }
  if (num <= 0) {
    return { valid: false, error: 'Amount must be greater than zero' };
  }
  if (num > deposited) {
    return { valid: false, error: 'Amount exceeds your position' };
  }
  return { valid: true, error: null };
}

/**
 * True when a string is a positive numeric value.
 * @param {string} value
 * @returns {boolean}
 */
export function isPositiveNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) && num > 0;
}

/**
 * Loose check for a Stellar public key: a 56-character base32 string that
 * starts with 'G'. Intended for UI feedback, not on-chain validation.
 * @param {string} address
 * @returns {boolean}
 */
export function isStellarAddress(address) {
  if (typeof address !== 'string') return false;
  return /^G[A-Z2-7]{55}$/.test(address.trim());
}

/**
 * True when a value is a number within the inclusive [0, 100] percent range.
 * @param {string|number} value
 * @returns {boolean}
 */
export function isValidPercent(value) {
  const num = Number(value);
  return Number.isFinite(num) && num >= 0 && num <= 100;
}
