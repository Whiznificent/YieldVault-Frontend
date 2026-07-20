import { describe, it, expect } from 'vitest';
import compact from '../../src/lib/arrays/compact.js';

describe('compact', () => {
  it('returns the expected result', () => {
    expect(compact([0, 1, 2, null, 3])).toEqual([1, 2, 3]);
  });
});
