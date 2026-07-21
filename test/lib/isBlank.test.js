import { describe, it, expect } from 'vitest';
import isBlank from '../../src/lib/strings/isBlank.js';

describe('isBlank', () => {
  it('returns the expected result', () => {
    expect(isBlank('   ')).toBe(true);
  });
});
