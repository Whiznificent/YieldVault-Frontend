import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EnvironmentBanner from '../../src/components/EnvironmentBanner';

describe('EnvironmentBanner', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('renders banner when network is testnet', () => {
    vi.mock('../../src/constants/config', () => ({
      CONFIG: {
        network: 'testnet',
        rpcUrl: 'https://soroban-testnet.stellar.org',
        vaultContract: 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC',
        appName: 'YieldVault',
        mockLatency: 600,
      },
    }));

    render(<EnvironmentBanner />);
    expect(screen.getByText('⚠️ Testnet Environment')).toBeInTheDocument();
  });

  it('has correct banner role and aria-label', () => {
    vi.mock('../../src/constants/config', () => ({
      CONFIG: {
        network: 'testnet',
        rpcUrl: 'https://soroban-testnet.stellar.org',
        vaultContract: 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC',
        appName: 'YieldVault',
        mockLatency: 600,
      },
    }));

    render(<EnvironmentBanner />);
    const banner = screen.getByRole('banner');
    expect(banner).toHaveAttribute('aria-label', 'Testnet environment');
  });

  it('does not render when network is mainnet', () => {
    vi.mock('../../src/constants/config', () => ({
      CONFIG: {
        network: 'mainnet',
        rpcUrl: 'https://soroban-testnet.stellar.org',
        vaultContract: 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC',
        appName: 'YieldVault',
        mockLatency: 600,
      },
    }));

    const { container } = render(<EnvironmentBanner />);
    expect(container.firstChild).toBeNull();
  });
});
