import { createContext, useContext, useState, useCallback } from 'react';
import * as walletService from '../services/wallet.js';
import { NETWORKS, DEFAULT_NETWORK } from '../lib/networks.js';

/**
 * Global application context. Holds wallet connection state and balances,
 * plus the active Stellar network (testnet/mainnet), shared across pages.
 */
const AppContext = createContext(null);

const NETWORK_STORAGE_KEY = 'yieldvault:network';

function readInitialNetwork() {
  if (typeof window === 'undefined') return DEFAULT_NETWORK;
  const stored = window.localStorage.getItem(NETWORK_STORAGE_KEY);
  return stored === 'mainnet' || stored === 'testnet' ? stored : DEFAULT_NETWORK;
}

export function AppProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [balances, setBalances] = useState({});
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [network, setNetworkState] = useState(readInitialNetwork);

  const connect = useCallback(async () => {
    setConnecting(true);
    setError(null);
    try {
      const { address: addr } = await walletService.connect();
      const bal = await walletService.getBalances();
      setAddress(addr);
      setBalances(bal);
    } catch (err) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    await walletService.disconnect();
    setAddress(null);
    setBalances({});
  }, []);

  /** Switch the active network and persist the choice. */
  const setNetwork = useCallback((next) => {
    if (next !== 'mainnet' && next !== 'testnet') return;
    setNetworkState(next);
    window.localStorage.setItem(NETWORK_STORAGE_KEY, next);
  }, []);

  /** Flip between testnet and mainnet. */
  const toggleNetwork = useCallback(() => {
    setNetwork(network === 'mainnet' ? 'testnet' : 'mainnet');
  }, [network, setNetwork]);

  const value = {
    address,
    balances,
    connecting,
    error,
    isConnected: Boolean(address),
    connect,
    disconnect,
    network,
    networkConfig: NETWORKS[network],
    isMainnet: network === 'mainnet',
    setNetwork,
    toggleNetwork,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/** Access the app context. Throws if used outside the provider. */
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return ctx;
}

export default AppContext;
