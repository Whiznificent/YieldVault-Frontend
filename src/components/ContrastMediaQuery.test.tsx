import { describe, it, expect } from 'vitest';
// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';

describe('prefers-contrast media query', () => {
  // @ts-ignore
  const cssPath = path.resolve(__dirname, '../styles/index.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8') as string;

  it('includes prefers-contrast: more media query in index.css', () => {
    expect(cssContent).toContain('@media (prefers-contrast: more)');
  });

  it('includes prefers-contrast: less media query in index.css', () => {
    expect(cssContent).toContain('@media (prefers-contrast: less)');
  });

  it('enhances border contrast in high-contrast mode', () => {
    // The more contrast block adjusts borders and outlines
    expect(cssContent).toContain('@media (prefers-contrast: more)');
    expect(cssContent).toContain('border-width: 2px');
    expect(cssContent).toContain('outline: 3px solid var(--primary)');
    expect(cssContent).toContain('outline-offset: 3px');
  });

  it('softens borders in low-contrast mode', () => {
    expect(cssContent).toContain('@media (prefers-contrast: less)');
    // The less block explicitly declares border-width: 1px
    const lessIdx = cssContent.indexOf('@media (prefers-contrast: less)');
    const afterLess = cssContent.substring(lessIdx);
    expect(afterLess).toContain('border-width: 1px');
  });
});
