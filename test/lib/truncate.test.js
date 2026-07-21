import { describe, it, expect } from 'vitest';
import truncate from '../../src/lib/strings/truncate.js';

describe('truncate', () => {
  it('returns the expected result', () => {
    expect(truncate('hello', 3)).toBe('hel…');
  });
});
