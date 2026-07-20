import { describe, it, expect } from 'vitest';
import chunk from '../../src/lib/arrays/chunk.js';

describe('chunk', () => {
  it('returns the expected result', () => {
    expect(chunk([1, 2, 3], 2)).toEqual([[1, 2], [3]]);
  });
});
