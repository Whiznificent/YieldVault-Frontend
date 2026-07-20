import { describe, it, expect } from 'vitest';
import average from '../../src/lib/numbers/average.js';

describe('average', () => {
  it('returns the expected result', () => {
    expect(average([1, 2, 3])).toBe(2);
  });
});
