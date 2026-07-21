import { describe, it, expect } from 'vitest';
import { formatAmount } from '../../src/utils/format.js';

describe('formatAmount', () => {
  it('formats with thousands separators using the app default locale', () => {
    expect(formatAmount(1234.5)).toBe('1,234.50');
    expect(formatAmount(1_000_000)).toBe('1,000,000.00');
  });

  it('respects the decimals argument', () => {
    expect(formatAmount(1.23456, 4)).toBe('1.2346');
    expect(formatAmount(7, 0)).toBe('7');
  });

  it('falls back to zero for non-finite input', () => {
    expect(formatAmount(NaN)).toBe('0.00');
    expect(formatAmount(Infinity)).toBe('0.00');
    expect(formatAmount('not a number')).toBe('0.00');
  });
});
