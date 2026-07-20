import { Link } from 'react-router-dom';
import { formatAmount, formatShares } from '../utils/format.js';
import { getAssetByCode } from '../constants/assets.js';

/**
 * One row in the positions list, showing shares, value and earned yield.
 */

interface Position {
  vaultId: string;
  asset: string;
  shares: number;
  value: number;
  earned: number;
}

interface PositionRowProps {
  position: Position;
}

export default function PositionRow({ position }: PositionRowProps) {
  const asset = getAssetByCode(position.asset);
  const positive = position.earned >= 0;

  return (
    <Link to={`/vault/${position.vaultId}`} className="position-row resizable-table-row">
      <div className="position-asset">
        <span className="position-icon">{asset.icon}</span>
        <span>{position.asset}</span>
      </div>
      <div className="position-cell">
        <span className="muted">Shares</span>
        <span>{formatShares(position.shares, 2)}</span>
      </div>
      <div className="position-cell">
        <span className="muted">Value</span>
        <span>{formatAmount(position.value, 2)}</span>
      </div>
      <div className="position-cell">
        <span className="muted">Earned</span>
        <span className={positive ? 'gain' : 'loss'}>
          {positive ? '+' : ''}
          {formatAmount(position.earned, 2)}
        </span>
      </div>
    </Link>
  );
}
