import { useAppContext } from '../context/AppContext';

/**
 * Convenience hook exposing wallet state and actions from AppContext.
 * @returns {{
 *   address: string|null,
 *   balances: Record<string, number>,
 *   connecting: boolean,
 *   error: string|null,
 *   walletNetwork: string|null,
 *   isConnected: boolean,
 *   connect: () => Promise<void>,
 *   disconnect: () => Promise<void>,
 *   balanceOf: (asset: string) => number,
 * }}
 */
export function useWallet() {
  const ctx = useAppContext();

  /** Balance for a single asset code, defaulting to 0. */
  const balanceOf = (asset) => ctx.balances[asset] ?? 0;

  return { ...ctx, balanceOf };
}

export default useWallet;
