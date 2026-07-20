import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePositions } from '../hooks/usePositions.js';
import { useWallet } from '../hooks/useWallet.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import PositionRow from '../components/PositionRow';
import StatCard from '../components/StatCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import WalletButton from '../components/WalletButton';
import { formatUsd, formatAmount, formatDate } from '../utils/format.js';
import { summarizePositions } from '../utils/positions.js';
import { useAppContext } from '../context/AppContext';

/**
 * Positions page: the user's open vault positions and total earned yield.
 */
export default function Positions() {
  useDocumentTitle('Positions');
  const { isConnected } = useWallet();
  const { positions, loading, error, reload } = usePositions();
  const { timezone } = useAppContext();

  const [lastUpdated, setLastUpdated] = useState(() => new Date());

  useEffect(() => {
    if (!loading && !error && positions.length > 0) {
      setLastUpdated(new Date());
    }
  }, [loading, error, positions.length]);

  if (!isConnected) {
    return (
      <EmptyState
        icon="🔌"
        title="Connect your wallet"
        message="Connect a wallet to see your vault positions and earned yield."
        action={<WalletButton />}
      />
    );
  }

  if (loading) return <Loader label="Loading positions…" />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  if (positions.length === 0) {
    return (
      <EmptyState
        icon="🌱"
        title="No positions yet"
        message="Deposit into a vault to start earning yield."
        action={
          <Link to="/dashboard" className="btn btn-primary">
            Browse vaults
          </Link>
        }
      />
    );
  }

  const { totalValue, totalEarned } = summarizePositions(positions);

  return (
    <div className="positions">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Your Positions</h1>
        <span className="muted text-xs">
          Last updated: {formatDate(lastUpdated, timezone)}
        </span>
      </div>

      <div className="stat-grid">
        <StatCard label="Total Value" value={formatUsd(totalValue)} icon="💼" />
        <StatCard
          label="Total Earned"
          value={`+${formatAmount(totalEarned)}`}
          icon="✨"
        />
        <StatCard label="Open Positions" value={positions.length} icon="📑" />
      </div>

      <div className="position-list">
        {positions.map((position) => (
          <PositionRow key={position.vaultId} position={position} />
        ))}
      </div>
    </div>
  );
}
