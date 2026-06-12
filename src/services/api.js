import { CONFIG } from '../constants/config.js';

/**
 * Tiny mock API layer. Wraps responses in a simulated network delay so the
 * UI can exercise loading and error states without a backend.
 */

/**
 * Resolve a value after a simulated network delay.
 * @template T
 * @param {T} value
 * @param {number} [ms]
 * @returns {Promise<T>}
 */
export function withLatency(value, ms = CONFIG.mockLatency) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

/**
 * Reject after a simulated network delay to test error handling.
 * @param {string} message
 * @param {number} [ms]
 * @returns {Promise<never>}
 */
export function failWithLatency(message, ms = CONFIG.mockLatency) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), ms);
  });
}

/**
 * Deep clone helper so callers cannot mutate the mock store directly.
 * @template T
 * @param {T} value
 * @returns {T}
 */
export function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
