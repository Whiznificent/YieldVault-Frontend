import { describe, it, expect } from 'vitest';
import median from '../../src/lib/numbers/median.js';

describe('median', () => {
  it('returns the expected result', () => {
    expect(median([3, 1, 2])).toBe(2);
  });
});
