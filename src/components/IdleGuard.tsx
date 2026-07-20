import SessionTimeoutModal from './SessionTimeoutModal';
import { useIdleTimer } from '../hooks/useIdleTimer.js';
import { useWallet } from '../hooks/useWallet.js';

/**
 * Watches for user inactivity while the wallet is connected. Shows a
 * countdown warning 1 minute before auto-disconnecting after 15 minutes.
 */
export default function IdleGuard() {
  const { isConnected, disconnect } = useWallet();
  const { remainingTime, isWarning, resetTimer } = useIdleTimer({
    enabled: isConnected,
    onIdle: disconnect,
  });

  const remainingSeconds = Math.ceil(remainingTime / 1000);

  return (
    <SessionTimeoutModal
      open={isWarning && isConnected}
      remainingSeconds={remainingSeconds}
      onStay={resetTimer}
    />
  );
}
