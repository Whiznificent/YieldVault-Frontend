import { render, screen, within, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Compare from './Compare';

// Mock the hooks that Compare depends on
vi.mock('../hooks/useVaults.js', () => ({
  useVaults: () => ({
    vaults: [
      {
        id: 'usdc-vault',
        name: 'USDC Yield Vault',
        asset: 'USDC',
        apy: 0.0842,
        tvl: 4_820_000,
        totalAssets: 4_820_000,
        totalShares: 4_600_000,
        strategy: 'Lends USDC across Soroban money markets.',
        risk: 'Low',
      },
      {
        id: 'xlm-vault',
        name: 'XLM Yield Vault',
        asset: 'XLM',
        apy: 0.1135,
        tvl: 1_240_000,
        totalAssets: 1_240_000,
        totalShares: 1_180_000,
        strategy: 'Provides XLM liquidity to AMM pools.',
        risk: 'Medium',
      },
      {
        id: 'eurc-vault',
        name: 'EURC Yield Vault',
        asset: 'EURC',
        apy: 0.0671,
        tvl: 760_000,
        totalAssets: 760_000,
        totalShares: 745_000,
        strategy: 'Conservative EURC lending strategy.',
        risk: 'Low',
      },
    ],
    stats: null,
    loading: false,
    error: null,
    reload: vi.fn(),
  }),
}));

vi.mock('../hooks/useDocumentTitle.js', () => ({
  useDocumentTitle: vi.fn(),
}));

describe('Compare page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderCompare() {
    return render(
      <MemoryRouter>
        <Compare />
      </MemoryRouter>,
    );
  }

  /** Helper: click the vault selector chip by name, scoped to the chip area. */
  function clickChip(name) {
    const chips = screen.getByText(name, { selector: '.compare-chip-name' }).closest('button');
    fireEvent.click(chips);
  }

  it('renders the page title', () => {
    renderCompare();
    expect(screen.getByText('Compare Vaults')).toBeInTheDocument();
  });

  it('shows vault selector chips for each vault', () => {
    renderCompare();
    expect(screen.getByText('USDC Yield Vault')).toBeInTheDocument();
    expect(screen.getByText('XLM Yield Vault')).toBeInTheDocument();
    expect(screen.getByText('EURC Yield Vault')).toBeInTheDocument();
  });

  it('shows an empty state when no vaults are selected', () => {
    renderCompare();
    expect(
      screen.getByText(/Select at least 2 vaults to start comparing/),
    ).toBeInTheDocument();
  });

  it('shows an incomplete message when only 1 vault is selected', () => {
    renderCompare();
    clickChip('USDC Yield Vault');
    expect(
      screen.getByText(/Add at least 1 more vault to see a comparison/),
    ).toBeInTheDocument();
  });

  it('shows comparison table when 2 vaults are selected', () => {
    renderCompare();
    clickChip('USDC Yield Vault');
    clickChip('XLM Yield Vault');

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    expect(within(table).getByText('USDC Yield Vault')).toBeInTheDocument();
    expect(within(table).getByText('XLM Yield Vault')).toBeInTheDocument();
  });

  it('highlights the best APY', () => {
    renderCompare();
    clickChip('USDC Yield Vault');
    clickChip('XLM Yield Vault');

    // XLM has higher APY, at least one cell should be highlighted
    const bestCells = document.querySelectorAll('.compare-best');
    expect(bestCells.length).toBeGreaterThan(0);
  });

  it('shows a back link to dashboard', () => {
    renderCompare();
    const backLink = screen.getByText('← Back to dashboard');
    expect(backLink).toHaveAttribute('href', '/dashboard');
  });

  it('disables selection when max vaults (3) are reached', () => {
    renderCompare();
    clickChip('USDC Yield Vault');
    clickChip('XLM Yield Vault');
    clickChip('EURC Yield Vault');

    const selectedChips = document.querySelectorAll('.compare-chip-active');
    expect(selectedChips.length).toBe(3);
  });

  it('removes a vault when clicking an active chip', () => {
    renderCompare();
    clickChip('USDC Yield Vault');
    clickChip('XLM Yield Vault');

    // Click USDC again to remove it — back to 1 selected
    clickChip('USDC Yield Vault');
    expect(
      screen.getByText(/Add at least 1 more vault/),
    ).toBeInTheDocument();
  });
});
