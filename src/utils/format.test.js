import { describe, it, expect } from 'vitest';
import { formatDate } from './format.js';

describe('formatDate', () => {
  const testDate = new Date('2026-07-20T00:00:00Z');

  it('formats dates in UTC timezone correctly', () => {
    const formatted = formatDate(testDate, 'UTC');
    expect(formatted).toContain('Jul 20, 2026');
    expect(formatted).toContain('12:00:00 AM');
    expect(formatted).toContain('UTC');
  });

  it('formats dates in America/New_York timezone correctly', () => {
    // 2026-07-20T00:00:00Z is 2026-07-19T20:00:00-04:00 (EDT)
    const formatted = formatDate(testDate, 'America/New_York');
    expect(formatted).toContain('Jul 19, 2026');
    expect(formatted).toContain('08:00:00 PM');
    expect(formatted).toContain('EDT');
  });

  it('handles invalid dates by returning an empty string', () => {
    expect(formatDate(null, 'UTC')).toBe('');
    expect(formatDate(undefined, 'UTC')).toBe('');
    expect(formatDate('invalid-date', 'UTC')).toBe('');
  });

  it('respects custom format options override', () => {
    const formatted = formatDate(testDate, 'UTC', {
      timeZoneName: 'long',
      hour12: false,
    });
    expect(formatted).toContain('00:00:00');
    expect(formatted).toContain('Coordinated Universal Time');
  });

  it('falls back gracefully on invalid timezone name', () => {
    const formatted = formatDate(testDate, 'INVALID_TIMEZONE');
    expect(formatted).not.toBe('');
    expect(formatted).toContain('Jul');
  });
});
