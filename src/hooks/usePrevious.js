import { useRef, useEffect } from 'react';

/**
 * Remember the value a prop or state had on the previous render. Returns
 * `undefined` on the first render. Useful for diffing or transition effects.
 * @template T
 * @param {T} value
 * @returns {T | undefined}
 */
export function usePrevious(value) {
  const ref = useRef(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
