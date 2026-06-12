/**
 * Simple spinner with an optional label, used for async loading states.
 * @param {object} props
 * @param {string} [props.label]
 */
export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader-spinner" />
      <span className="loader-label">{label}</span>
    </div>
  );
}
