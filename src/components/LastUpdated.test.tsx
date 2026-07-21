import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LastUpdated from './LastUpdated';

describe('LastUpdated', () => {
  it('does not render until data has loaded', () => {
    const { container } = render(<LastUpdated timestamp={null} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders an accessible timestamp for the latest successful load', () => {
    const timestamp = new Date('2026-07-20T14:05:00.000Z');
    render(<LastUpdated timestamp={timestamp} />);

    const time = screen.getByText(/last updated:/i);
    expect(time).toHaveAttribute('dateTime', timestamp.toISOString());
    expect(time).toHaveAttribute('title', timestamp.toLocaleString());
  });
});
