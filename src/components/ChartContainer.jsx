import React from 'react';
import './ChartContainer.css';

/**
 * ChartContainer: A responsive wrapper for chart components.
 * It ensures the chart scales to the width of its parent while preserving
 * a configurable aspect ratio (default 16:9). The container uses CSS
 * `aspect-ratio` which is supported in modern browsers; fallback padding
 * technique is provided for older browsers.
 */
export default function ChartContainer({
  children,
  aspectRatio = '16/9', // can be any CSS aspect‑ratio value e.g., "4/3"
  className = '',
  style = {},
}) {
  const containerStyle = {
    // `aspectRatio` works in Chrome, Firefox, Safari (>=14). For older
    // browsers we set a padding‑bottom fallback via custom CSS class.
    aspectRatio,
    ...style,
  };

  return (
    <div
      className={`chart-container ${className}`.trim()}
      style={containerStyle}
    >
      {children}
    </div>
  );
}
