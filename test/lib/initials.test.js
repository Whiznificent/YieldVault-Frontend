import { describe, it, expect } from 'vitest';
import initials from '../../src/lib/strings/initials.js';

describe('initials', () => {
  it('returns the expected result', () => {
    expect(initials('John Doe')).toBe('JD');
  });
});
