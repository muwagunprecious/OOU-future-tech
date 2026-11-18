import React from 'react';
import { Trophy, Plane, ArrowDown, Sparkles, Compass, Shield, Award } from 'lucide-react';

export default function AltitudeHero({ onNominateClick, onExploreNomineesClick }) {
  return (
    <section style={{
      position: 'relative',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      padding: 'clamp(4.5rem, 8vw, 7rem) 0 clamp(3.5rem, 6vw, 5rem) 0',
      background: 'radial-gradient(ellipse at 50% 20%, #151821 0%, #08090C 75%)',
      overflow: 'hidden',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      {/* Background Grids & Atmospheric Red/Gold Glow */}
      <div className="altitude-flight-grid" />
      <div className="altitude-hero-glow" />

      {/* Subtle Crimson Horizontal Flight Horizon Line */}
      <div style={{
        position: 'absolute',
        top: '48%',
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(227, 27, 43, 0.5) 30%, rgba(255, 215, 0, 0.6) 50%, rgba(227, 27, 43, 0.5) 70%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Flight Waypoint Telemetry (Desktop) */}
      <div style={{
        position: 'absolute',
        top: '12%',
        right: '6%',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.72rem',
        color: '#CBD5E1',
        letterSpacing: '0.14em',
        pointerEvents: 'none',
        zIndex: 2,
        lineHeight: 1.8
      }} className="altitude-desktop-telemetry">
        <div>// WAYPOINT: ALT-2027 • RADIAL 042°</div>
        <div>// ALTITUDE: 42,000 FT • STRATOSPHERE</div>
        <div style={{ color: '#FF3B4D', fontWeight: 800 }}>// STATUS: NOMINATIONS OPEN</div>
      </div>

      <div className="altitude-container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 'clamp(2.5rem, 5vw, 4.5rem)',
          alignItems: 'center'
        }}>
          
          {/* Left Column: Minimal, High-Contrast Copy */}
          <div>
            {/* Aviation Presenter Capsule */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1.5px solid rgba(255, 255, 255, 0.3)',
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              marginBottom: '1.75rem',
              backdropFilter: 'blur(8px)'
            }}>
              <Plane size={13} color="#FF3B4D" style={{ transform: 'rotate(-45deg)' }} />
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '0.14em'
              }}>
                OOU FUTURE TECH 2.0 PRESENTS
              </span>
            </div>

            {/* Main Trophy Title */}
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(3rem, 7vw, 5.8rem)',
              margin: '0 0 0.85rem 0',
              color: '#FFFFFF',
              letterSpacing: '-0.035em',
              lineHeight: 0.96,
              fontWeight: 900
            }}>
              THE ALTITUDE <br />
              <span style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FFD700 45%, #FF3B4D 95%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                AWARDS 2027
              </span>
            </h1>

            {/* One-Line Tagline */}
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.2rem, 2.4vw, 1.7rem)',
              fontWeight: 800,
              color: '#FFD700',
              letterSpacing: '-0.01em',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}>
              <Sparkles size={20} color="#FFD700" style={{ flexShrink: 0 }} />
              <span>Recognising Excellence. Celebrating Talent.</span>
            </div>

            {/* Single-Line Summary */}
            <p style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: '#E2E8F0',
              lineHeight: 1.6,
              maxWidth: '560px',
              margin: '0 0 2rem 0',
              fontFamily: 'Inter, sans-serif'
            }}>
              Celebrating Africa's frontier builders, digital creators, and technology leaders.
            </p>

            {/* One-Line Event Specs Bar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.95rem 1.35rem',
              background: '#14171F',
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '8px',
              marginBottom: '2.5rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.7)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="altitude-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF3B4D' }}>
                  DATE:
                </span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>
                  2 APRIL 2027
                </span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="altitude-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#E2E8F0' }}>
                  VENUE:
                </span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>
                  OOU FUTURE TECH CONFERENCE
                </span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
              <span className="altitude-tag altitude-tag-red" style={{ fontSize: '0.68rem' }}>
                THE FLIGHT EDITION
              </span>
            </div>

            {/* Hero CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
              <button
                type="button"
                onClick={onNominateClick}
                className="altitude-btn altitude-btn-primary"
                style={{
                  padding: '1rem 2.25rem',
                  fontSize: '0.92rem'
                }}
              >
                <Trophy size={18} />
                <span>NOMINATE SOMEONE</span>
              </button>

              <button
                type="button"
                onClick={onExploreNomineesClick}
                className="altitude-btn altitude-btn-outline"
                style={{
                  padding: '1rem 2.25rem',
                  fontSize: '0.92rem'
                }}
              >
                <span>EXPLORE NOMINEES</span>
                <ArrowDown size={15} />
              </button>
            </div>
          </div>

          {/* Right Column: Physical Award Trophy Image */}
          <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '460px',
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid rgba(255, 215, 0, 0.6)',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 45px rgba(227, 27, 43, 0.3), 0 0 35px rgba(255, 215, 0, 0.25)',
              background: '#08090C'
            }}>
              {/* Generated Photorealistic Trophy Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 5',
                overflow: 'hidden',
                background: '#08090C'
              }}>
                <img
                  src="/altitude-trophy.jpg"
                  alt="The Altitude Award 2027 Physical Trophy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'contrast(108%) brightness(102%)'
                  }}
                />

                {/* Subtle Cinematic Vignette */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(8, 9, 12, 0.15) 0%, transparent 40%, rgba(8, 9, 12, 0.9) 100%)',
                  pointerEvents: 'none'
                }} />

                {/* Top Hallmark Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(8, 9, 12, 0.9)',
                  border: '1.5px solid #FFD700',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '6px'
                }}>
                  <Award size={14} color="#FFD700" />
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: '#FFD700',
                    letterSpacing: '0.1em'
                  }}>
                    OFFICIAL 2027 STATUETTE
                  </span>
                </div>

                {/* Top Right Edition Tag */}
                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: '#E31B2B',
                  color: '#FFFFFF',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '0.35rem 0.75rem',
                  borderRadius: '4px'
                }}>
                  FLIGHT 2.0
                </div>

                {/* Bottom Overlay: Plaque Description */}
                <div style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.25rem',
                  right: '1.25rem'
                }}>
                  <div className="altitude-mono" style={{ fontSize: '0.72rem', color: '#FFD700', marginBottom: '0.25rem', fontWeight: 700 }}>
                    HONORARY STATUETTE
                  </div>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    margin: 0
                  }}>
                    The Ascending Wing
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: '#E2E8F0', marginTop: '0.2rem' }}>
                    Solid 24K polished gold on brushed obsidian base
                  </div>
                </div>
              </div>

              {/* Strip Footer */}
              <div style={{
                padding: '1rem 1.25rem',
                background: '#14171F',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem'
              }}>
                <span className="altitude-mono" style={{ color: '#E2E8F0', fontWeight: 700 }}>
                  AEROSPACE GRADE CRAFT
                </span>
                <span className="altitude-mono" style={{ color: '#FF3B4D', fontWeight: 800 }}>
                  GALA: 02.04.2027
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Global Key Metrics Bar (High Contrast, One-Liners) */}
        <div style={{
          marginTop: '4rem',
          padding: '1.75rem 2rem',
          background: '#14171F',
          border: '1.5px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: 'rgba(227, 27, 43, 0.2)',
              border: '1.5px solid #FF3B4D',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.3rem'
            }}>
              19
            </div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>
                Award Categories
              </div>
              <div className="altitude-mono" style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>
                Tech • Creative • Special
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: 'rgba(255, 215, 0, 0.15)',
              border: '1.5px solid #FFD700',
              color: '#FFD700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Shield size={20} />
            </div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>
                100% Merit-Based
              </div>
              <div className="altitude-mono" style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>
                Independent Jury Review
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1.5px solid #FFFFFF',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Award size={20} />
            </div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>
                The Altitude Wall
              </div>
              <div className="altitude-mono" style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>
                Official Hall of Fame
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: 'rgba(46, 213, 115, 0.15)',
              border: '1.5px solid #2ED573',
              color: '#2ED573',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Compass size={20} />
            </div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>
                April 2, 2027
              </div>
              <div className="altitude-mono" style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>
                Grand Gala Ceremony
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
