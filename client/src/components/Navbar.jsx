'use client';
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/navbar.css'

// All navigation links
const publicLinks = [
  { name: 'home', path: '/home' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
]

const privateLinks = [
  { name: 'projects', path: '/projects' },
  { name: 'services', path: '/services' },
  { name: 'references', path: '/references' },
  { name: 'users', path: '/users' },
]

// Navbar Component
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [location])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    closeMobileMenu()
    navigate('/login')
  }

  // Determine which links to show
  const linksToShow = isLoggedIn ? publicLinks : [...publicLinks, ...privateLinks]

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <div className="navbar-content">
          {/* Custom Logo */}
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <svg viewBox="0 0 40 40" className="logo-hexagon">
              <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" />
              <text x="20" y="24" textAnchor="middle">BA</text>
            </svg>
            <span className="logo-text">Portfolio</span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="navbar-links">
            {linksToShow.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            
            {/* Desktop Logout/Login */}
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="nav-link logout-btn">
                  logout
                </button>
              ) : (
                <Link to="/login" className="nav-link">
                  login
                </Link>
              )}
            </li>
          </ul>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-menu-links">
              {linksToShow.map((link) => (
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
              
              {/* Mobile Logout/Login */}
              <li>
                {isLoggedIn ? (
                  <button onClick={handleLogout} className="mobile-nav-link logout-btn">
                    logout
                  </button>
                ) : (
                  <Link to="/login" onClick={closeMobileMenu} className="mobile-nav-link">
                    login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar