import { describe, it, expect } from 'vitest';
import pick from '../../src/lib/objects/pick.js';

describe('pick', () => {
  it('returns the expected result', () => {
    expect(pick({ a: 1, b: 2 }, ['a'])).toEqual({ a: 1 });
  });
});
