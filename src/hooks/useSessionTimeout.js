import { useCallback, useEffect, useRef, useState } from 'react';

const ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

/** Tracks inactivity for an authenticated session. */
export function useSessionTimeout({ enabled, timeoutMs, warningMs, onTimeout }) {
  const [showWarning, setShowWarning] = useState(false);
  const warningTimer = useRef(null);
  const timeoutTimer = useRef(null);
  const onTimeoutRef = useRef(onTimeout);

  onTimeoutRef.current = onTimeout;

  const clearTimers = useCallback(() => {
    window.clearTimeout(warningTimer.current);
    window.clearTimeout(timeoutTimer.current);
  }, []);

  const extendSession = useCallback(() => {
    clearTimers();
    setShowWarning(false);
    if (!enabled) return;

    warningTimer.current = window.setTimeout(
      () => setShowWarning(true),
      Math.max(timeoutMs - warningMs, 0)
    );
    timeoutTimer.current = window.setTimeout(() => {
      setShowWarning(false);
      onTimeoutRef.current();
    }, timeoutMs);
  }, [clearTimers, enabled, timeoutMs, warningMs]);

  useEffect(() => {
    extendSession();
    return clearTimers;
  }, [clearTimers, extendSession]);

  useEffect(() => {
    if (!enabled || showWarning) return undefined;

    const recordActivity = () => extendSession();
    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, recordActivity));
    return () => ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, recordActivity));
  }, [enabled, extendSession, showWarning]);

  return { showWarning, extendSession };
}

export default useSessionTimeout;
