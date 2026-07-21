import { describe, it, expect } from 'vitest';
import { sharePrice, previewDeposit, previewRedeem, previewWithdraw } from '../../src/utils/shares.js';

describe('sharePrice', () => {
  it('calculates share price correctly', () => {
    expect(sharePrice(1000, 100)).toBe(10);
    expect(sharePrice(5000, 500)).toBe(10);
    expect(sharePrice(100, 10)).toBe(10);
  });

  it('returns 1 when totalShares is zero or negative', () => {
    expect(sharePrice(1000, 0)).toBe(1);
    expect(sharePrice(1000, -10)).toBe(1);
    expect(sharePrice(0, 0)).toBe(1);
  });
});

describe('previewDeposit', () => {
  it('calculates shares to mint correctly', () => {
    expect(previewDeposit(100, 1000, 100)).toBe(10);
    expect(previewDeposit(500, 5000, 500)).toBe(50);
    expect(previewDeposit(1000, 1000, 100)).toBe(100);
  });

  it('returns 0 for invalid amounts', () => {
    expect(previewDeposit(0, 1000, 100)).toBe(0);
    expect(previewDeposit(-100, 1000, 100)).toBe(0);
    expect(previewDeposit('abc', 1000, 100)).toBe(0);
  });

  it('returns 0 for amounts that would lose precision', () => {
    const maxSafe = Number.MAX_SAFE_INTEGER;
    expect(previewDeposit(maxSafe + 1, maxSafe + 2, 100)).toBe(0);
    expect(previewDeposit('9007199254740992', 9007199254740993, 100)).toBe(0);
  });

  it('handles empty vault (first deposit)', () => {
    expect(previewDeposit(100, 0, 0)).toBe(100);
    expect(previewDeposit(500, 0, 0)).toBe(500);
  });
});

describe('previewRedeem', () => {
  it('calculates asset return correctly', () => {
    expect(previewRedeem(10, 1000, 100)).toBe(100);
    expect(previewRedeem(50, 5000, 500)).toBe(500);
    expect(previewRedeem(100, 1000, 100)).toBe(1000);
  });

  it('returns 0 for invalid share amounts', () => {
    expect(previewRedeem(0, 1000, 100)).toBe(0);
    expect(previewRedeem(-10, 1000, 100)).toBe(0);
    expect(previewRedeem('abc', 1000, 100)).toBe(0);
  });

  it('returns 0 for shares that would lose precision', () => {
    const maxSafe = Number.MAX_SAFE_INTEGER;
    expect(previewRedeem(maxSafe + 1, maxSafe + 2, 100)).toBe(0);
    expect(previewRedeem('9007199254740992', 9007199254740993, 100)).toBe(0);
  });
});

describe('previewWithdraw', () => {
  it('calculates shares to burn correctly', () => {
    expect(previewWithdraw(100, 1000, 100)).toBe(10);
    expect(previewWithdraw(500, 5000, 500)).toBe(50);
    expect(previewWithdraw(1000, 1000, 100)).toBe(100);
  });

  it('returns 0 for invalid amounts', () => {
    expect(previewWithdraw(0, 1000, 100)).toBe(0);
    expect(previewWithdraw(-100, 1000, 100)).toBe(0);
    expect(previewWithdraw('abc', 1000, 100)).toBe(0);
  });

  it('returns 0 for amounts that would lose precision', () => {
    const maxSafe = Number.MAX_SAFE_INTEGER;
    expect(previewWithdraw(maxSafe + 1, maxSafe + 2, 100)).toBe(0);
    expect(previewWithdraw('9007199254740992', 9007199254740993, 100)).toBe(0);
  });

  it('handles empty vault (first withdrawal)', () => {
    expect(previewWithdraw(100, 0, 0)).toBe(100);
    expect(previewWithdraw(500, 0, 0)).toBe(500);
  });
});
