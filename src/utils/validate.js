/**
 * Input validation helpers for deposit/withdraw forms.
 * Each validator returns { valid: boolean, error: string|null }.
 */

/**
 * Validate a deposit amount against the user's wallet balance.
 * @param {string|number} amount
 * @param {number} balance
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateDeposit(amount, balance) {
  const num = Number(amount);
  if (amount === '' || amount === null || amount === undefined) {
    return { valid: false, error: 'Enter an amount' };
  }
  if (!Number.isFinite(num)) {
    return { valid: false, error: 'Amount must be a number' };
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
  const num = Number(amount);
  if (amount === '' || amount === null || amount === undefined) {
    return { valid: false, error: 'Enter an amount' };
  }
  if (!Number.isFinite(num)) {
    return { valid: false, error: 'Amount must be a number' };
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
