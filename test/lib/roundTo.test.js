import { describe, it, expect } from 'vitest';
import roundTo from '../../src/lib/numbers/roundTo.js';

describe('roundTo', () => {
  it('returns the expected result', () => {
    expect(roundTo(3.14159, 2)).toBe(3.14);
  });
});
