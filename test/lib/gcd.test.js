import { describe, it, expect } from 'vitest';
import gcd from '../../src/lib/numbers/gcd.js';

describe('gcd', () => {
  it('returns the expected result', () => {
    expect(gcd(12, 8)).toBe(4);
  });
});
