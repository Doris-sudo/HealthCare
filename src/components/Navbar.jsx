import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  LogOut, 
  ShieldCheck, 
  FileText,
  Activity,
  HeartPulse
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { totalItemCount } = useCart();
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/medicines?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className="navbar-sticky">
        <div className="container">
          <div className="navbar-inner">
            {/* Logo */}
            <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
              <div className="brand-icon-box">
                <Plus size={28} strokeWidth={2.8} />
              </div>
              <div className="brand-text">
                <span className="brand-name">
                  LifeCare<span>.</span>
                </span>
                <span className="brand-tagline">Pharmacy & Wellness</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav>
              <ul className="nav-links">
                <li>
                  <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/medicines" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Medicines
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/categories" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Contact
                  </NavLink>
                </li>
              </ul>
            </nav>

            {/* Actions: Search, Cart, Auth */}
            <div className="nav-actions">
              {/* Search Toggle */}
              <button 
                className="nav-action-btn" 
                title="Search Medicines" 
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Toggle Search"
              >
                <Search size={20} />
              </button>

              {/* Cart Icon */}
              <Link to="/cart" className="nav-action-btn" title="Shopping Cart" aria-label="Shopping Cart">
                <ShoppingCart size={20} />
                {totalItemCount > 0 && <span className="cart-badge">{totalItemCount}</span>}
              </Link>

              {/* User Authentication */}
              {isAuthenticated ? (
                <div style={{ position: 'relative' }}>
                  <button 
                    className="nav-action-btn"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    style={{ backgroundColor: 'var(--primary-blue-light)', color: 'var(--primary-blue)' }}
                    title={currentUser.name}
                  >
                    <User size={20} />
                  </button>

                  {userDropdownOpen && (
                    <div 
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '50px',
                        width: '220px',
                        backgroundColor: 'var(--white)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--border-color)',
                        padding: '12px',
                        zIndex: 100
                      }}
                    >
                      <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--dark-navy)' }}>{currentUser.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.email}</div>
                      </div>
                      <Link 
                        to="/account" 
                        onClick={() => setUserDropdownOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', fontSize: '0.88rem', color: 'var(--dark-navy)', borderRadius: 'var(--radius-sm)' }}
                      >
                        <User size={16} /> My Account
                      </Link>
                      <Link 
                        to="/track-order" 
                        onClick={() => setUserDropdownOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', fontSize: '0.88rem', color: 'var(--dark-navy)', borderRadius: 'var(--radius-sm)' }}
                      >
                        <Activity size={16} /> Track Orders
                      </Link>
                      <button 
                        onClick={handleLogout}
                        style={{ 
                          width: '100%', 
                          textAlign: 'left', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          padding: '8px 10px', 
                          fontSize: '0.88rem', 
                          color: 'var(--error-red)', 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer',
                          marginTop: '4px',
                          borderTop: '1px solid var(--border-color)'
                        }}
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
                  <User size={16} />
                  <span>Login</span>
                </Link>
              )}

              {/* Mobile Menu Toggle Button */}
              <button 
                className="mobile-menu-btn" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* Collapsible Search Dropdown */}
          {searchOpen && (
            <div style={{ padding: '12px 0 18px 0', borderTop: '1px solid var(--border-color)' }}>
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '10px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input 
                    type="text" 
                    placeholder="Search medicines, active ingredients, wellness products (e.g., Paracetamol, Amoxicillin, Inhaler)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '10px 16px 10px 42px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--primary-blue)',
                      outline: 'none',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-sm">Search</button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-nav-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid var(--border-color)' }}>
            <div className="brand-logo">
              <div className="brand-icon-box" style={{ width: '36px', height: '36px' }}>
                <Plus size={22} />
              </div>
              <span className="brand-name" style={{ fontSize: '1.15rem' }}>LifeCare</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dark-navy)' }}>
              <X size={24} />
            </button>
          </div>

          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li className="mobile-nav-item">
              <NavLink to="/medicines" onClick={() => setMobileMenuOpen(false)}>
                Medicines
              </NavLink>
            </li>
            <li className="mobile-nav-item">
              <NavLink to="/categories" onClick={() => setMobileMenuOpen(false)}>
                Categories
              </NavLink>
            </li>
            <li className="mobile-nav-item">
              <NavLink to="/services" onClick={() => setMobileMenuOpen(false)}>
                Services
              </NavLink>
            </li>
            <li className="mobile-nav-item">
              <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </NavLink>
            </li>
            <li className="mobile-nav-item">
              <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </NavLink>
            </li>
            <li className="mobile-nav-item">
              <NavLink to="/track-order" onClick={() => setMobileMenuOpen(false)}>
                Track Orders
              </NavLink>
            </li>
          </ul>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
            {isAuthenticated ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline" style={{ width: '100%' }}>
                  My Account ({currentUser.name})
                </Link>
                <button onClick={handleLogout} className="btn btn-ghost" style={{ width: '100%', color: 'var(--error-red)' }}>
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ width: '100%' }}>
                  Login
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline" style={{ width: '100%' }}>
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
