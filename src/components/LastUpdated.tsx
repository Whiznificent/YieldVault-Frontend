interface LastUpdatedProps {
  /** The time the associated data was last loaded successfully. */
  timestamp: Date | null;
}

/**
 * Communicates the freshness of data shown on a page.
 */
export default function LastUpdated({ timestamp }: LastUpdatedProps) {
  if (!timestamp) return null;

  const formattedTime = timestamp.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <p className="last-updated">
      <span aria-hidden="true">↻</span>{' '}
      <time dateTime={timestamp.toISOString()} title={timestamp.toLocaleString()}>
        Last updated: {formattedTime}
      </time>
    </p>
  );
}
