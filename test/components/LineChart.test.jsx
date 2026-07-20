import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LineChart from '../../src/components/LineChart.tsx';

const series = [
  {
    id: 'a',
    label: 'Vault A',
    color: '#111',
    points: [
      { x: 0, y: 10 },
      { x: 1, y: 20 },
    ],
  },
  {
    id: 'b',
    label: 'Vault B',
    color: '#222',
    points: [
      { x: 0, y: 100 },
      { x: 1, y: 200 },
    ],
  },
];

describe('LineChart', () => {
  it('renders a polyline for every visible series', () => {
    const { container } = render(<LineChart series={series} hiddenIds={new Set()} />);
    expect(container.querySelectorAll('polyline.chart-line')).toHaveLength(2);
  });

  it('omits the polyline for a hidden series', () => {
    const { container } = render(
      <LineChart series={series} hiddenIds={new Set(['b'])} />,
    );
    const lines = container.querySelectorAll('polyline.chart-line');
    expect(lines).toHaveLength(1);
    expect(lines[0].getAttribute('stroke')).toBe('#111');
  });

  it('shows an empty state when every series is hidden', () => {
    render(<LineChart series={series} hiddenIds={new Set(['a', 'b'])} />);
    expect(screen.getByText(/No series selected/i)).toBeInTheDocument();
  });

  it('rescales the axis labels to only the visible series after one is hidden', () => {
    // With both series visible, the max Y is 200 (from Vault B).
    const both = render(<LineChart series={series} hiddenIds={new Set()} formatY={(v) => String(v)} />);
    expect(both.getByText('200')).toBeInTheDocument();
    both.unmount();

    // With Vault B hidden, the domain should shrink to Vault A's own
    // range, so the max label becomes 20, not the stale 200.
    render(<LineChart series={series} hiddenIds={new Set(['b'])} formatY={(v) => String(v)} />);
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.queryByText('200')).not.toBeInTheDocument();
  });

  it('sets an accessible label naming only the visible series', () => {
    render(<LineChart series={series} hiddenIds={new Set(['b'])} />);
    expect(screen.getByRole('img', { name: /Line chart of Vault A/i })).toBeInTheDocument();
  });
});
