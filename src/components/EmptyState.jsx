/**
 * Friendly placeholder shown when a list has no data or the wallet is
 * disconnected. Optionally renders an action node (e.g. a button).
 * @param {object} props
 * @param {string} [props.icon]
 * @param {string} props.title
 * @param {string} [props.message]
 * @param {React.ReactNode} [props.action]
 */
export default function EmptyState({ icon = '🗂️', title, message, action }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">{icon}</span>
      <h3 className="empty-title">{title}</h3>
      {message && <p className="empty-message">{message}</p>}
      {action && <div className="empty-action">{action}</div>}
    </div>
  );
}
