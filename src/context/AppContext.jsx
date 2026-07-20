import { createContext, useContext, useState, useCallback } from 'react';
import * as walletService from '../services/wallet.js';

/**
 * Global application context. Holds wallet connection state and balances,
 * shared across pages so the wallet only connects once.
 */
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [balances, setBalances] = useState({});
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [walletNetwork, setWalletNetwork] = useState(null);

  const connect = useCallback(async () => {
    setConnecting(true);
    setError(null);
    try {
      const { address: addr } = await walletService.connect();
      const bal = await walletService.getBalances();
      const network = await walletService.getNetwork();
      setAddress(addr);
      setBalances(bal);
      setWalletNetwork(network);
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
    setWalletNetwork(null);
  }, []);

  const value = {
    address,
    balances,
    connecting,
    error,
    walletNetwork,
    isConnected: Boolean(address),
    connect,
    disconnect,
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
