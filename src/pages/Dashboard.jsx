import { useState, useEffect } from 'react';
import { useVaults } from '../hooks/useVaults.js';
import { usePositions } from '../hooks/usePositions.js';
import { useWallet } from '../hooks/useWallet.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import StatCard from '../components/StatCard';
import VaultCard from '../components/VaultCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { formatUsd, formatPercent, formatAmount, formatDate } from '../utils/format.js';
import { summarizePositions } from '../utils/positions.js';
import { useAppContext } from '../context/AppContext';

/**
 * Dashboard: protocol stats (TVL/APY), the user's aggregate position and
 * the list of available vaults.
 */
export default function Dashboard() {
  useDocumentTitle('Dashboard');
  const { vaults, stats, loading, error, reload } = useVaults();
  const { positions } = usePositions();
  const { isConnected } = useWallet();
  const { timezone } = useAppContext();

  const [lastUpdated, setLastUpdated] = useState(() => new Date());

  useEffect(() => {
    if (!loading && !error && vaults.length > 0) {
      setLastUpdated(new Date());
    }
  }, [loading, error, vaults.length]);

  const { totalValue, totalShares } = summarizePositions(positions);

  if (loading) return <Loader label="Loading vaults…" />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <div className="dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Dashboard</h1>
        <span className="muted text-xs">
          Last updated: {formatDate(lastUpdated, timezone)}
        </span>
      </div>

      <div className="stat-grid">
        <StatCard
          label="Total Value Locked"
          value={formatUsd(stats?.totalTvl ?? 0)}
          icon="🏦"
        />
        <StatCard
          label="Average APY"
          value={formatPercent(stats?.avgApy ?? 0)}
          icon="📈"
        />
        <StatCard
          label="Your Position"
          value={isConnected ? formatUsd(totalValue) : '—'}
          hint={isConnected ? undefined : 'Connect wallet to view'}
          icon="💼"
        />
        <StatCard
          label="Your Total Shares"
          value={isConnected ? formatAmount(totalShares, 2) : '—'}
          icon="🧾"
        />
      </div>

      <h2 className="section-title">Vaults</h2>
      <div className="vault-grid">
        {vaults.map((vault) => (
          <VaultCard key={vault.id} vault={vault} />
        ))}
      </div>
    </div>
  );
}
