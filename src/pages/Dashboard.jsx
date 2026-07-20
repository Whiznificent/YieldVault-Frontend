import { useVaults } from '../hooks/useVaults.js';
import { usePositions } from '../hooks/usePositions.js';
import { useWallet } from '../hooks/useWallet.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import StatCard from '../components/StatCard';
import VaultCard from '../components/VaultCard';
import VaultApyChart from '../components/VaultApyChart';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { formatUsd, formatPercent, formatAmount } from '../utils/format.js';
import { summarizePositions } from '../utils/positions.js';

/**
 * Dashboard: protocol stats (TVL/APY), the user's aggregate position and
 * the list of available vaults.
 */
export default function Dashboard() {
  useDocumentTitle('Dashboard');
  const { vaults, stats, loading, error, reload } = useVaults();
  const { positions } = usePositions();
  const { isConnected } = useWallet();

  const { totalValue, totalShares } = summarizePositions(positions);

  if (loading) return <Loader label="Loading vaults…" />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

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

      <h2 className="section-title">APY by vault</h2>
      <VaultApyChart vaults={vaults} />

      <h2 className="section-title">Vaults</h2>
      <div className="vault-grid">
        {vaults.map((vault) => (
          <VaultCard key={vault.id} vault={vault} />
        ))}
      </div>
    </div>
  );
}
