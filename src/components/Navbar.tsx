import { NavLink } from 'react-router-dom';
import WalletButton from './WalletButton';
import ThemeToggle from './ThemeToggle';
import TimezoneSelector from './TimezoneSelector';

/**
 * Top navigation bar with brand, primary links and the wallet control.
 */
export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav-link nav-link-active' : 'nav-link';

  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        <span className="brand-mark">◎</span>
        YieldVault
      </NavLink>
      <div className="nav-links">
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <ThemeToggle />
        <TimezoneSelector />
        <WalletButton />
      </div>
    </nav>
  );
}
