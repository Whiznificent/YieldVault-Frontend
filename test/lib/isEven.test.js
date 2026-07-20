import { describe, it, expect } from 'vitest';
import isEven from '../../src/lib/numbers/isEven.js';

describe('isEven', () => {
  it('returns the expected result', () => {
    expect(isEven(4)).toBe(true);
  });
});
