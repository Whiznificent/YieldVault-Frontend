import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import useDocumentLang from '../../src/hooks/useDocumentLang.js';
import { DEFAULT_LANG } from '../../src/constants/i18n.js';

/** Minimal component so the hook runs inside a real React tree. */
function Probe({ lang }) {
  useDocumentLang(lang);
  return null;
}

describe('useDocumentLang', () => {
  afterEach(() => {
    cleanup();
    document.documentElement.lang = '';
  });

  it('sets the document language on mount', () => {
    render(<Probe lang="en" />);
    expect(document.documentElement.lang).toBe('en');
  });

  it('defaults to the app language when none is given', () => {
    render(<Probe />);
    expect(document.documentElement.lang).toBe(DEFAULT_LANG);
  });

  it('normalizes unsupported languages to the default', () => {
    render(<Probe lang="xx-YY" />);
    expect(document.documentElement.lang).toBe(DEFAULT_LANG);
  });

  it('updates when the language prop changes', () => {
    const { rerender } = render(<Probe lang="en" />);
    rerender(<Probe lang="en-GB" />);
    expect(document.documentElement.lang).toBe('en');
  });

  it('restores the previous document language on unmount', () => {
    document.documentElement.lang = 'previous-lang';
    const { unmount } = render(<Probe lang="en" />);
    expect(document.documentElement.lang).toBe('en');
    unmount();
    expect(document.documentElement.lang).toBe('previous-lang');
  });
});
