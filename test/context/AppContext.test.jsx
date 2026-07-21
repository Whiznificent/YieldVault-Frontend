import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AppProvider, useAppContext } from '../../src/context/AppContext';

describe('AppContext - Asset Preference', () => {
  const STORAGE_KEY = 'yieldvault:last-asset';

  const wrapper = ({ children }) => <AppProvider>{children}</AppProvider>;

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('initializes lastAsset from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, 'USDC');
    const { result } = renderHook(() => useAppContext(), { wrapper });
    expect(result.current.lastAsset).toBe('USDC');
  });

  it('defaults to null when localStorage is empty', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    expect(result.current.lastAsset).toBeNull();
  });

  it('persists lastAsset to localStorage when set', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });
    
    act(() => {
      result.current.setLastAsset('XLM');
    });
    
    expect(result.current.lastAsset).toBe('XLM');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('XLM');
  });

  it('updates lastAsset when set to different value', () => {
    localStorage.setItem(STORAGE_KEY, 'USDC');
    const { result } = renderHook(() => useAppContext(), { wrapper });
    
    act(() => {
      result.current.setLastAsset('BTC');
    });
    
    expect(result.current.lastAsset).toBe('BTC');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('BTC');
  });

  it('handles localStorage unavailability gracefully', () => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = () => {
      throw new Error('localStorage unavailable');
    };
    
    const { result } = renderHook(() => useAppContext(), { wrapper });
    
    act(() => {
      result.current.setLastAsset('EURC');
    });
    
    expect(result.current.lastAsset).toBe('EURC');
    
    localStorage.setItem = originalSetItem;
  });
});
