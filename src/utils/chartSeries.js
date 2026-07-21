/**
 * Pure helpers for building and scaling multi-series line chart data.
 * Kept separate from the chart component so the domain/scaling math is
 * unit-testable without rendering SVG.
 */

/** Palette cycled across series in order; kept small and legible on dark UI. */
const SERIES_COLORS = ['#6c5ce7', '#00d1b2', '#f1c40f', '#e74c3c', '#3498db'];

/**
 * Build chart series from a vault list and a map of per-vault APY history
 * (as returned by GET /api/vaults/:id/apy-history on YieldVault-Backend:
 * `{ date, apy }` entries, oldest first). One series per vault. `x` is the
 * point's index rather than a parsed date, since the history is always
 * evenly-spaced daily samples and an index keeps the chart's geometry
 * simple; `date` is carried through on each point for display (e.g. a
 * future tooltip) even though the chart itself doesn't plot by date.
 * @param {Array<{id: string, name: string}>} vaults
 * @param {Record<string, Array<{date: string, apy: number}>>} history - vaultId -> history entries, oldest first
 * @returns {Array<{id: string, label: string, color: string, points: Array<{x: number, y: number, date: string}>}>}
 */
export function buildApySeries(vaults, history) {
  return vaults.map((vault, index) => {
    const entries = history[vault.id] || [];
    return {
      id: vault.id,
      label: vault.name,
      color: SERIES_COLORS[index % SERIES_COLORS.length],
      points: entries.map((entry, x) => ({ x, y: entry.apy, date: entry.date })),
    };
  });
}

/**
 * Filter a series list down to the ones not present in `hiddenIds`.
 * @param {Array<{id: string}>} series
 * @param {Set<string>} hiddenIds
 * @returns {Array}
 */
export function visibleSeries(series, hiddenIds) {
  return series.filter((s) => !hiddenIds.has(s.id));
}

/**
 * Compute the x/y domain spanned by a set of series' points. Callers pass
 * only the series they want reflected in the domain (e.g. the currently
 * visible ones), so hiding a series shrinks the chart's scale instead of
 * leaving a stretched or empty-looking range sized for data that's no
 * longer shown.
 * @param {Array<{points: Array<{x: number, y: number}>}>} series
 * @returns {{minX: number, maxX: number, minY: number, maxY: number}}
 */
export function seriesDomain(series) {
  const allPoints = series.flatMap((s) => s.points);
  if (allPoints.length === 0) {
    return { minX: 0, maxX: 1, minY: 0, maxY: 1 };
  }

  const xs = allPoints.map((p) => p.x);
  const ys = allPoints.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  let minY = Math.min(...ys);
  let maxY = Math.max(...ys);

  // Guard a flat/single-point series so the scale isn't zero-height.
  if (minY === maxY) {
    minY -= 1;
    maxY += 1;
  }

  return { minX, maxX, minY, maxY };
}

/**
 * Map a series' points into SVG viewBox coordinates for the given domain and
 * viewport size. Y is flipped since SVG's origin is top-left.
 * @param {Array<{x: number, y: number}>} points
 * @param {{minX: number, maxX: number, minY: number, maxY: number}} domain
 * @param {number} width
 * @param {number} height
 * @returns {Array<{x: number, y: number}>}
 */
export function projectPoints(points, domain, width, height) {
  const { minX, maxX, minY, maxY } = domain;
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;

  return points.map((p) => ({
    x: ((p.x - minX) / spanX) * width,
    y: height - ((p.y - minY) / spanY) * height,
  }));
}

/**
 * Evenly-spaced tick values across [min, max], inclusive of both ends.
 * Used for Y-axis gridlines/labels. A single-value range (min === max,
 * already padded by seriesDomain so this shouldn't normally happen) still
 * returns `count` copies of that value rather than dividing by zero.
 * @param {number} min
 * @param {number} max
 * @param {number} [count=4]
 * @returns {number[]}
 */
export function axisTicks(min, max, count = 4) {
  if (count <= 1) return [min];
  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, i) => min + step * i);
}

/**
 * Pick evenly-spaced point indices to label on the X axis, so a series with
 * many points doesn't try to cram a label at every single one into a chart
 * a few hundred pixels wide.
 * @param {number} pointCount
 * @param {number} [count=4]
 * @returns {number[]} indices into a series' points array, deduplicated
 */
export function xAxisTickIndices(pointCount, count = 4) {
  if (pointCount <= 1) return pointCount === 1 ? [0] : [];
  const n = Math.min(count, pointCount);
  const step = (pointCount - 1) / (n - 1);
  const indices = Array.from({ length: n }, (_, i) => Math.round(step * i));
  return [...new Set(indices)];
}
