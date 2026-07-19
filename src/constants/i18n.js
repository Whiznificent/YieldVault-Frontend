/**
 * Language and locale configuration — the single source of truth for i18n.
 * The UI is English-only today, but every piece of the app that needs a
 * language code or a formatting locale reads it from here, so adding a new
 * language later is a matter of extending these maps.
 */

/** BCP 47 primary language subtag used when nothing better is known. */
export const DEFAULT_LANG = 'en';

/** Languages the UI can render. Extend this list when translations land. */
export const SUPPORTED_LANGS = ['en'];

/** Full locale used for number/date formatting, per supported language. */
export const LOCALE_BY_LANG = {
  en: 'en-US',
};

/** Formatting locale for the default language. */
export const DEFAULT_LOCALE = LOCALE_BY_LANG[DEFAULT_LANG];

/**
 * Normalize a language tag to a supported UI language, falling back to the
 * default. Accepts full locales ("en-GB" → "en") and is safe to call with
 * untrusted input such as `navigator.language`.
 * @param {string} [candidate]
 * @returns {string} a member of SUPPORTED_LANGS
 */
export function resolveLang(candidate) {
  if (typeof candidate !== 'string' || !candidate) return DEFAULT_LANG;
  const primary = candidate.toLowerCase().split('-')[0];
  return SUPPORTED_LANGS.includes(primary) ? primary : DEFAULT_LANG;
}

/**
 * Get the formatting locale for a language, falling back to the default
 * locale for unknown languages.
 * @param {string} [lang]
 * @returns {string} a BCP 47 locale usable with Intl / toLocaleString
 */
export function getLocale(lang) {
  return LOCALE_BY_LANG[resolveLang(lang)] || DEFAULT_LOCALE;
}
