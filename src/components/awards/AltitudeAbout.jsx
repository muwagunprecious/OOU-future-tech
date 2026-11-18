import React from 'react';
import { Lightbulb, Sparkles, Award, ArrowRight, Compass, ShieldCheck, ChevronRight } from 'lucide-react';

export default function AltitudeAbout({ onNominateClick }) {
  const pillars = [
    {
      num: '01',
      code: 'VECTOR 01 // COMPUTATION',
      title: 'INNOVATION',
      tagline: 'Engineering the Next Frontier',
      oneLiner: 'Disruptive software, artificial intelligence, and scalable technical architectures.',
      icon: Lightbulb,
      accent: '#FF3B4D',
      stats: '8 HONORS'
    },
    {
      num: '02',
      code: 'VECTOR 02 // AESTHETICS',
      title: 'CREATIVITY',
      tagline: 'Defining Visual & Digital Culture',
      oneLiner: 'Visual storytelling, 3D animation, typography, and digital brand direction.',
      icon: Sparkles,
      accent: '#FFD700',
      stats: '7 HONORS'
    },
    {
      num: '03',
      code: 'VECTOR 03 // LEADERSHIP',
      title: 'EXCELLENCE',
      tagline: 'Leadership & Ecosystem Impact',
      oneLiner: 'Campus leadership, engineering mentorship, and enduring ecosystem impact.',
      icon: Award,
      accent: '#FFFFFF',
      stats: '4 HONORS'
    }
  ];

  const evaluationSteps = [
    {
      step: 'STAGE 01',
      title: 'Public & Peer Nomination',
      oneLiner: 'Peer and public submissions backed by verifiable project evidence.'
    },
    {
      step: 'STAGE 02',
      title: 'Independent Jury Verification',
      oneLiner: 'Rigorous portfolio vetting by senior software and creative leads.'
    },
    {
      step: 'STAGE 03',
      title: 'Grand Gala Conferment',
      oneLiner: 'Official conferment and Ascending Wing Statuette induction on April 2.'
    }
  ];

  return (
    <section id="about" className="altitude-section" style={{ position: 'relative', overflow: 'hidden', background: '#08090C' }}>
      {/* Top Horizon Accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(227, 27, 43, 0.6), rgba(255, 215, 0, 0.6), transparent)'
      }} />

      <div className="altitude-container">
        {/* Section Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
          gap: 'clamp(2rem, 4vw, 3.5rem)',
          alignItems: 'center',
          marginBottom: '3.5rem'
        }}>
          <div>
            <div className="altitude-subhead" style={{ marginBottom: '1rem' }}>
              <Compass size={14} className="altitude-text-red" />
              <span>MISSION SPECIFICATION</span>
            </div>

            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: '0 0 1rem 0'
            }}>
              THE HEIGHTS OF <span style={{ color: '#FF3B4D' }}>EXCELLENCE.</span>
            </h2>

            <p style={{
              fontSize: '1.15rem',
              color: '#E2E8F0',
              lineHeight: 1.6,
              fontFamily: 'Inter, sans-serif',
              margin: '0 0 1rem 0',
              fontWeight: 500
            }}>
              Recognising exceptional talent across software engineering, digital media, and technology leadership.
            </p>

            <p style={{
              fontSize: '0.98rem',
              color: '#CBD5E1',
              lineHeight: 1.6,
              margin: 0
            }}>
              Validating Africa's greatest builders, designers, and innovators before global audiences.
            </p>
          </div>

          {/* Thesis Monolith Card */}
          <div style={{
            background: '#14171F',
            border: '2px solid #FFD700',
            borderRadius: '14px',
            padding: 'clamp(1.75rem, 3vw, 2.5rem)',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 215, 0, 0.12)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
            }}>
              <span className="altitude-mono" style={{ fontSize: '0.75rem', color: '#FFD700', fontWeight: 800 }}>
                // CORE DOCTRINE
              </span>
              <span className="altitude-tag altitude-tag-gold" style={{ fontSize: '0.68rem' }}>
                FLIGHT 2.0
              </span>
            </div>

            <blockquote style={{
              margin: '0 0 1.25rem 0',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
              fontWeight: 800,
              lineHeight: 1.25,
              color: '#FFFFFF'
            }}>
              "We believe that Africa's greatest export is its talent."
            </blockquote>

            <p style={{
              color: '#E2E8F0',
              fontSize: '0.95rem',
              lineHeight: 1.5,
              margin: '0 0 1.5rem 0'
            }}>
              Pure independent merit. Zero popular voting.
            </p>

            <button
              onClick={onNominateClick}
              className="altitude-btn altitude-btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '0.85rem' }}
            >
              <span>NOMINATE A DESERVING TALENT</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* 3 Pillars Grid - High Contrast, Single-Line Descriptions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem',
          marginBottom: '3.5rem'
        }}>
          {pillars.map((p) => {
            const IconComponent = p.icon;
            return (
              <div 
                key={p.num} 
                className="altitude-card"
                style={{
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#14171F',
                  border: '1.5px solid rgba(255, 255, 255, 0.22)'
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '2.5rem',
                      fontWeight: 900,
                      color: 'rgba(255, 255, 255, 0.25)',
                      lineHeight: 1
                    }}>
                      {p.num}
                    </span>

                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: `1.5px solid ${p.accent}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: p.accent
                    }}>
                      <IconComponent size={18} />
                    </div>
                  </div>

                  <div className="altitude-mono" style={{ fontSize: '0.72rem', color: p.accent, marginBottom: '0.35rem', fontWeight: 800 }}>
                    {p.code}
                  </div>

                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: '0.25rem'
                  }}>
                    {p.title}
                  </h3>

                  <div style={{
                    fontSize: '0.85rem',
                    fontFamily: "'Space Mono', monospace",
                    color: '#FFD700',
                    marginBottom: '0.85rem',
                    fontWeight: 700
                  }}>
                    {p.tagline}
                  </div>

                  {/* One-Line Description */}
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#E2E8F0',
                    lineHeight: 1.5,
                    margin: '0 0 1.5rem 0',
                    fontWeight: 500
                  }}>
                    {p.oneLiner}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                  fontSize: '0.75rem',
                  fontFamily: "'Space Mono', monospace"
                }}>
                  <span style={{ color: '#FFFFFF', fontWeight: 800 }}>{p.stats}</span>
                  <span style={{ color: p.accent, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    STANDARDS VERIFIED <ShieldCheck size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Step Timeline (One-Line Descriptions) */}
        <div style={{
          background: '#14171F',
          border: '1.5px solid rgba(255, 255, 255, 0.22)',
          borderRadius: '14px',
          padding: 'clamp(1.75rem, 3vw, 2.5rem)',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.75rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
            <div>
              <div className="altitude-mono" style={{ fontSize: '0.72rem', color: '#FFD700', fontWeight: 800 }}>
                // JURY CONFERMENT TIMELINE
              </div>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#FFFFFF',
                margin: '0.2rem 0 0 0'
              }}>
                The Flight Path to Conferment
              </h3>
            </div>
            <div className="altitude-mono" style={{ fontSize: '0.75rem', color: '#FFFFFF', fontWeight: 800, background: 'rgba(255,255,255,0.08)', padding: '0.3rem 0.75rem', borderRadius: '4px' }}>
              MERIT PROTOCOL • ZERO POPULAR VOTING
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem'
          }}>
            {evaluationSteps.map((step, idx) => (
              <div key={idx} style={{
                padding: '1.25rem 1.5rem',
                background: '#0C0F14',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.4rem'
                }}>
                  <span className="altitude-mono" style={{ fontSize: '0.72rem', color: '#FF3B4D', fontWeight: 800 }}>
                    {step.step}
                  </span>
                  <ChevronRight size={13} color="#FF3B4D" />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF' }}>
                    {step.title}
                  </span>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '0.88rem',
                  color: '#CBD5E1',
                  lineHeight: 1.5
                }}>
                  {step.oneLiner}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
