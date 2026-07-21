import { describe, it, expect } from 'vitest';
import titleCase from '../../src/lib/strings/titleCase.js';

describe('titleCase', () => {
  it('returns the expected result', () => {
    expect(titleCase('hi there')).toBe('Hi There');
  });
});
