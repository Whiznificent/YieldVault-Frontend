import Button from './Button';

interface SessionTimeoutWarningProps {
  open: boolean;
  onContinue: () => void;
}

/** Warns connected wallet users shortly before an inactive session expires. */
export default function SessionTimeoutWarning({ open, onContinue }: SessionTimeoutWarningProps) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <section className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="session-timeout-title">
        <div className="modal-head">
          <h3 id="session-timeout-title" className="modal-title">Session expiring</h3>
        </div>
        <div className="modal-body">
          <p className="session-timeout-message">
            Your wallet session will end in one minute because there has been no activity.
          </p>
          <Button onClick={onContinue}>Stay signed in</Button>
        </div>
      </section>
    </div>
  );
}
