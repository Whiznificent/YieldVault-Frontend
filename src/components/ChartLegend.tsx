import type { ChartSeries } from './LineChart';

interface ChartLegendProps {
  series: ChartSeries[];
  hiddenIds: Set<string>;
  onToggle: (id: string) => void;
}

/**
 * Clickable legend for a LineChart. Each item toggles its series on/off;
 * `aria-pressed` reflects whether the series is currently shown, and hidden
 * series get a dimmed, struck-through swatch/label so the state reads
 * clearly without relying on color alone.
 */
export default function ChartLegend({ series, hiddenIds, onToggle }: ChartLegendProps) {
  return (
    <div className="chart-legend" role="group" aria-label="Toggle chart series">
      {series.map((s) => {
        const hidden = hiddenIds.has(s.id);
        return (
          <button
            key={s.id}
            type="button"
            className={hidden ? 'chart-legend-item chart-legend-item-hidden' : 'chart-legend-item'}
            aria-pressed={!hidden}
            onClick={() => onToggle(s.id)}
          >
            <span
              className="chart-legend-swatch"
              style={{ background: hidden ? 'transparent' : s.color, borderColor: s.color }}
              aria-hidden="true"
            />
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
