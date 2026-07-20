import { useNetwork } from '../hooks/useNetwork.js';

/**
 * Testnet/mainnet switcher for the navbar. Reuses the app's existing
 * segmented-tab styling (the same classes as the Deposit/Withdraw toggle
 * on the vault detail page) so it looks native next to the rest of the nav.
 */
export default function NetworkToggle() {
  const { network, isMainnet, setNetwork } = useNetwork();

  return (
    <div className="network-toggle">
      <div className="tabs" role="group" aria-label="Network">
        <button
          type="button"
          className={network === 'testnet' ? 'tab tab-active' : 'tab'}
          aria-pressed={network === 'testnet'}
          onClick={() => setNetwork('testnet')}
        >
          Testnet
        </button>
        <button
          type="button"
          className={network === 'mainnet' ? 'tab tab-active' : 'tab'}
          aria-pressed={network === 'mainnet'}
          onClick={() => setNetwork('mainnet')}
        >
          Mainnet
        </button>
      </div>
      {isMainnet && <span className="tag tag-warning network-toggle-warning">Real funds</span>}
    </div>
  );
}
