import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChartLegend from '../../src/components/ChartLegend.tsx';

const series = [
  { id: 'a', label: 'Vault A', color: '#111', points: [] },
  { id: 'b', label: 'Vault B', color: '#222', points: [] },
];

describe('ChartLegend', () => {
  it('renders one button per series with its label', () => {
    render(<ChartLegend series={series} hiddenIds={new Set()} onToggle={() => {}} />);
    expect(screen.getByRole('button', { name: 'Vault A' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Vault B' })).toBeInTheDocument();
  });

  it('marks a shown series as aria-pressed=true and a hidden one as false', () => {
    render(
      <ChartLegend series={series} hiddenIds={new Set(['b'])} onToggle={() => {}} />,
    );
    expect(screen.getByRole('button', { name: 'Vault A' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Vault B' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('calls onToggle with the clicked series id', () => {
    const onToggle = vi.fn();
    render(<ChartLegend series={series} hiddenIds={new Set()} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('button', { name: 'Vault A' }));
    expect(onToggle).toHaveBeenCalledWith('a');
  });

  it('applies the hidden styling class only to hidden series', () => {
    render(
      <ChartLegend series={series} hiddenIds={new Set(['b'])} onToggle={() => {}} />,
    );
    expect(screen.getByRole('button', { name: 'Vault A' }).className).not.toMatch(
      /chart-legend-item-hidden/,
    );
    expect(screen.getByRole('button', { name: 'Vault B' }).className).toMatch(
      /chart-legend-item-hidden/,
    );
  });
});
