import { describe, it, expect } from 'vitest';
import percentOf from '../../src/lib/numbers/percentOf.js';

describe('percentOf', () => {
  it('returns the expected result', () => {
    expect(percentOf(50, 200)).toBe(25);
  });
});
