import { describe, it, expect } from 'vitest';
import unique from '../../src/lib/arrays/unique.js';

describe('unique', () => {
  it('returns the expected result', () => {
    expect(unique([1, 1, 2])).toEqual([1, 2]);
  });
});
