import { describe, it, expect } from 'vitest';
import clamp from '../../src/lib/numbers/clamp.js';

describe('clamp', () => {
  it('returns the expected result', () => {
    expect(clamp(5, 0, 3)).toBe(3);
  });
});
