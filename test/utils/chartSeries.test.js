import { describe, it, expect } from 'vitest';
import {
  buildApySeries,
  visibleSeries,
  seriesDomain,
  projectPoints,
  axisTicks,
  xAxisTickIndices,
} from '../../src/utils/chartSeries.js';

const vaults = [
  { id: 'a', name: 'Vault A' },
  { id: 'b', name: 'Vault B' },
];

// Shaped like YieldVault-Backend's GET /api/vaults/:id/apy-history response
// entries ({ date, apy }), not raw numbers.
const history = {
  a: [
    { date: '2026-07-18', apy: 10 },
    { date: '2026-07-19', apy: 20 },
    { date: '2026-07-20', apy: 30 },
  ],
  b: [
    { date: '2026-07-18', apy: 100 },
    { date: '2026-07-19', apy: 150 },
    { date: '2026-07-20', apy: 90 },
  ],
};

describe('buildApySeries', () => {
  it('builds one series per vault with indexed points carrying the date through', () => {
    const series = buildApySeries(vaults, history);
    expect(series).toHaveLength(2);
    expect(series[0]).toMatchObject({
      id: 'a',
      label: 'Vault A',
      points: [
        { x: 0, y: 10, date: '2026-07-18' },
        { x: 1, y: 20, date: '2026-07-19' },
        { x: 2, y: 30, date: '2026-07-20' },
      ],
    });
  });

  it('assigns each series a distinct color', () => {
    const series = buildApySeries(vaults, history);
    expect(series[0].color).not.toBe(series[1].color);
  });

  it('defaults to an empty points array for a vault missing from history', () => {
    const series = buildApySeries([{ id: 'missing', name: 'Missing' }], history);
    expect(series[0].points).toEqual([]);
  });
});

describe('visibleSeries', () => {
  it('excludes series whose id is in hiddenIds', () => {
    const series = buildApySeries(vaults, history);
    const result = visibleSeries(series, new Set(['a']));
    expect(result.map((s) => s.id)).toEqual(['b']);
  });

  it('returns everything when nothing is hidden', () => {
    const series = buildApySeries(vaults, history);
    expect(visibleSeries(series, new Set())).toHaveLength(2);
  });
});

describe('seriesDomain', () => {
  it('spans the min/max of all provided series', () => {
    const series = buildApySeries(vaults, history);
    expect(seriesDomain(series)).toEqual({ minX: 0, maxX: 2, minY: 10, maxY: 150 });
  });

  it('shrinks to match only the series actually passed in, e.g. after hiding one', () => {
    const series = buildApySeries(vaults, history);
    const onlyA = visibleSeries(series, new Set(['b']));
    // Without vault B, the domain should reflect only vault A's 10-30 range,
    // not the original 10-150 -- this is the "recalculates when a series is
    // hidden" behavior the chart depends on.
    expect(seriesDomain(onlyA)).toEqual({ minX: 0, maxX: 2, minY: 10, maxY: 30 });
  });

  it('falls back to a default domain when there are no points at all', () => {
    expect(seriesDomain([])).toEqual({ minX: 0, maxX: 1, minY: 0, maxY: 1 });
  });

  it('pads a flat series so the Y span is never zero', () => {
    const flat = [{ points: [{ x: 0, y: 5 }, { x: 1, y: 5 }] }];
    const domain = seriesDomain(flat);
    expect(domain.minY).toBeLessThan(5);
    expect(domain.maxY).toBeGreaterThan(5);
  });
});

describe('projectPoints', () => {
  it('maps data points into the pixel viewport, flipping Y', () => {
    const domain = { minX: 0, maxX: 10, minY: 0, maxY: 100 };
    const projected = projectPoints([{ x: 0, y: 0 }, { x: 10, y: 100 }], domain, 200, 50);
    // x=0,y=0 (bottom-left in data space) -> pixel (0, height)
    expect(projected[0]).toEqual({ x: 0, y: 50 });
    // x=10,y=100 (top-right in data space) -> pixel (width, 0)
    expect(projected[1]).toEqual({ x: 200, y: 0 });
  });
});

describe('axisTicks', () => {
  it('splits a range into count evenly-spaced values, inclusive of both ends', () => {
    expect(axisTicks(0, 30, 4)).toEqual([0, 10, 20, 30]);
  });

  it('defaults to 4 ticks', () => {
    expect(axisTicks(0, 9)).toHaveLength(4);
  });

  it('returns just the min for a count of 1', () => {
    expect(axisTicks(5, 25, 1)).toEqual([5]);
  });
});

describe('xAxisTickIndices', () => {
  it('spreads indices evenly across the point count, including first and last', () => {
    const indices = xAxisTickIndices(14, 4);
    expect(indices[0]).toBe(0);
    expect(indices[indices.length - 1]).toBe(13);
    expect(indices.length).toBeLessThanOrEqual(4);
  });

  it('never returns more indices than there are points', () => {
    expect(xAxisTickIndices(2, 4)).toEqual([0, 1]);
  });

  it('returns a single index for a single-point series', () => {
    expect(xAxisTickIndices(1, 4)).toEqual([0]);
  });

  it('returns nothing for an empty series', () => {
    expect(xAxisTickIndices(0, 4)).toEqual([]);
  });

  it('deduplicates indices that round to the same value', () => {
    const indices = xAxisTickIndices(3, 10);
    expect(new Set(indices).size).toBe(indices.length);
  });
});
