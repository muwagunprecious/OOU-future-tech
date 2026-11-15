import React from 'react';
import { Plane, Mail, MapPin, Calendar, Twitter, Linkedin, Github } from 'lucide-react';

export default function FlightFooter({ onViewChange, onAdmin }) {
  return (
    <footer style={{
      backgroundColor: '#FFFFFF',
      borderTop: '3px solid #000000',
      padding: '5rem 0 2.5rem 0',
      color: '#000000'
    }}>
      <div className="flight-container">
        
        {/* Top Airline Information Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          paddingBottom: '4rem',
          borderBottom: '2px solid #E2E8F0'
        }}>
          
          {/* Column 1: Brand & Flight Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'var(--color-airline-red)',
                borderRadius: '8px',
                border: '2px solid #000',
                boxShadow: '2px 2px 0 #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF'
              }}>
                <Plane size={18} style={{ transform: 'rotate(-45deg)' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 950, letterSpacing: '-0.02em' }}>
                OOU FUTURETECH
              </span>
            </div>

            <p style={{
              fontSize: '0.95rem',
              color: '#475569',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              maxWidth: '320px'
            }}>
              The premier annual convergence of African student builders, engineers, designers, and visionary tech entrepreneurs.
            </p>

            <div style={{
              display: 'inline-block',
              background: '#F1F5F9',
              border: '1.5px solid #000',
              boxShadow: '2px 2px 0 #000',
              padding: '0.3rem 0.8rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: 'var(--color-airline-red)'
            }}>
              FLIGHT FT2027 • EDITION 02
            </div>
          </div>

          {/* Column 2: Flight Dispatch & Venue */}
          <div>
            <span className="flight-mono" style={{ fontSize: '0.75rem', color: '#000000', fontWeight: 800, display: 'block', marginBottom: '1.2rem', letterSpacing: '0.1em' }}>
              DISPATCH & VENUE
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#1E293B', fontSize: '0.95rem', fontWeight: 600 }}>
                <Calendar size={18} color="var(--color-airline-red)" />
                <span>Friday, April 02, 2027</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', color: '#475569', fontSize: '0.95rem' }}>
                <MapPin size={18} color="var(--color-airline-red)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>OGD Hall, Olabisi Onabanjo University, Ago-Iwoye, Ogun State, Nigeria</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#1E293B', fontSize: '0.95rem', fontWeight: 600 }}>
                <Mail size={18} color="var(--color-airline-red)" />
                <a href="mailto:ooufuturetech@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                  ooufuturetech@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <span className="flight-mono" style={{ fontSize: '0.75rem', color: '#000000', fontWeight: 800, display: 'block', marginBottom: '1.2rem', letterSpacing: '0.1em' }}>
              NAVIGATION TERMINALS
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a href="#about" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 700 }} onMouseEnter={e => e.target.style.color = '#000'} onMouseLeave={e => e.target.style.color = '#475569'}>
                About The Flight
              </a>
              <a href="#destination" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 700 }} onMouseEnter={e => e.target.style.color = '#000'} onMouseLeave={e => e.target.style.color = '#475569'}>
                The Destination
              </a>
              <a href="#departures" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 700 }} onMouseEnter={e => e.target.style.color = '#000'} onMouseLeave={e => e.target.style.color = '#475569'}>
                Departures Manifest
              </a>
              <a href="#flight-crew" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 700 }} onMouseEnter={e => e.target.style.color = '#000'} onMouseLeave={e => e.target.style.color = '#475569'}>
                Flight Crew
              </a>
              <a href="#team" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 700 }} onMouseEnter={e => e.target.style.color = '#000'} onMouseLeave={e => e.target.style.color = '#475569'}>
                Ground Crew & Team
              </a>
              <a href="#itinerary" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 700 }} onMouseEnter={e => e.target.style.color = '#000'} onMouseLeave={e => e.target.style.color = '#475569'}>
                Flight Itinerary
              </a>
              <a href="#archives" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 700 }} onMouseEnter={e => e.target.style.color = '#000'} onMouseLeave={e => e.target.style.color = '#475569'}>
                2026 Event Archives
              </a>
              <a href="#boarding-pass" style={{ color: 'var(--color-airline-red)', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 900 }}>
                Claim Boarding Pass ➔
              </a>
            </div>
          </div>

          {/* Column 4: Operational Portals & Connect */}
          <div>
            <span className="flight-mono" style={{ fontSize: '0.75rem', color: '#000000', fontWeight: 800, display: 'block', marginBottom: '1.2rem', letterSpacing: '0.1em' }}>
              INTERNAL PORTALS
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
              <span
                onClick={() => onViewChange('founders')}
                style={{ cursor: 'pointer', color: '#475569', fontSize: '0.9rem', fontWeight: 700 }}
                onMouseEnter={e => e.target.style.color = '#000'}
                onMouseLeave={e => e.target.style.color = '#475569'}
              >
                Founders Club Directory
              </span>
              <span
                onClick={() => onAdmin('verify')}
                style={{ cursor: 'pointer', color: '#475569', fontSize: '0.9rem', fontWeight: 700 }}
                onMouseEnter={e => e.target.style.color = '#000'}
                onMouseLeave={e => e.target.style.color = '#475569'}
              >
                Verification Portal
              </span>
              <span
                onClick={() => onAdmin('admin')}
                style={{ cursor: 'pointer', color: '#475569', fontSize: '0.9rem', fontWeight: 700 }}
                onMouseEnter={e => e.target.style.color = '#000'}
                onMouseLeave={e => e.target.style.color = '#475569'}
              >
                Admin Flight Operations
              </span>
            </div>

            {/* 3D Social Buttons */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {[
                { icon: <Twitter size={18} />, href: 'https://twitter.com' },
                { icon: <Linkedin size={18} />, href: 'https://linkedin.com' },
                { icon: <Github size={18} />, href: 'https://github.com' }
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    border: '2px solid #000000',
                    boxShadow: '3px 3px 0 #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000000',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px, -2px)'; e.currentTarget.style.boxShadow = '5px 5px 0 #000'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '3px 3px 0 #000'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar with Required Official Statement */}
        <div style={{
          paddingTop: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              color: '#000000',
              fontWeight: 950,
              letterSpacing: '-0.01em',
              display: 'block',
              marginBottom: '4px'
            }}>
              OOU FUTURETECH 2027 — AFRICA'S NEXT EXPORT: TALENT.
            </span>
            <p className="flight-mono" style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, margin: 0 }}>
              © 2027 OOU FutureTech Conference. Organised by OOU Tech Community. All rights reserved.
            </p>
          </div>

          <div className="flight-mono" style={{ fontSize: '0.75rem', color: '#000000', fontWeight: 800 }}>
            AIRLINE CAMPAIGN • FLIGHT FT2027
          </div>
        </div>

      </div>
    </footer>
  );
}
