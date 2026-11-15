import React from 'react';
import { ArrowRight, Mail, Plane, Sparkles, Navigation } from 'lucide-react';

export default function FinalCTA({ onRegister }) {
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
    <section className="flight-section" style={{
      backgroundColor: '#FFFFFF',
      padding: '5rem 0 6rem 0'
    }}>
      <div className="flight-container">
        
        {/* 3D Neo-Brutalist High Impact Closing Card with Night Runway & Jetliner Background */}
        <div style={{
          position: 'relative',
          backgroundColor: '#070709',
          backgroundImage: 'url("https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          border: '3px solid #000000',
          borderRadius: '2.5rem',
          boxShadow: '12px 12px 0 var(--color-airline-red)',
          padding: 'clamp(4rem, 7vw, 6.5rem) clamp(1.5rem, 4vw, 4rem)',
          textAlign: 'center',
          overflow: 'hidden'
        }}>
          {/* Dark Runway Atmospheric Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(7,7,9,0.88) 0%, rgba(7,7,9,0.72) 45%, rgba(7,7,9,0.94) 100%)',
            zIndex: 1
          }} />

          {/* Runway centerline lighting guides watermark */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(215, 25, 32, 0.25) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.6,
            pointerEvents: 'none',
            zIndex: 1
          }} />

          <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            
            {/* Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              background: '#FFFFFF',
              color: '#000000',
              border: '2px solid #000000',
              boxShadow: '4px 4px 0 var(--color-airline-red)',
              padding: '0.5rem 1.4rem',
              borderRadius: '9999px',
              marginBottom: '2rem'
            }}>
              <Plane size={16} color="var(--color-airline-red)" style={{ transform: 'rotate(-45deg)' }} />
              <span className="flight-mono" style={{ fontSize: '0.8rem', letterSpacing: '0.12em', fontWeight: 900 }}>
                FINAL CALL FOR BOARDING • GATE FT2027
              </span>
            </div>

            {/* Heading */}
            <h2 style={{
              fontSize: 'clamp(2.8rem, 7.5vw, 5.8rem)',
              fontWeight: 950,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
              margin: '0 0 1.5rem 0',
              textTransform: 'uppercase'
            }}>
              YOUR FUTURE <br />
              <span style={{
                color: 'var(--color-airline-red)',
                textDecoration: 'underline',
                textDecorationColor: '#FFFFFF',
                textUnderlineOffset: '8px'
              }}>
                IS BOARDING.
              </span>
            </h2>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              color: '#F1F5F9',
              lineHeight: 1.6,
              margin: '0 auto 3rem auto',
              maxWidth: '680px',
              fontWeight: 500
            }}>
              The next generation of African talent is not waiting for the future to happen. They are stepping onto the runway, boarding the flight, and building it.
            </p>

            {/* Dual CTAs */}
            <div className="flight-final-cta-buttons" style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem'
            }}>
              <button
                type="button"
                className="flight-btn-red"
                onClick={scrollToBoarding}
                style={{ padding: 'clamp(1rem, 2.5vw, 1.25rem) clamp(1.5rem, 4vw, 2.75rem)', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}
              >
                GET YOUR BOARDING PASS
                <ArrowRight size={20} />
              </button>

              <a
                href="mailto:ooufuturetech@gmail.com?subject=Partnership%20Enquiry%20Flight%20FT2027"
                className="flight-btn-outline"
                style={{
                  background: '#FFFFFF',
                  color: '#000000 !important',
                  padding: 'clamp(1rem, 2.5vw, 1.25rem) clamp(1.5rem, 4vw, 2.75rem)',
                  fontSize: 'clamp(0.95rem, 2vw, 1.05rem)'
                }}
              >
                <Mail size={20} /> PARTNER WITH US
              </a>
            </div>

            {/* Flight dispatch coordinates */}
            <div className="flight-mono" style={{
              fontSize: '0.78rem',
              color: '#CBD5E1',
              fontWeight: 800,
              marginTop: '3.5rem',
              letterSpacing: '0.08em'
            }}>
              DESTINATION: THE FUTURE • ORIGIN: OOU, NIGERIA • DATE: TO BE ANNOUNCED
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
