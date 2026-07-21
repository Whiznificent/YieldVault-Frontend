import { describe, it, expect } from 'vitest';
import last from '../../src/lib/arrays/last.js';

describe('last', () => {
  it('returns the expected result', () => {
    expect(last([1, 2, 3])).toBe(3);
  });
});
