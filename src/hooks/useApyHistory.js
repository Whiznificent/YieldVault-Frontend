import { useState, useEffect, useCallback } from 'react';
import * as vaultService from '../services/vault.js';

/**
 * Load APY history for a set of vaults, one fetch per vault (mirroring
 * YieldVault-Backend's per-vault GET /api/vaults/:id/apy-history endpoint,
 * as opposed to a single combined call), and aggregate into a
 * vaultId -> history map.
 * @param {Array<{id: string}>} vaults
 * @returns {{
 *   history: Record<string, Array<{date: string, apy: number}>>,
 *   loading: boolean,
 *   error: string|null,
 *   reload: () => void,
 * }}
 */
export function useApyHistory(vaults) {
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (vaults.length === 0) {
      setHistory({});
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(
        vaults.map((vault) => vaultService.getVaultApyHistory(vault.id)),
      );
      const byVault = {};
      for (const result of results) {
        byVault[result.vaultId] = result.history;
      }
      setHistory(byVault);
    } catch (err) {
      setError(err.message || 'Failed to load APY history');
    } finally {
      setLoading(false);
    }
    // vaults is refetched by identity; callers should memoize/stabilize the
    // array they pass in (e.g. from a hook's own state) to avoid refetch loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaults]);

  useEffect(() => {
    load();
  }, [load]);

  return { history, loading, error, reload: load };
}

export default useApyHistory;
