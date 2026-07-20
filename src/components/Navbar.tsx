import { NavLink } from 'react-router-dom';
import WalletButton from './WalletButton';
import NetworkToggle from './NetworkToggle';

/**
 * Top navigation bar with brand, primary links, network toggle and the
 * wallet control.
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
      <NetworkToggle />
      <WalletButton />
    </nav>
  );
}
