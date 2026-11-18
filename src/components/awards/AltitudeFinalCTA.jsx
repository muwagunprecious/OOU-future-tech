import React from 'react';
import { ArrowRight, Sparkles, Award, Trophy } from 'lucide-react';

export default function AltitudeFinalCTA({ onNominateClick, onExploreCategoriesClick }) {
  return (
    <section className="altitude-section" style={{
      background: 'radial-gradient(ellipse at 50% 100%, #1A0D10 0%, #08090C 70%)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: 'clamp(4.5rem, 7vw, 6.5rem) 0'
    }}>
      {/* Background ambient crimson and gold aura */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'clamp(350px, 70vw, 850px)',
        height: '300px',
        background: 'radial-gradient(ellipse at center, rgba(227, 27, 43, 0.25) 0%, rgba(255, 215, 0, 0.12) 45%, transparent 75%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="altitude-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div className="altitude-subhead" style={{ justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Award size={14} className="altitude-text-gold" />
            <span>THE FLIGHT EDITION // CALL TO CONFERMENT</span>
          </div>

          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.6rem, 6vw, 4.8rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: '1.25rem',
            letterSpacing: '-0.03em',
            color: '#FFFFFF'
          }}>
            EXCELLENCE DESERVES <span style={{ color: '#FF3B4D' }}>RECOGNITION.</span>
          </h2>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
            color: '#E2E8F0',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '620px',
            margin: '0 auto 2.5rem auto',
            fontFamily: 'Inter, sans-serif'
          }}>
            Help us celebrate the builders, creators, and innovators shaping African technology.
          </p>

          <div style={{
            display: 'flex',
            gap: '1.25rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <button
              onClick={onNominateClick}
              className="altitude-btn altitude-btn-primary"
              style={{
                fontSize: '0.92rem',
                padding: '1.05rem 2.25rem',
                boxShadow: '0 10px 35px rgba(227, 27, 43, 0.5)'
              }}
            >
              <Trophy size={18} />
              <span>NOMINATE SOMEONE</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={onExploreCategoriesClick}
              className="altitude-btn altitude-btn-outline"
              style={{
                fontSize: '0.92rem',
                padding: '1.05rem 2.25rem'
              }}
            >
              <span>EXPLORE CATEGORIES</span>
            </button>
          </div>

          <div className="altitude-mono" style={{
            marginTop: '3.5rem',
            fontSize: '0.78rem',
            color: '#E2E8F0',
            fontWeight: 700,
            letterSpacing: '0.12em'
          }}>
            2 APRIL 2027 • OOU FUTURE TECH CONFERENCE • THE FLIGHT EDITION
          </div>

        </div>
      </div>
    </section>
  );
}
