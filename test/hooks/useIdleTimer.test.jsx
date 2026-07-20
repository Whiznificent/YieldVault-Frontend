import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useIdleTimer } from '../../src/hooks/useIdleTimer.js';

/**
 * Helper to advance time and flush all pending timers.
 */
function advanceTime(ms) {
  vi.advanceTimersByTime(ms);
}

/**
 * Helper to fire a window activity event.
 */
function fireActivity() {
  window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
}

describe('useIdleTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns initial remainingTime equal to the timeout', () => {
    const { result } = renderHook(() =>
      useIdleTimer({ timeout: 30000, warningThreshold: 5000 }),
    );
    expect(result.current.remainingTime).toBe(30000);
  });

  it('starts with isWarning and isExpired as false', () => {
    const { result } = renderHook(() =>
      useIdleTimer({ timeout: 30000, warningThreshold: 5000 }),
    );
    expect(result.current.isWarning).toBe(false);
    expect(result.current.isExpired).toBe(false);
  });

  it('is paused when enabled is false', () => {
    const { result } = renderHook(() =>
      useIdleTimer({ timeout: 10000, warningThreshold: 3000, enabled: false }),
    );
    // Fast-forward well past the timeout
    act(() => advanceTime(20000));
    expect(result.current.remainingTime).toBe(10000);
    expect(result.current.isExpired).toBe(false);
  });

  it('decrements remainingTime over time', () => {
    const { result } = renderHook(() =>
      useIdleTimer({ timeout: 30000, warningThreshold: 5000 }),
    );
    act(() => advanceTime(5000));
    expect(result.current.remainingTime).toBeLessThanOrEqual(25000);
    expect(result.current.remainingTime).toBeGreaterThan(24000); // allow small tick rounding
  });

  it('enters warning state when remainingTime <= warningThreshold', () => {
    const onIdle = vi.fn();
    const { result } = renderHook(() =>
      useIdleTimer({ timeout: 10000, warningThreshold: 4000, onIdle }),
    );

    // Advance to the warning threshold
    act(() => advanceTime(6001));
    expect(result.current.isWarning).toBe(true);
    expect(result.current.isExpired).toBe(false);
    expect(onIdle).not.toHaveBeenCalled();
  });

  it('calls onIdle when timeout expires', () => {
    const onIdle = vi.fn();
    renderHook(() =>
      useIdleTimer({ timeout: 10000, warningThreshold: 3000, onIdle }),
    );

    act(() => advanceTime(11000));
    expect(onIdle).toHaveBeenCalledOnce();
  });

  it('sets isExpired when timeout expires', () => {
    const { result } = renderHook(() =>
      useIdleTimer({ timeout: 10000, warningThreshold: 3000 }),
    );

    act(() => advanceTime(11000));
    expect(result.current.isExpired).toBe(true);
    expect(result.current.remainingTime).toBe(0);
  });

  it('only calls onIdle once even if time keeps advancing', () => {
    const onIdle = vi.fn();
    renderHook(() =>
      useIdleTimer({ timeout: 10000, warningThreshold: 3000, onIdle }),
    );

    act(() => advanceTime(11000));
    act(() => advanceTime(5000)); // way past timeout
    expect(onIdle).toHaveBeenCalledOnce();
  });

  it('resets the timer on activity before expiry', () => {
    const { result } = renderHook(() =>
      useIdleTimer({ timeout: 15000, warningThreshold: 5000 }),
    );

    // Let 8 seconds pass, then fire activity
    act(() => advanceTime(8000));
    expect(result.current.remainingTime).toBeLessThanOrEqual(7000);

    act(() => {
      fireActivity();
    });

    // Activity resets lastActivity ref; wait one tick for the interval
    // to recompute remainingTime and re-render
    act(() => advanceTime(1000));

    // Timer should be back near full
    expect(result.current.remainingTime).toBe(14000);
    expect(result.current.isWarning).toBe(false);
  });

  it('resetTimer() resets the countdown and warning state', () => {
    const { result } = renderHook(() =>
      useIdleTimer({ timeout: 20000, warningThreshold: 6000 }),
    );

    // Advance into warning
    act(() => advanceTime(15000));
    expect(result.current.isWarning).toBe(true);

    // Explicit reset
    act(() => result.current.resetTimer());

    expect(result.current.remainingTime).toBe(20000);
    expect(result.current.isWarning).toBe(false);
    expect(result.current.isExpired).toBe(false);
  });

  it('activity does NOT un-expire after onIdle has fired', () => {
    const onIdle = vi.fn();
    const { result } = renderHook(() =>
      useIdleTimer({ timeout: 5000, warningThreshold: 1000, onIdle }),
    );

    // Expire
    act(() => advanceTime(6000));
    expect(onIdle).toHaveBeenCalledOnce();
    expect(result.current.isExpired).toBe(true);

    // Activity after expiry does nothing
    act(() => {
      fireActivity();
    });
    expect(result.current.isExpired).toBe(true);
    expect(result.current.remainingTime).toBe(0);
  });

  it('resets when enabled toggles from false to true', () => {
    const { result, rerender } = renderHook(
      ({ enabled }) =>
        useIdleTimer({ timeout: 10000, warningThreshold: 3000, enabled }),
      { initialProps: { enabled: false } },
    );

    // Advance while disabled
    act(() => advanceTime(20000));
    expect(result.current.remainingTime).toBe(10000);

    // Enable
    rerender({ enabled: true });
    expect(result.current.remainingTime).toBe(10000);
    expect(result.current.isExpired).toBe(false);
  });

  it('does not enter warning when warningThreshold is 0', () => {
    const { result } = renderHook(() =>
      useIdleTimer({ timeout: 10000, warningThreshold: 0 }),
    );

    act(() => advanceTime(5000));
    expect(result.current.isWarning).toBe(false);

    act(() => advanceTime(5001));
    expect(result.current.isWarning).toBe(false);
    expect(result.current.isExpired).toBe(true);
  });

  it('cleanup does not throw after unmount', () => {
    const { unmount } = renderHook(() =>
      useIdleTimer({ timeout: 10000, warningThreshold: 3000 }),
    );

    act(() => advanceTime(5000));
    unmount();
    // Advancing after unmount should not throw
    act(() => advanceTime(10000));
  });
});
