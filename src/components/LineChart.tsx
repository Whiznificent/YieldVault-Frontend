import {
  seriesDomain,
  visibleSeries,
  projectPoints,
  axisTicks,
  xAxisTickIndices,
} from '../utils/chartSeries.js';

/**
 * A single line chart series. `points` are in data space (x/y), not pixels.
 */
export interface ChartSeries {
  id: string;
  label: string;
  color: string;
  points: { x: number; y: number; date?: string }[];
}

interface LineChartProps {
  /** All series known to the chart. */
  series: ChartSeries[];
  /** Ids of series currently hidden (toggled off via the legend). */
  hiddenIds: Set<string>;
  width?: number;
  height?: number;
  /** Format a Y-axis value for display, e.g. as currency or a percentage. */
  formatY?: (value: number) => string;
  /** Show tick gridlines and axis labels for both axes. */
  showGrid?: boolean;
}

const MARGIN = { top: 10, right: 10, bottom: 22, left: 48 };

function formatTickDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  // History dates are calendar dates (e.g. "2026-07-18"), which Date parses
  // as UTC midnight. Format in UTC too, otherwise a viewer behind UTC would
  // see it roll back to the previous day.
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

/**
 * Multi-series SVG line chart. Only series not present in `hiddenIds` are
 * drawn, and the axis scale is computed from those visible series alone, so
 * hiding a series re-scales the chart to whatever remains instead of
 * leaving a stretched or empty-looking range sized for hidden data.
 *
 * `showGrid` toggles faint reference gridlines with tick labels on both
 * axes, letting a reader trace a point back to its approximate value/date
 * without the lines being on by default and competing with the data.
 */
export default function LineChart({
  series,
  hiddenIds,
  width = 640,
  height = 220,
  formatY = (v) => String(v),
  showGrid = false,
}: LineChartProps) {
  const visible = visibleSeries(series, hiddenIds);

  if (visible.length === 0) {
    return (
      <div className="chart-empty" role="img" aria-label="No chart series selected">
        No series selected. Use the legend below to show one.
      </div>
    );
  }

  const domain = seriesDomain(visible);
  const plotWidth = width - MARGIN.left - MARGIN.right;
  const plotHeight = height - MARGIN.top - MARGIN.bottom;

  const yTicks = axisTicks(domain.minY, domain.maxY, 4);
  // Use the series with the most points as the reference for X tick dates;
  // visible series can have gaps, and this gives the best label coverage.
  const referenceSeries = visible.reduce((longest, s) =>
    s.points.length > longest.points.length ? s : longest,
  );
  const xTickIndices = xAxisTickIndices(referenceSeries.points.length);

  return (
    <svg
      className="chart"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Line chart of ${visible.map((s) => s.label).join(', ')}`}
    >
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        {showGrid &&
          yTicks.map((tick) => {
            const [{ y }] = projectPoints([{ x: domain.minX, y: tick }], domain, plotWidth, plotHeight);
            return (
              <g key={`y-${tick}`}>
                <line
                  className="chart-gridline"
                  x1={0}
                  y1={y}
                  x2={plotWidth}
                  y2={y}
                />
                <text className="chart-tick-label" x={-6} y={y} textAnchor="end" dominantBaseline="middle">
                  {formatY(tick)}
                </text>
              </g>
            );
          })}

        {showGrid &&
          xTickIndices.map((index) => {
            const point = referenceSeries.points[index];
            if (!point) return null;
            const [{ x }] = projectPoints([{ x: point.x, y: domain.minY }], domain, plotWidth, plotHeight);
            return (
              <g key={`x-${index}`}>
                <line
                  className="chart-gridline"
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={plotHeight}
                />
                <text className="chart-tick-label" x={x} y={plotHeight + 16} textAnchor="middle">
                  {formatTickDate(point.date)}
                </text>
              </g>
            );
          })}

        <line className="chart-axis" x1={0} y1={plotHeight} x2={plotWidth} y2={plotHeight} />

        {visible.map((s) => {
          const projected = projectPoints(s.points, domain, plotWidth, plotHeight);
          const path = projected.map((p) => `${p.x},${p.y}`).join(' ');
          return (
            <polyline
              key={s.id}
              className="chart-line"
              points={path}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
            />
          );
        })}
      </g>
    </svg>
  );
}
