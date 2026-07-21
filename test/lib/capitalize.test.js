import { describe, it, expect } from 'vitest';
import capitalize from '../../src/lib/strings/capitalize.js';

describe('capitalize', () => {
  it('returns the expected result', () => {
    expect(capitalize('abc')).toBe('Abc');
  });
});
