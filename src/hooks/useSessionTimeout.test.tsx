import { act, fireEvent, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import useSessionTimeout from './useSessionTimeout';

describe('useSessionTimeout', () => {
  afterEach(() => vi.useRealTimers());

  it('shows a warning before timing out and allows the session to be renewed', () => {
    vi.useFakeTimers();
    const onTimeout = vi.fn();
    const { result } = renderHook(() =>
      useSessionTimeout({ enabled: true, timeoutMs: 1_000, warningMs: 250, onTimeout })
    );

    act(() => vi.advanceTimersByTime(750));
    expect(result.current.showWarning).toBe(true);
    expect(onTimeout).not.toHaveBeenCalled();

    act(() => result.current.extendSession());
    expect(result.current.showWarning).toBe(false);
    act(() => vi.advanceTimersByTime(1_000));
    expect(onTimeout).toHaveBeenCalledOnce();
  });

  it('resets the inactivity timer when the user is active', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() =>
      useSessionTimeout({ enabled: true, timeoutMs: 1_000, warningMs: 250, onTimeout: vi.fn() })
    );

    act(() => vi.advanceTimersByTime(600));
    act(() => fireEvent.keyDown(window, { key: 'Tab' }));
    act(() => vi.advanceTimersByTime(600));
    expect(result.current.showWarning).toBe(false);
    act(() => vi.advanceTimersByTime(150));
    expect(result.current.showWarning).toBe(true);
  });
});
