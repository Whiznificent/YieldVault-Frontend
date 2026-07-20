import { seriesDomain, visibleSeries, projectPoints } from '../utils/chartSeries.js';

/**
 * A single line chart series. `points` are in data space (x/y), not pixels.
 */
export interface ChartSeries {
  id: string;
  label: string;
  color: string;
  points: { x: number; y: number }[];
}

interface LineChartProps {
  /** All series known to the chart. */
  series: ChartSeries[];
  /** Ids of series currently hidden (toggled off via the legend). */
  hiddenIds: Set<string>;
  width?: number;
  height?: number;
  /** Format a Y-axis value for display, e.g. as currency. */
  formatY?: (value: number) => string;
}

/**
 * Multi-series SVG line chart. Only series not present in `hiddenIds` are
 * drawn, and the axis scale is computed from those visible series alone, so
 * hiding a series re-scales the chart to whatever remains instead of
 * leaving a stretched or empty-looking range sized for hidden data.
 */
export default function LineChart({
  series,
  hiddenIds,
  width = 640,
  height = 220,
  formatY = (v) => String(v),
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

  return (
    <svg
      className="chart"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Line chart of ${visible.map((s) => s.label).join(', ')}`}
    >
      <line
        className="chart-axis"
        x1={0}
        y1={height - 0.5}
        x2={width}
        y2={height - 0.5}
      />
      <text className="chart-axis-label" x={4} y={12}>
        {formatY(domain.maxY)}
      </text>
      <text className="chart-axis-label" x={4} y={height - 4}>
        {formatY(domain.minY)}
      </text>
      {visible.map((s) => {
        const projected = projectPoints(s.points, domain, width, height);
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
    </svg>
  );
}
