import { describe, it, expect } from 'vitest';
import groupBy from '../../src/lib/arrays/groupBy.js';

describe('groupBy', () => {
  it('returns the expected result', () => {
    expect(groupBy([1, 2, 3], (x) => x % 2)).toEqual({ '0': [2], '1': [1, 3] });
  });
});
