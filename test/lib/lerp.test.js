import { describe, it, expect } from 'vitest';
import lerp from '../../src/lib/numbers/lerp.js';

describe('lerp', () => {
  it('returns the expected result', () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
  });
});
