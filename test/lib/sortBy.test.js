import { describe, it, expect } from 'vitest';
import sortBy from '../../src/lib/arrays/sortBy.js';

describe('sortBy', () => {
  it('returns the expected result', () => {
    expect(sortBy([{ v: 3 }, { v: 1 }], (o) => o.v)).toEqual([{ v: 1 }, { v: 3 }]);
  });
});
