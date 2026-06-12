/**
 * Inline error banner with an optional retry action.
 * @param {object} props
 * @param {string} props.message
 * @param {() => void} [props.onRetry]
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert">
      <span className="error-icon">⚠️</span>
      <span>{message}</span>
      {onRetry && (
        <button type="button" className="error-retry" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
