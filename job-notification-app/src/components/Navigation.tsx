import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard' },
  { path: '/saved', label: 'Saved' },
  { path: '/digest', label: 'Digest' },
  { path: '/settings', label: 'Settings' },
  { path: '/proof', label: 'Proof' },
];

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--space-16) var(--space-40)',
    backgroundColor: 'var(--color-white)',
    borderBottom: '1px solid var(--color-border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const logoStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    letterSpacing: '-0.01em',
    textDecoration: 'none',
  };

  const desktopNavStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-40)',
  };

  const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
    textDecoration: 'none',
    paddingBottom: '4px',
    borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
    transition: 'color var(--transition-fast), border-color var(--transition-fast)',
  });

  // Mobile menu button
  const menuButtonStyle: React.CSSProperties = {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 'var(--space-8)',
    flexDirection: 'column' as const,
    gap: '5px',
  };

  const hamburgerLineStyle: React.CSSProperties = {
    width: '20px',
    height: '2px',
    backgroundColor: 'var(--color-text-primary)',
    transition: 'transform var(--transition-fast), opacity var(--transition-fast)',
  };

  // Mobile dropdown
  const mobileMenuStyle: React.CSSProperties = {
    display: mobileMenuOpen ? 'flex' : 'none',
    flexDirection: 'column' as const,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'var(--color-white)',
    borderBottom: '1px solid var(--color-border)',
    padding: 'var(--space-16) var(--space-40)',
    gap: 'var(--space-16)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  };

  const mobileNavLinkStyle = (isActive: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-body)',
    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
    textDecoration: 'none',
    padding: 'var(--space-8) 0',
    borderLeft: isActive ? '3px solid var(--color-accent)' : '3px solid transparent',
    paddingLeft: isActive ? 'var(--space-16)' : 'calc(var(--space-16) + 3px)',
    transition: 'color var(--transition-fast), border-color var(--transition-fast), padding-left var(--transition-fast)',
  });

  // Media query styles via inline approach
  const responsiveStyles = `
    @media (max-width: 768px) {
      .desktop-nav {
        display: none !important;
      }
      .mobile-menu-btn {
        display: flex !important;
      }
    }
    @media (min-width: 769px) {
      .mobile-menu {
        display: none !important;
      }
    }
  `;

  return (
    <>
      <style>{responsiveStyles}</style>
      <nav style={navStyle}>
        <Link to="/" style={logoStyle}>
          Job Notification App
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav" style={desktopNavStyle}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              style={({ isActive }) => navLinkStyle(isActive)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          style={menuButtonStyle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            style={{
              ...hamburgerLineStyle,
              transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          />
          <span
            style={{
              ...hamburgerLineStyle,
              opacity: mobileMenuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              ...hamburgerLineStyle,
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}
          />
        </button>

        {/* Mobile Dropdown Menu */}
        <div className="mobile-menu" style={mobileMenuStyle}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              style={({ isActive }) => mobileNavLinkStyle(isActive)}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};
