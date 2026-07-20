import { describe, it, expect } from 'vitest';
import countWords from '../../src/lib/strings/countWords.js';

describe('countWords', () => {
  it('returns the expected result', () => {
    expect(countWords('a b c')).toBe(3);
  });
});
