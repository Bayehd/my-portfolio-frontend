'use client';
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/navbar.css'

// Navigation links configuration for navigation on the navbar
const navigationLinks = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'projects', path: '/projects' },
  { name: 'services', path: '/services' },
  { name: 'references', path: '/references' },
   { name: 'users', path: '/users' },
  { name: 'contact', path: '/contact' },
]

// Navbar Component
function Navbar() {
  // State to track if mobile menu is open or closed
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Get current location to highlight active nav link
  const location = useLocation()

  /**
   * Toggle the mobile menu visibility
   * Called when user clicks the hamburger button
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  /**
   * Close the mobile menu
   * Called when a navigation link is clicked
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <div className="navbar-content">
          {/* Custom Logo */}
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <svg viewBox="0 0 40 40" className="logo-hexagon">
              {/* Hexagon polygon shape */}
              <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" />
              {/* Initials text inside hexagon */}
              <text x="20" y="24" textAnchor="middle">BA</text>
            </svg>
            <span className="logo-text">Portfolio</span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="navbar-links">
            {navigationLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {/* Hamburger or X icon based on menu state */}
            {isMobileMenuOpen ? (
              // X icon when menu is open
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              // Hamburger icon when menu is closed
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu - Only visible when toggled */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-menu-links">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
