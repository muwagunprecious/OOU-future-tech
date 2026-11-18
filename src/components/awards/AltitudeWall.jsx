import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, Eye, ExternalLink, Award, Star, Quote } from 'lucide-react';
import AltitudeNomineeModal from './AltitudeNomineeModal';

export default function AltitudeWall({ featuredNominees = [], onExploreAll }) {
  const [modalNominee, setModalNominee] = useState(null);

  const displayItems = featuredNominees.length > 0 ? featuredNominees : [
    {
      id: 'preview-1',
      nominee_name: 'Damilola Adebayo',
      category: 'Student Developer of the Year',
      category_code: 'TECH-01',
      category_group: 'TECHNOLOGY & INNOVATION',
      organization: 'Olabisi Onabanjo University',
      current_role: 'Lead Systems Architect & Core Contributor',
      achievement: 'Architected a decentralized credential vault for 14,000+ student micro-certifications.',
      why_win: 'Solves deep infrastructure challenges in campus connectivity.',
      image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_preview: true
    },
    {
      id: 'preview-2',
      nominee_name: 'Faith Okonjo',
      category: 'Digital Creator of the Year',
      category_code: 'CREAT-01',
      category_group: 'CREATIVE EXCELLENCE',
      organization: 'Faculty of Arts & Digital Media',
      current_role: 'Creative Director & 3D Visualizer',
      achievement: 'Created an immersive 3D Yoruba mythological narrative series with 2.4M+ global views.',
      why_win: 'Elevates indigenous African lore into contemporary cinematic animation.',
      image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_preview: true
    },
    {
      id: 'preview-3',
      nominee_name: 'Oluwaseun Balogun',
      category: 'AI Innovator of the Year',
      category_code: 'TECH-02',
      category_group: 'TECHNOLOGY & INNOVATION',
      organization: 'Department of Computer Science',
      current_role: 'Machine Learning Researcher',
      achievement: 'Developed an edge-compatible crop pathogen detection model for local farming cooperatives.',
      why_win: 'Bridges frontier algorithmic AI with grassroots socioeconomic impact.',
      image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_preview: true
    }
  ];

  return (
    <section id="altitude-wall" className="altitude-section" style={{ background: '#08090C', position: 'relative', overflow: 'hidden' }}>
      <div className="altitude-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '3.5rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
          <div>
            <div className="altitude-subhead" style={{ marginBottom: '0.65rem' }}>
              <Star size={14} className="altitude-text-gold" />
              <span>THE HALL OF DISTINCTION // EDITORIAL SPOTLIGHT</span>
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.05,
              margin: '0 0 0.35rem 0',
              fontWeight: 900,
              color: '#FFFFFF'
            }}>
              THE ALTITUDE <span style={{ color: '#FF3B4D' }}>WALL</span>
            </h2>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
              color: '#FFD700',
              fontWeight: 700
            }}>
              The People Taking Africa Higher.
            </div>
          </div>

          <div style={{ maxWidth: '440px' }}>
            <p style={{ margin: '0 0 1rem 0', color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.5 }}>
              Curated editorial showcase of exceptional African talent.
            </p>
            {onExploreAll && (
              <button 
                onClick={onExploreAll}
                className="altitude-btn altitude-btn-outline"
                style={{ fontSize: '0.8rem', padding: '0.65rem 1.35rem' }}
              >
                <span>EXPLORE ALL APPROVED NOMINEES</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* The Wall Grid: High Contrast, Minimal One-Liners */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
          gap: '2rem'
        }}>
          {displayItems.map((nominee, idx) => (
            <div 
              key={nominee.id || idx}
              className="altitude-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                padding: 0,
                position: 'relative',
                background: '#14171F',
                border: '1.5px solid rgba(255, 215, 0, 0.4)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8)'
              }}
            >
              {/* Photo Header */}
              <div style={{
                position: 'relative',
                height: '380px',
                width: '100%',
                overflow: 'hidden',
                background: '#0D0F14'
              }}>
                <img 
                  src={nominee.image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'} 
                  alt={nominee.nominee_name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(108%)'
                  }}
                />

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(8, 9, 12, 0.1) 0%, rgba(8, 9, 12, 0.45) 45%, rgba(8, 9, 12, 0.96) 100%)',
                  pointerEvents: 'none'
                }} />

                {/* Top Badges */}
                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  right: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span className="altitude-tag altitude-tag-gold" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.8)' }}>
                    [{nominee.category_code || 'HONORIS'}] {nominee.category}
                  </span>

                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#E31B2B',
                    color: '#FFFFFF',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '0.35rem 0.65rem',
                    borderRadius: '4px'
                  }}>
                    <Star size={11} fill="#FFFFFF" /> INDUCTEE
                  </span>
                </div>

                {/* Name & Title on bottom of photo */}
                <div style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.25rem',
                  right: '1.25rem'
                }}>
                  <div className="altitude-mono" style={{ fontSize: '0.72rem', color: '#FFD700', letterSpacing: '0.08em', marginBottom: '0.2rem', fontWeight: 700 }}>
                    {nominee.organization}
                  </div>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    margin: 0,
                    textShadow: '0 2px 8px rgba(0,0,0,0.9)'
                  }}>
                    {nominee.nominee_name}
                  </h3>
                  <div style={{ fontSize: '0.88rem', color: '#E2E8F0', marginTop: '0.2rem', fontWeight: 600 }}>
                    {nominee.current_role}
                  </div>
                </div>
              </div>

              {/* Card Body (High Contrast, One-Liners) */}
              <div style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                background: '#14171F'
              }}>
                <div>
                  <div className="altitude-mono" style={{ fontSize: '0.7rem', color: '#FFD700', marginBottom: '0.35rem', fontWeight: 800 }}>
                    // VERIFIED ACHIEVEMENT
                  </div>
                  <p style={{
                    color: '#FFFFFF',
                    fontSize: '0.92rem',
                    lineHeight: 1.5,
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '1.25rem',
                    fontWeight: 600
                  }}>
                    "{nominee.achievement}"
                  </p>

                  <div className="altitude-mono" style={{ fontSize: '0.7rem', color: '#FF3B4D', marginBottom: '0.35rem', fontWeight: 800 }}>
                    // JURY STATEMENT
                  </div>
                  <p style={{
                    color: '#CBD5E1',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                    margin: '0 0 1.5rem 0'
                  }}>
                    {nominee.why_win}
                  </p>
                </div>

                <div style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span className="altitude-mono" style={{ fontSize: '0.72rem', color: '#FFFFFF', fontWeight: 700 }}>
                    ALTITUDE VERIFIED
                  </span>

                  <button
                    onClick={() => setModalNominee(nominee)}
                    className="altitude-btn altitude-btn-outline"
                    style={{ fontSize: '0.75rem', padding: '0.55rem 1.15rem' }}
                  >
                    <Eye size={13} />
                    <span>VIEW DOSSIER</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalNominee && (
        <AltitudeNomineeModal 
          nominee={modalNominee} 
          onClose={() => setModalNominee(null)} 
        />
      )}
    </section>
  );
}
