import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { AppProvider } from '../../src/context/AppContext.jsx';
import NetworkToggle from '../../src/components/NetworkToggle';

function setup() {
  return render(
    <AppProvider>
      <NetworkToggle />
    </AppProvider>
  );
}

describe('NetworkToggle', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders both testnet and mainnet options', () => {
    setup();
    expect(screen.getByRole('button', { name: /testnet/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mainnet/i })).toBeInTheDocument();
  });

  it('defaults to testnet', () => {
    setup();
    expect(screen.getByRole('button', { name: /testnet/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.queryByText(/real funds/i)).not.toBeInTheDocument();
  });

  it('switches to mainnet on click and shows the real-funds warning', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /mainnet/i }));

    expect(screen.getByRole('button', { name: /mainnet/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: /testnet/i })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
    expect(screen.getByText(/real funds/i)).toBeInTheDocument();
  });

  it('persists the selected network to localStorage', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /mainnet/i }));
    expect(window.localStorage.getItem('yieldvault:network')).toBe('mainnet');
  });

  it('restores the persisted network on next mount', () => {
    window.localStorage.setItem('yieldvault:network', 'mainnet');
    setup();
    expect(screen.getByRole('button', { name: /mainnet/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByText(/real funds/i)).toBeInTheDocument();
  });
});
