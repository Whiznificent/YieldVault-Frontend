import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import WalletButton from './WalletButton';
import ThemeToggle from './ThemeToggle';
import SlippageTolerance from './SlippageTolerance';
import TimezoneSelector from './TimezoneSelector';

/**
 * Top navigation bar with brand, primary links and the wallet control.
 * Navigation can be collapsed/expanded on mobile and the state is persisted to localStorage.
 */
const STORAGE_KEY = 'yieldvault:nav-collapsed';

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'true';
    }
    return false;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(isCollapsed));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [isCollapsed]);

  const toggleNav = () => setIsCollapsed((prev) => !prev);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav-link nav-link-active' : 'nav-link';

  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        <span className="brand-mark">◎</span>
        YieldVault
      </NavLink>
      <button
        type="button"
        className="nav-toggle"
        onClick={toggleNav}
        aria-expanded={!isCollapsed}
        aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isCollapsed ? (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          ) : (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          )}
        </svg>
      </button>
      <div className={`nav-links ${isCollapsed ? 'nav-links-collapsed' : ''}`}>
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/positions" className={linkClass}>
          Positions
        </NavLink>
        <NavLink to="/wizard-demo" className={linkClass}>
          Wizard
        </NavLink>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <SlippageTolerance />
        <ThemeToggle />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <ThemeToggle />
        <TimezoneSelector />
        <WalletButton />
      </div>
    </nav>
  );
}
