import { Link } from 'react-router-dom';
import { usePositions } from '../hooks/usePositions.js';
import { useWallet } from '../hooks/useWallet.js';
import PositionRow from '../components/PositionRow.jsx';
import StatCard from '../components/StatCard.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import EmptyState from '../components/EmptyState.jsx';
import WalletButton from '../components/WalletButton.jsx';
import { formatUsd, formatAmount } from '../utils/format.js';

/**
 * Positions page: the user's open vault positions and total earned yield.
 */
export default function Positions() {
  const { isConnected } = useWallet();
  const { positions, loading, error, reload } = usePositions();

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

  const totalValue = positions.reduce((sum, p) => sum + p.value, 0);
  const totalEarned = positions.reduce((sum, p) => sum + p.earned, 0);

  return (
    <div className="positions">
      <h1 className="page-title">Your Positions</h1>

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
