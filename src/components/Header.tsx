import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    onMenuClick?.();
  };

  return (
    <header className="header">
      <div className="header-logo">
        <span className="logo-icon">🚀</span>
        <span className="logo-text">KFA</span>
      </div>
      <button
        className={`hamburger-menu ${menuOpen ? 'open' : ''}`}
        onClick={handleMenuClick}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      {menuOpen && (
        <nav className="header-nav">
          <a href="/">Home</a>
          <a href="#about">About</a>
          <a href="#settings">Settings</a>
        </nav>
      )}
    </header>
  );
};

export default Header;
