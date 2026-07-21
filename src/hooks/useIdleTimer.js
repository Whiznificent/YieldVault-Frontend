import { useState, useEffect, useRef, useCallback } from 'react';
import { CONFIG } from '../constants/config.js';

/**
 * Activity events that reset the idle timer.
 */
const ACTIVITY_EVENTS = [
  'mousemove',
  'mousedown',
  'keydown',
  'scroll',
  'touchstart',
  'click',
  'wheel',
];

/**
 * Tracks user idle time and fires callbacks for warning and lock.
 *
 * @param {object} [options]
 * @param {number}  [options.timeout]          - ms of inactivity before lock (default from CONFIG)
 * @param {number}  [options.warningThreshold] - ms before lock to enter warning state
 * @param {boolean} [options.enabled]          - when false the timer is paused
 * @param {() => void} [options.onIdle]        - called when the timeout expires
 * @returns {{
 *   remainingTime: number,
 *   isWarning: boolean,
 *   isExpired: boolean,
 *   resetTimer: () => void,
 * }}
 */
export function useIdleTimer({
  timeout = CONFIG.idleTimeoutMs,
  warningThreshold = CONFIG.idleWarningMs,
  enabled = true,
  onIdle,
} = {}) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  const [isWarning, setIsWarning] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const lastActivity = useRef(Date.now());
  const onIdleRef = useRef(onIdle);
  const hasFiredRef = useRef(false);

  // Keep the callback ref fresh
  useEffect(() => {
    onIdleRef.current = onIdle;
  }, [onIdle]);

  // Reset everything when enabled changes
  useEffect(() => {
    if (enabled) {
      lastActivity.current = Date.now();
      setRemainingTime(timeout);
      setIsWarning(false);
      setIsExpired(false);
      hasFiredRef.current = false;
    }
  }, [enabled, timeout]);

  /** Force-reset the idle timer (e.g. user clicks "Stay"). */
  const resetTimer = useCallback(() => {
    lastActivity.current = Date.now();
    setRemainingTime(timeout);
    setIsWarning(false);
    setIsExpired(false);
    hasFiredRef.current = false;
  }, [timeout]);

  // Bind activity listeners
  useEffect(() => {
    if (!enabled) return undefined;

    const handleActivity = () => {
      lastActivity.current = Date.now();
      if (hasFiredRef.current) return; // already locked – don't un-expire
    };

    ACTIVITY_EVENTS.forEach((evt) =>
      window.addEventListener(evt, handleActivity, { passive: true }),
    );

    return () => {
      ACTIVITY_EVENTS.forEach((evt) =>
        window.removeEventListener(evt, handleActivity),
      );
    };
  }, [enabled]);

  // Tick every second to recompute remaining time
  useEffect(() => {
    if (!enabled) return undefined;

    const tick = () => {
      const elapsed = Date.now() - lastActivity.current;
      const remaining = Math.max(0, timeout - elapsed);

      setRemainingTime(remaining);

      if (remaining === 0 && !hasFiredRef.current) {
        hasFiredRef.current = true;
        setIsExpired(true);
        setIsWarning(false);
        onIdleRef.current?.();
      } else if (remaining <= warningThreshold && remaining > 0) {
        setIsWarning(true);
      } else {
        setIsWarning(false);
      }
    };

    // Run immediately to catch any state from before the timer started
    tick();

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [enabled, timeout, warningThreshold]);

  return { remainingTime, isWarning, isExpired, resetTimer };
}

export default useIdleTimer;
