import React, { useState, useEffect } from 'react';
import { ArrowRight, Plane, Calendar, MapPin, Ticket } from 'lucide-react';

const PHRASES = [
  { full: "AFRICA'S NEXT EXPORT: TALENT.", prefixLen: 22 }, // "AFRICA'S NEXT EXPORT: " (white), "TALENT." (red)
  { full: "VISION 2030", prefixLen: 7 } // "VISION " (white), "2030" (red)
];

export default function FlightHero({ onRegister }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPhrase = PHRASES[phraseIndex];
  const fullText = currentPhrase.full;
  const prefixLength = currentPhrase.prefixLen;

  useEffect(() => {
    let timer;
    const typingSpeed = isDeleting ? 30 : 65;
    const pauseDelay = 3200;

    if (!isDeleting && displayedText === fullText) {
      // Full text typed, pause before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDelay);
    } else if (isDeleting && displayedText === '') {
      // Completed deleting, switch to next phrase and pause briefly before typing
      timer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }, 500);
    } else {
      // Step character
      timer = setTimeout(() => {
        const next = isDeleting
          ? fullText.slice(0, displayedText.length - 1)
          : fullText.slice(0, displayedText.length + 1);
        setDisplayedText(next);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, fullText]);

  const whitePart = displayedText.slice(0, prefixLength);
  const redPart = displayedText.length > prefixLength ? displayedText.slice(prefixLength) : '';

  const scrollToExplore = (e) => {
    e.preventDefault();
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBoarding = (e) => {
    e.preventDefault();
    const el = document.getElementById('boarding-pass');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onRegister();
    }
  };

  return (
    <section className="flight-hero" style={{
      position: 'relative',
      minHeight: '92vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '8.5rem',
      paddingBottom: '5rem',
      backgroundColor: '#070709',
      backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2400&q=85")',
      backgroundSize: 'cover',
      backgroundPosition: 'center 38%',
      backgroundRepeat: 'no-repeat',
      borderBottom: '3px solid #000000',
      overflow: 'hidden'
    }}>
      {/* Cinematic Dark Airline Atmosphere Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(7, 7, 10, 0.78) 0%, rgba(7, 7, 10, 0.62) 42%, rgba(7, 7, 10, 0.92) 100%)',
        zIndex: 1
      }} />

      {/* Aviation Radar & Crosshair Grid in the background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(215, 25, 32, 0.22) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.6,
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Decorative flight navigation coordinates watermark */}
      <div className="flight-hero-radar-nav" style={{
        position: 'absolute',
        top: '6rem',
        right: '2rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        fontWeight: 800,
        color: '#94A3B8',
        pointerEvents: 'none',
        lineHeight: 1.6,
        textAlign: 'right',
        userSelect: 'none',
        zIndex: 2
      }}>
        <div>NAV: OOU-FT2027 // WAYPOINT: ALPHA</div>
        <div>COORDINATES: 06° 56' 48" N, 03° 55' 12" E</div>
        <div>RADAR FREQ: 121.500 MHZ // TRANSPONDER: 2027</div>
      </div>

      <div className="flight-container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Hero Editorial Headlines & CTAs */}
        <div style={{
          maxWidth: '100%',
          marginBottom: '3.5rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'var(--color-airline-red)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.92rem',
            fontWeight: 950,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '0.4rem 1.1rem',
            borderRadius: '6px',
            border: '2px solid #000000',
            boxShadow: '3px 3px 0 #000000',
            marginBottom: '1.5rem'
          }}>
            <Plane size={16} style={{ transform: 'rotate(-45deg)' }} />
            <span>YOUR FUTURE IS BOARDING</span>
          </div>

          {/* Giant Editorial Heading with Typewriter Effect on a Single Straight Line */}
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', maxWidth: '100%', marginBottom: '2.5rem' }}>
            <h1 style={{
              fontSize: 'clamp(1.15rem, 4.2vw, 4.2rem)',
              fontWeight: 950,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#FFFFFF',
              margin: 0,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'baseline',
              flexWrap: 'nowrap',
              minHeight: '1.25em'
            }}>
              <span style={{ whiteSpace: 'pre' }}>{whitePart}</span>
              {redPart && (
                <span style={{
                  color: 'var(--color-airline-red)',
                  textDecoration: 'underline',
                  textDecorationColor: '#FFFFFF',
                  textUnderlineOffset: '8px'
                }}>
                  {redPart}
                </span>
              )}
              <span className="flight-typewriter-cursor">|</span>
            </h1>
          </div>

          {/* 3D Action Buttons */}
          <div className="flight-hero-cta-group" style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.25rem',
            marginBottom: '2rem'
          }}>
            <button
              type="button"
              className="flight-btn-red"
              onClick={scrollToBoarding}
              style={{ padding: '1.15rem 2.4rem', fontSize: '1rem' }}
            >
              <Ticket size={20} />
              GET YOUR BOARDING PASS
            </button>

            <button
              type="button"
              className="flight-btn-outline"
              onClick={scrollToExplore}
              style={{ padding: '1.15rem 2.4rem', fontSize: '1rem' }}
            >
              EXPLORE THE FLIGHT
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Micro flight dispatch notes */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#CBD5E1',
            flexWrap: 'wrap'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Calendar size={14} color="var(--color-airline-red)" /> APRIL 02, 2027
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={14} color="var(--color-airline-red)" /> OOU, AGO-IWOYE
            </span>
            <span>•</span>
            <span style={{ color: '#22C55E', fontWeight: 800 }}>GATE OPEN</span>
          </div>
        </div>

        {/* 3D Flight Information Panel (White card with 8px hard shadow) */}
        <div style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          borderRadius: '1.5rem',
          boxShadow: '8px 8px 0 var(--color-airline-red)',
          padding: '2rem 2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <div>
            <span className="flight-mono" style={{ fontSize: '0.68rem', color: 'var(--color-airline-red)', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
              FLIGHT NUMBER
            </span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 900, color: '#000000' }}>
              FT2027
            </span>
          </div>

          <div>
            <span className="flight-mono" style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
              DEPARTURE DATE
            </span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 900, color: '#000000' }}>
              APRIL 02, 2027
            </span>
          </div>

          <div>
            <span className="flight-mono" style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
              ORIGIN TERMINAL
            </span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 900, color: '#000000' }}>
              OOU, NIGERIA
            </span>
          </div>

          <div>
            <span className="flight-mono" style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
              FINAL DESTINATION
            </span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 900, color: '#000000' }}>
              THE FUTURE
            </span>
          </div>

          <div>
            <span className="flight-mono" style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
              GATE STATUS
            </span>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#DCFCE7',
              border: '2px solid #000000',
              boxShadow: '2px 2px 0 #000000',
              padding: '0.35rem 0.8rem',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '0.82rem',
              color: '#15803D'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} />
              BOARDING OPEN
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
