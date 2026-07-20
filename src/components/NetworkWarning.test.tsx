import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NetworkWarning from './NetworkWarning';

// Mock the useWallet hook
vi.mock('../hooks/useWallet.js', () => ({
  useWallet: vi.fn(),
}));

import { useWallet } from '../hooks/useWallet.js';

// Mock the CONFIG
vi.mock('../constants/config', () => ({
  CONFIG: {
    network: 'testnet',
  },
}));

describe('NetworkWarning', () => {
  it('does not render when wallet is not connected', () => {
    vi.mocked(useWallet).mockReturnValue({
      isConnected: false,
      walletNetwork: null,
    });

    const { container } = render(<NetworkWarning />);
    expect(container.firstChild).toBeNull();
  });

  it('does not render when networks match', () => {
    vi.mocked(useWallet).mockReturnValue({
      isConnected: true,
      walletNetwork: 'testnet',
    });

    const { container } = render(<NetworkWarning />);
    expect(container.firstChild).toBeNull();
  });

  it('renders warning when networks do not match', () => {
    vi.mocked(useWallet).mockReturnValue({
      isConnected: true,
      walletNetwork: 'mainnet',
    });

    render(<NetworkWarning />);
    expect(screen.getByText('Wrong Network')).toBeInTheDocument();
    expect(screen.getByText(/mainnet/)).toBeInTheDocument();
    expect(screen.getByText(/testnet/)).toBeInTheDocument();
  });

  it('renders warning with correct message structure', () => {
    vi.mocked(useWallet).mockReturnValue({
      isConnected: true,
      walletNetwork: 'mainnet',
    });

    render(<NetworkWarning />);
    expect(screen.getByText(/Your wallet is connected to/)).toBeInTheDocument();
    expect(screen.getByText(/but this app is configured for/)).toBeInTheDocument();
    expect(screen.getByText(/Please switch your wallet network to continue/)).toBeInTheDocument();
  });
});
