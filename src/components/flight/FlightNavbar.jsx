import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Plane } from 'lucide-react';

export default function FlightNavbar({ onRegister, onViewChange, currentView }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'ABOUT', href: '#about' },
    { label: 'DESTINATION', href: '#destination' },
    { label: 'DEPARTURES', href: '#departures' },
    { label: 'FLIGHT CREW', href: '#flight-crew' },
    { label: 'ITINERARY', href: '#itinerary' },
    { label: 'TEAM', href: '#team' },
    { label: 'PARTNERS', href: '#partners' },
    { label: '2026 ARCHIVES', href: '#archives' },
  ];

  const handleNavClick = (e, href) => {
    if (currentView !== 'site') {
      e.preventDefault();
      onViewChange('site');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
    setMobileOpen(false);
  };

  return (
    <>
      <header className={`flight-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="flight-container">
          <div className="flight-nav-inner">
            
            {/* Left Brand Capsule */}
            <div
              className="flight-nav-brand"
              onClick={() => {
                onViewChange('site');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
            >
              <img
                src="/conference-logo.png"
                alt="OOU FutureTech"
                style={{
                  height: '32px',
                  width: 'auto',
                  borderRadius: '6px',
                  objectFit: 'contain'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.95rem', color: '#000000', lineHeight: 1 }}>
                  OOU FUTURETECH
                </span>
                <span className="flight-mono" style={{ fontSize: '0.62rem', color: 'var(--color-airline-red)', fontWeight: 700, letterSpacing: '0.1em', marginTop: '2px' }}>
                  FLIGHT FT2027
                </span>
              </div>
            </div>

            {/* Middle Nav Capsule */}
            <nav className="flight-nav-menu-pill" aria-label="Main navigation">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right Action Capsule */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                className="flight-btn-red flight-navbar-action-btn"
                onClick={() => onRegister()}
                style={{ padding: '0.6rem 1.35rem', fontSize: '0.78rem' }}
              >
                BOARDING PASS
              </button>

              <button
                type="button"
                className="flight-mobile-toggle"
                onClick={() => setMobileOpen(true)}
                aria-label="Open mobile menu"
              >
                <Menu size={20} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(7, 7, 9, 0.98)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 250,
        padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 3vw, 1.75rem)',
        display: mobileOpen ? 'flex' : 'none',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{
            background: '#FFFFFF',
            border: '2px solid #000',
            borderRadius: '9999px',
            padding: '0.4rem 1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}>
            <img
              src="/conference-logo.png"
              alt="OOU FutureTech"
              style={{
                height: '28px',
                width: 'auto',
                borderRadius: '4px',
                objectFit: 'contain'
              }}
            />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.9rem' }}>
              OOU FUTURETECH 2027
            </span>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            style={{
              width: '44px',
              height: '44px',
              background: '#FFFFFF',
              border: '2px solid #000',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={22} color="#000" />
          </button>
        </div>

        <nav style={{ margin: '2rem 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    fontWeight: 900,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                    paddingBottom: '0.8rem'
                  }}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={22} color="var(--color-airline-red)" />
                </a>
              </li>
            ))}
            <li>
              <a
                href="#founders"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  onViewChange('founders');
                }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  color: '#CBD5E1',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                  paddingBottom: '0.8rem'
                }}
              >
                <span>FOUNDERS CLUB</span>
                <ArrowUpRight size={22} color="#CBD5E1" />
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <button
            type="button"
            className="flight-btn-red"
            style={{ width: '100%', padding: '1.1rem', justifyContent: 'center' }}
            onClick={() => {
              setMobileOpen(false);
              onRegister();
            }}
          >
            GET YOUR BOARDING PASS
          </button>
        </div>
      </div>
    </>
  );
}
