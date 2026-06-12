import { clamp } from '../utils/format.js';

/**
 * Horizontal progress bar. Useful for vault capacity, allocation or any
 * 0–100% measure. The fill width is clamped to a safe range.
 * @param {object} props
 * @param {number} props.value - current value
 * @param {number} [props.max=100] - value that represents a full bar
 * @param {string} [props.label] - optional caption shown above the bar
 */
export default function ProgressBar({ value, max = 100, label }) {
  const ratio = max > 0 ? value / max : 0;
  const percent = clamp(Math.round(ratio * 100), 0, 100);

  return (
    <div className="progress">
      {label && (
        <div className="progress-label">
          <span>{label}</span>
          <span>{percent}%</span>
        </div>
      )}
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
