import { describe, it, expect } from 'vitest';
import sum from '../../src/lib/numbers/sum.js';

describe('sum', () => {
  it('returns the expected result', () => {
    expect(sum([1, 2, 3])).toBe(6);
  });
});
