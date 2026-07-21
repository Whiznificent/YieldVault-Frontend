import { useEffect } from 'react';
import { resolveLang } from '../constants/i18n.js';

/**
 * Keep `document.documentElement.lang` in sync with the active UI language.
 * The static `lang="en"` in index.html covers the initial paint; this hook
 * makes the attribute follow the app at runtime so assistive tech and
 * translation tools see the right language if it ever changes. Restores the
 * previous value on unmount.
 * @param {string} [lang] language tag; normalized via resolveLang
 */
export function useDocumentLang(lang) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = resolveLang(lang);
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);
}

export default useDocumentLang;
