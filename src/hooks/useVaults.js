import { useState, useEffect, useCallback } from 'react';
import * as vaultService from '../services/vault.js';

/**
 * Load all vaults plus protocol-wide stats with loading/error handling.
 * @returns {{
 *   vaults: Array,
 *   stats: object|null,
 *   loading: boolean,
 *   error: string|null,
 *   lastUpdated: Date|null,
 *   reload: () => void,
 * }}
 */
export function useVaults() {
  const [vaults, setVaults] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [list, protocolStats] = await Promise.all([
        vaultService.listVaults(),
        vaultService.getProtocolStats(),
      ]);
      setVaults(list);
      setStats(protocolStats);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to load vaults');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { vaults, stats, loading, error, lastUpdated, reload: load };
}

export default useVaults;
