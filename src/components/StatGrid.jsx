import StatCard from './StatCard.jsx';

/**
 * Responsive grid of StatCards built from a list of stat descriptors. Keeps
 * pages tidy by centralising the repeated `.stat-grid` + mapping markup.
 * @param {object} props
 * @param {Array<{ label: string, value: string|number, hint?: string, icon?: string }>} props.stats
 */
export default function StatGrid({ stats = [] }) {
  return (
    <div className="stat-grid">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          hint={stat.hint}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
