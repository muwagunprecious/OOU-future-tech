import React from 'react';
import { Award, ArrowUp, Plane, Trophy } from 'lucide-react';

export default function AltitudeFooter({ onBackToConference }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#060709',
      borderTop: '1px solid rgba(255, 255, 255, 0.12)',
      padding: '4rem 0 2rem 0',
      position: 'relative',
      color: '#E2E8F0'
    }}>
      <div className="altitude-container">
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
                color: '#08090C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(255, 215, 0, 0.35)'
              }}>
                <Trophy size={20} />
              </div>
              <div>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '0.04em'
                }}>
                  THE ALTITUDE AWARDS
                </span>
                <span style={{
                  display: 'block',
                  fontSize: '0.68rem',
                  fontFamily: "'Space Mono', monospace",
                  color: '#FFD700',
                  fontWeight: 800,
                  letterSpacing: '0.12em'
                }}>
                  CLASS OF 2027 // FLIGHT EDITION
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 0.85rem 0', color: '#E2E8F0' }}>
              Presented by <strong>OOU Future Tech Conference</strong>. Recognising Excellence. Celebrating Talent.
            </p>

            <div className="altitude-mono" style={{ fontSize: '0.75rem', color: '#FF3B4D', fontWeight: 800 }}>
              // 2 APRIL 2027 • CONFERMENT CEREMONY
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <div className="altitude-mono" style={{ fontSize: '0.75rem', color: '#FFFFFF', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '1rem' }}>
              PLATFORM DIRECTORY
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li>
                <a href="#about" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
                   onMouseOver={(e) => e.target.style.color = '#FFD700'} onMouseOut={(e) => e.target.style.color = '#E2E8F0'}>
                  About the Honors
                </a>
              </li>
              <li>
                <a href="#categories" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
                   onMouseOver={(e) => e.target.style.color = '#FFD700'} onMouseOut={(e) => e.target.style.color = '#E2E8F0'}>
                  19 Award Categories
                </a>
              </li>
              <li>
                <a href="#altitude-wall" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
                   onMouseOver={(e) => e.target.style.color = '#FFD700'} onMouseOut={(e) => e.target.style.color = '#E2E8F0'}>
                  The Altitude Wall (Hall of Fame)
                </a>
              </li>
              <li>
                <a href="#nominees" style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
                   onMouseOver={(e) => e.target.style.color = '#FFD700'} onMouseOut={(e) => e.target.style.color = '#E2E8F0'}>
                  Explore Approved Nominees
                </a>
              </li>
              <li>
                <a href="#nominate" style={{ color: '#FFD700', textDecoration: 'none', fontWeight: 800 }}>
                  Nominate a Deserving Talent →
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Return */}
          <div>
            <div className="altitude-mono" style={{ fontSize: '0.75rem', color: '#FFFFFF', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '1rem' }}>
              CONFERENCE INTEGRATION
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.5, margin: '0 0 1rem 0', color: '#CBD5E1' }}>
              The Altitude Awards is the signature honors evening of OOU Future Tech 2.0.
            </p>
            {onBackToConference && (
              <button
                onClick={onBackToConference}
                className="altitude-btn altitude-btn-outline"
                style={{ fontSize: '0.78rem', padding: '0.65rem 1.25rem' }}
              >
                <Plane size={14} color="#FF3B4D" />
                <span>RETURN TO MAIN CONFERENCE</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          fontSize: '0.82rem',
          color: '#CBD5E1'
        }}>
          <div>
            © 2027 OOU Future Tech Conference. The Altitude Awards is an official initiative under Future Tech 2.0.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span className="altitude-mono" style={{ fontSize: '0.72rem', color: '#2ED573', fontWeight: 700 }}>
              SYSTEM STATUS: READY
            </span>
            <button
              onClick={scrollToTop}
              className="altitude-btn altitude-btn-ghost"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
              title="Return to top"
            >
              <span>TOP</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
