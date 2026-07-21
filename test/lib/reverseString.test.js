import { describe, it, expect } from 'vitest';
import reverseString from '../../src/lib/strings/reverseString.js';

describe('reverseString', () => {
  it('returns the expected result', () => {
    expect(reverseString('abc')).toBe('cba');
  });
});
