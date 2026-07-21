import { describe, it, expect } from 'vitest';
import safeDivide from '../../src/lib/numbers/safeDivide.js';

describe('safeDivide', () => {
  it('returns the expected result', () => {
    expect(safeDivide(10, 2)).toBe(5);
  });
});
