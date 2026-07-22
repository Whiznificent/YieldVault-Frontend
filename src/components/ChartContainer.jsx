import React, { useRef } from 'react';
import './ChartContainer.css';
import html2canvas from 'html2canvas';
import Button from './Button';

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
  const containerRef = useRef(null);

  const downloadChart = async () => {
    if (!containerRef.current) return;
    const canvas = await html2canvas(containerRef.current);
    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chart.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

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
      ref={containerRef}
    >
      {children}
      <Button variant="secondary" onClick={downloadChart}>Download</Button>
    </div>
  );
}
