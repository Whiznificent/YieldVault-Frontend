import { describe, it, expect } from 'vitest';
import slugify from '../../src/lib/strings/slugify.js';

describe('slugify', () => {
  it('returns the expected result', () => {
    expect(slugify('Hi There!')).toBe('hi-there');
  });
});
