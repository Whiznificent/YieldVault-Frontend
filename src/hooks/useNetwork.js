import { useAppContext } from '../context/AppContext';

/**
 * Convenience hook exposing the active network and switcher from AppContext.
 * @returns {{
 *   network: 'testnet'|'mainnet',
 *   networkConfig: { id: string, label: string, networkPassphrase: string, horizonUrl: string, sorobanRpcUrl: string },
 *   isMainnet: boolean,
 *   setNetwork: (next: 'testnet'|'mainnet') => void,
 *   toggleNetwork: () => void,
 * }}
 */
export function useNetwork() {
  const { network, networkConfig, isMainnet, setNetwork, toggleNetwork } = useAppContext();
  return { network, networkConfig, isMainnet, setNetwork, toggleNetwork };
}

export default useNetwork;
