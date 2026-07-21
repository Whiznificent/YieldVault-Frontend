import { describe, it, expect } from 'vitest';
import { validateDeposit, validateWithdraw } from '../../src/utils/validate.js';

describe('validateDeposit', () => {
  it('validates correct deposit amounts', () => {
    expect(validateDeposit('100', 1000)).toEqual({ valid: true, error: null });
    expect(validateDeposit('1000', 1000)).toEqual({ valid: true, error: null });
    expect(validateDeposit(500, 1000)).toEqual({ valid: true, error: null });
  });

  it('rejects empty amounts', () => {
    expect(validateDeposit('', 1000)).toEqual({ valid: false, error: 'Enter an amount' });
    expect(validateDeposit(null, 1000)).toEqual({ valid: false, error: 'Enter an amount' });
    expect(validateDeposit(undefined, 1000)).toEqual({ valid: false, error: 'Enter an amount' });
  });

  it('rejects amounts that are too large (precision loss)', () => {
    const maxSafe = Number.MAX_SAFE_INTEGER;
    expect(validateDeposit(maxSafe + 1, maxSafe + 2)).toEqual({ 
      valid: false, 
      error: 'Amount is too large or invalid' 
    });
    expect(validateDeposit('9007199254740992', 9007199254740993)).toEqual({ 
      valid: false, 
      error: 'Amount is too large or invalid' 
    });
  });

  it('rejects zero or negative amounts', () => {
    expect(validateDeposit('0', 1000)).toEqual({ valid: false, error: 'Amount must be greater than zero' });
    expect(validateDeposit('-100', 1000)).toEqual({ valid: false, error: 'Amount must be greater than zero' });
  });

  it('rejects amounts exceeding balance', () => {
    expect(validateDeposit('1001', 1000)).toEqual({ valid: false, error: 'Amount exceeds your balance' });
    expect(validateDeposit('2000', 1000)).toEqual({ valid: false, error: 'Amount exceeds your balance' });
  });

  it('handles amounts with thousands separators', () => {
    expect(validateDeposit('1,000', 1000)).toEqual({ valid: true, error: null });
    expect(validateDeposit('1,234', 2000)).toEqual({ valid: true, error: null });
  });
});

describe('validateWithdraw', () => {
  it('validates correct withdrawal amounts', () => {
    expect(validateWithdraw('100', 1000)).toEqual({ valid: true, error: null });
    expect(validateWithdraw('1000', 1000)).toEqual({ valid: true, error: null });
    expect(validateWithdraw(500, 1000)).toEqual({ valid: true, error: null });
  });

  it('rejects empty amounts', () => {
    expect(validateWithdraw('', 1000)).toEqual({ valid: false, error: 'Enter an amount' });
    expect(validateWithdraw(null, 1000)).toEqual({ valid: false, error: 'Enter an amount' });
    expect(validateWithdraw(undefined, 1000)).toEqual({ valid: false, error: 'Enter an amount' });
  });

  it('rejects amounts that are too large (precision loss)', () => {
    const maxSafe = Number.MAX_SAFE_INTEGER;
    expect(validateWithdraw(maxSafe + 1, maxSafe + 2)).toEqual({ 
      valid: false, 
      error: 'Amount is too large or invalid' 
    });
    expect(validateWithdraw('9007199254740992', 9007199254740993)).toEqual({ 
      valid: false, 
      error: 'Amount is too large or invalid' 
    });
  });

  it('rejects zero or negative amounts', () => {
    expect(validateWithdraw('0', 1000)).toEqual({ valid: false, error: 'Amount must be greater than zero' });
    expect(validateWithdraw('-100', 1000)).toEqual({ valid: false, error: 'Amount must be greater than zero' });
  });

  it('rejects amounts exceeding position', () => {
    expect(validateWithdraw('1001', 1000)).toEqual({ valid: false, error: 'Amount exceeds your position' });
    expect(validateWithdraw('2000', 1000)).toEqual({ valid: false, error: 'Amount exceeds your position' });
  });

  it('handles amounts with thousands separators', () => {
    expect(validateWithdraw('1,000', 1000)).toEqual({ valid: true, error: null });
    expect(validateWithdraw('1,234', 2000)).toEqual({ valid: true, error: null });
  });
});
