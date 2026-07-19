import { describe, it, expect } from 'vitest';
import {
  DEFAULT_LANG,
  DEFAULT_LOCALE,
  SUPPORTED_LANGS,
  LOCALE_BY_LANG,
  resolveLang,
  getLocale,
} from '../../src/constants/i18n.js';

describe('i18n constants', () => {
  it('declares the default language as supported', () => {
    expect(SUPPORTED_LANGS).toContain(DEFAULT_LANG);
  });

  it('maps every supported language to a formatting locale', () => {
    for (const lang of SUPPORTED_LANGS) {
      expect(LOCALE_BY_LANG[lang]).toBeTruthy();
    }
    expect(DEFAULT_LOCALE).toBe(LOCALE_BY_LANG[DEFAULT_LANG]);
  });
});

describe('resolveLang', () => {
  it('returns a supported language unchanged', () => {
    expect(resolveLang('en')).toBe('en');
  });

  it('normalizes full locales to their primary subtag', () => {
    expect(resolveLang('en-GB')).toBe('en');
    expect(resolveLang('EN-us')).toBe('en');
  });

  it('falls back to the default for unsupported languages', () => {
    expect(resolveLang('fr')).toBe(DEFAULT_LANG);
    expect(resolveLang('zz-ZZ')).toBe(DEFAULT_LANG);
  });

  it('falls back to the default for missing or invalid input', () => {
    expect(resolveLang()).toBe(DEFAULT_LANG);
    expect(resolveLang('')).toBe(DEFAULT_LANG);
    expect(resolveLang(null)).toBe(DEFAULT_LANG);
    expect(resolveLang(42)).toBe(DEFAULT_LANG);
  });
});

describe('getLocale', () => {
  it('returns the locale for a supported language', () => {
    expect(getLocale('en')).toBe('en-US');
  });

  it('returns the default locale for unknown or missing languages', () => {
    expect(getLocale('fr')).toBe(DEFAULT_LOCALE);
    expect(getLocale()).toBe(DEFAULT_LOCALE);
  });
});
