import { useState, useEffect } from 'react';

/**
 * Track the current viewport size, updating on resize. Returns zeros during
 * server-side rendering where `window` is unavailable.
 * @returns {{ width: number, height: number }}
 */
export function useWindowSize() {
  const getSize = () => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [size, setSize] = useState(getSize);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const onResize = () => setSize(getSize());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return size;
}

export default useWindowSize;
