/**
 * Displays a single labelled statistic (e.g. TVL, APY, total shares).
 * @param {object} props
 * @param {string} props.label
 * @param {string|number} props.value
 * @param {string} [props.hint] - small caption shown under the value
 * @param {string} [props.icon]
 */
export default function StatCard({ label, value, hint, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-head">
        {icon && <span className="stat-card-icon">{icon}</span>}
        <span className="stat-card-label">{label}</span>
      </div>
      <div className="stat-card-value">{value}</div>
      {hint && <div className="stat-card-hint">{hint}</div>}
    </div>
  );
}
