import { describe, it, expect } from 'vitest';
import { safeParseNumber, formatAmount } from '../../src/utils/format.js';

describe('safeParseNumber', () => {
  it('parses valid number strings', () => {
    expect(safeParseNumber('123')).toBe(123);
    expect(safeParseNumber('123.45')).toBe(123.45);
    expect(safeParseNumber('0')).toBe(0);
    expect(safeParseNumber('-123')).toBe(-123);
  });

  it('parses numbers with thousands separators', () => {
    expect(safeParseNumber('1,000')).toBe(1000);
    expect(safeParseNumber('1,234,567')).toBe(1234567);
    expect(safeParseNumber('1,234.56')).toBe(1234.56);
  });

  it('returns null for empty strings', () => {
    expect(safeParseNumber('')).toBeNull();
    expect(safeParseNumber('   ')).toBeNull();
  });

  it('returns null for invalid strings', () => {
    expect(safeParseNumber('abc')).toBeNull();
    expect(safeParseNumber('123abc')).toBeNull();
  });

  it('returns null for numbers exceeding MAX_SAFE_INTEGER', () => {
    const maxSafe = Number.MAX_SAFE_INTEGER;
    expect(safeParseNumber(maxSafe)).toBe(maxSafe);
    expect(safeParseNumber(maxSafe + 1)).toBeNull();
    expect(safeParseNumber('9007199254740992')).toBeNull(); // MAX_SAFE_INTEGER + 1
    expect(safeParseNumber('10000000000000000')).toBeNull(); // Very large number
  });

  it('returns null for negative numbers below -MAX_SAFE_INTEGER', () => {
    const maxSafe = Number.MAX_SAFE_INTEGER;
    expect(safeParseNumber(-maxSafe)).toBe(-maxSafe);
    expect(safeParseNumber(-(maxSafe + 1))).toBeNull();
    expect(safeParseNumber('-9007199254740992')).toBeNull();
  });

  it('handles number input directly', () => {
    expect(safeParseNumber(123)).toBe(123);
    expect(safeParseNumber(123.45)).toBe(123.45);
    expect(safeParseNumber(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
    expect(safeParseNumber(Number.MAX_SAFE_INTEGER + 1)).toBeNull();
  });

  it('returns null for Infinity and NaN', () => {
    expect(safeParseNumber(Infinity)).toBeNull();
    expect(safeParseNumber(-Infinity)).toBeNull();
    expect(safeParseNumber(NaN)).toBeNull();
  });
});

describe('formatAmount', () => {
  it('formats numbers with thousands separators', () => {
    expect(formatAmount(1000)).toBe('1,000.00');
    expect(formatAmount(1000000)).toBe('1,000,000.00');
    expect(formatAmount(1234.56)).toBe('1,234.56');
  });

  it('handles custom decimal places', () => {
    expect(formatAmount(1000, 0)).toBe('1,000');
    expect(formatAmount(1000, 4)).toBe('1,000.0000');
  });

  it('handles invalid numbers', () => {
    expect(formatAmount(NaN)).toBe('0.00');
    expect(formatAmount(Infinity)).toBe('0.00');
  });
});
