import { useWallet } from '../hooks/useWallet.js';
import { CONFIG } from '../constants/config';
import Alert from './Alert';

/**
 * Network warning banner that displays when the wallet is connected to a different
 * network than the app is configured for. This helps prevent users from interacting
 * with the wrong network (e.g., using mainnet funds on testnet or vice versa).
 */
export default function NetworkWarning() {
  const { walletNetwork, isConnected } = useWallet();

  // Don't show if wallet is not connected or networks match
  if (!isConnected || !walletNetwork || walletNetwork === CONFIG.network) {
    return null;
  }

  return (
    <div className="network-warning" role="alert" aria-live="polite">
      <Alert variant="warning" title="Wrong Network">
        Your wallet is connected to <strong>{walletNetwork}</strong>, but this app
        is configured for <strong>{CONFIG.network}</strong>. Please switch your wallet
        network to continue.
      </Alert>
    </div>
  );
}
