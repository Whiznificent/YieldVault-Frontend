import { useEffect, useRef } from 'react';
import Modal from './Modal';
import Button from './Button';

interface SessionTimeoutModalProps {
  open: boolean;
  remainingSeconds: number;
  onStay: () => void;
}

/**
 * Modal that warns the user their session is about to expire due to
 * inactivity. Shows a live countdown and a button to extend the session.
 */
export default function SessionTimeoutModal({
  open,
  remainingSeconds,
  onStay,
}: SessionTimeoutModalProps) {
  const stayRef = useRef<HTMLButtonElement>(null);

  // Auto-focus the "Stay" button so the user can press Enter to extend
  useEffect(() => {
    if (open) {
      // Small delay to let the modal finish rendering
      const id = setTimeout(() => stayRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [open]);

  // Format seconds into mm:ss
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Visually urgent when under 30 seconds
  const isUrgent = remainingSeconds <= 30;

  return (
    <Modal open={open} onClose={onStay} title="Session Expiring">
      <div className="session-timeout-body">
        <p className="session-timeout-message">
          Your session will be locked in{' '}
          <span
            className={`session-timeout-countdown${isUrgent ? ' session-timeout-urgent' : ''}`}
          >
            {display}
          </span>{' '}
          due to inactivity.
        </p>
        <p className="session-timeout-hint muted">
          For security, idle sessions are automatically disconnected.
          Click below to stay connected.
        </p>
        <div className="session-timeout-actions">
          <Button ref={stayRef} onClick={onStay}>
            Stay Connected
          </Button>
        </div>
      </div>
    </Modal>
  );
}
