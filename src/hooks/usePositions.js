import { useState, useEffect, useCallback } from 'react';
import * as vaultService from '../services/vault.js';
import { useWallet } from './useWallet.js';

/**
 * Load the connected user's vault positions. Returns an empty list when
 * the wallet is not connected.
 * @returns {{ positions: Array, loading: boolean, error: string|null, lastUpdated: Date|null, reload: () => void }}
 */
export function usePositions() {
  const { isConnected } = useWallet();
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const load = useCallback(async () => {
    if (!isConnected) {
      setPositions([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await vaultService.getPositions();
      setPositions(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to load positions');
    } finally {
      setLoading(false);
    }
  }, [isConnected]);

  useEffect(() => {
    load();
  }, [load]);

  return { positions, loading, error, lastUpdated, reload: load };
}

export default usePositions;
