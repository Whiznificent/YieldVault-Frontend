import { describe, it, expect } from 'vitest';
import { TABLET_LANDSCAPE_QUERY } from '../../src/constants/breakpoints.js';

describe('TABLET_LANDSCAPE_QUERY', () => {
  it('is a non-empty string', () => {
    expect(typeof TABLET_LANDSCAPE_QUERY).toBe('string');
    expect(TABLET_LANDSCAPE_QUERY.length).toBeGreaterThan(0);
  });

  it('matches against a mocked matchMedia the way a real browser would', () => {
    const evaluate = (width, height, orientation) => {
      // A minimal stand-in for the browser's own media query evaluation,
      // covering only the four features this query actually uses.
      const minWidth = /min-width:\s*(\d+)px/.exec(TABLET_LANDSCAPE_QUERY)[1];
      const maxWidth = /max-width:\s*(\d+)px/.exec(TABLET_LANDSCAPE_QUERY)[1];
      const minHeight = /min-height:\s*(\d+)px/.exec(TABLET_LANDSCAPE_QUERY)[1];
      const orientationClause = /orientation:\s*(\w+)/.exec(TABLET_LANDSCAPE_QUERY)[1];
      return (
        width >= Number(minWidth) &&
        width <= Number(maxWidth) &&
        height >= Number(minHeight) &&
        orientation === orientationClause
      );
    };

    // iPad landscape: should match.
    expect(evaluate(1024, 768, 'landscape')).toBe(true);
    // A large phone rotated to landscape: wide enough, but too short.
    expect(evaluate(930, 430, 'landscape')).toBe(false);
    // A tablet still held in portrait: right size, wrong orientation.
    expect(evaluate(768, 1024, 'portrait')).toBe(false);
    // A desktop monitor: too wide.
    expect(evaluate(1920, 1080, 'landscape')).toBe(false);
    // A narrow phone in portrait: too narrow and wrong orientation.
    expect(evaluate(390, 844, 'portrait')).toBe(false);
  });

  it('declares each expected media feature exactly once', () => {
    const count = (feature) =>
      (TABLET_LANDSCAPE_QUERY.match(new RegExp(feature, 'g')) || []).length;

    expect(count('min-width')).toBe(1);
    expect(count('max-width')).toBe(1);
    expect(count('min-height')).toBe(1);
    expect(count('orientation')).toBe(1);
  });
});
