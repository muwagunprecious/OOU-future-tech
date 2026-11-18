import React, { useState, useEffect } from 'react';
import { Award, ArrowRight, ArrowLeft, Menu, X, Plane, Trophy, Users } from 'lucide-react';

export default function AltitudeNavbar({ onBackToConference, onReturnToSite, onNominateClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleReturn = onBackToConference || onReturnToSite;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'ALTITUDE WALL', href: '#altitude-wall' },
    { label: '19 CATEGORIES', href: '#categories' },
    { label: 'APPROVED NOMINEES', href: '#nominees' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          background: scrolled ? 'rgba(8, 9, 12, 0.95)' : 'rgba(8, 9, 12, 0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="altitude-container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '76px'
          }}>
            {/* Left Brand with Gold/Red Altitude Crest */}
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                background: 'linear-gradient(135deg, #1E222B 0%, #0E1015 100%)',
                border: '1.5px solid #FFD700',
                boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px'
              }}>
                <Trophy size={20} color="#FFD700" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  color: '#FFFFFF',
                  lineHeight: 1.1
                }}>
                  THE ALTITUDE AWARDS
                </span>
                <span className="altitude-mono" style={{
                  fontSize: '0.62rem',
                  color: '#E31B2B',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  marginTop: '2px'
                }}>
                  OOU FUTURE TECH 2.0 • 2027
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav style={{ display: 'none' }} className="altitude-desktop-nav">
              <style>{`
                @media (min-width: 900px) {
                  .altitude-desktop-nav { display: flex !important; align-items: center; gap: 2rem; }
                }
              `}</style>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: 'var(--alt-secondary-text)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--alt-secondary-text)'}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              {handleReturn && (
                <button
                  type="button"
                  onClick={handleReturn}
                  className="altitude-btn altitude-btn-outline"
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.55rem 0.95rem',
                    gap: '0.45rem'
                  }}
                >
                  <ArrowLeft size={13} /> <span>FLIGHT FT2027</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  if (onNominateClick) onNominateClick();
                  else {
                    const el = document.getElementById('nominate');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="altitude-btn altitude-btn-primary"
                style={{
                  padding: '0.65rem 1.35rem',
                  fontSize: '0.8rem'
                }}
              >
                <span>NOMINATE</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation"
                style={{
                  background: '#15171C',
                  border: '1.5px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  borderRadius: '6px'
                }}
                className="altitude-mobile-burger"
              >
                <style>{`
                  @media (min-width: 900px) {
                    .altitude-mobile-burger { display: none !important; }
                  }
                `}</style>
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(8, 9, 12, 0.98)',
          backdropFilter: 'blur(20px)',
          zIndex: 9999,
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Trophy size={22} color="#FFD700" />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '1.1rem', color: '#FFFFFF' }}>
                  THE ALTITUDE AWARDS
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: '#15171C',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  borderRadius: '8px'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={18} color="#E31B2B" />
                </a>
              ))}
            </nav>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('nominate');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="altitude-btn altitude-btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              NOMINATE SOMEONE
            </button>
            {handleReturn && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleReturn();
                }}
                className="altitude-btn altitude-btn-outline"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <ArrowLeft size={16} /> RETURN TO FLIGHT FT2027
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
