import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Linkedin, 
  Instagram, 
  Globe, 
  Share2, 
  Check, 
  Award, 
  Building2, 
  MapPin, 
  Sparkles, 
  ShieldCheck,
  Briefcase
} from 'lucide-react';

export default function AltitudeNomineeModal({ nominee, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!nominee) return null;

  const handleShare = () => {
    const url = window.location.href.split('#')[0] + `#nominee-${nominee.id || nominee.reference_id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isTech = nominee.category_group === 'TECHNOLOGY & INNOVATION';
  const isCreative = nominee.category_group === 'CREATIVE EXCELLENCE';

  return (
    <div 
      className="altitude-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="altitude-modal-content">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="altitude-btn altitude-btn-ghost"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '40px',
            height: '40px',
            padding: 0,
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Left Column: Portrait & Quick Dossier */}
          <div style={{
            position: 'relative',
            background: '#0D0F14',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Image container */}
            <div style={{
              width: '100%',
              height: '380px',
              position: 'relative',
              overflow: 'hidden',
              background: '#15171C'
            }}>
              <img 
                src={nominee.image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'} 
                alt={nominee.nominee_name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(105%)'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(13, 15, 20, 0.95) 100%)'
              }} />

              {/* Status Badge */}
              <div style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                display: 'flex',
                gap: '0.5rem'
              }}>
                <span className="altitude-tag altitude-tag-gold" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.6)' }}>
                  OFFICIAL NOMINEE 2027
                </span>
                {nominee.is_featured && (
                  <span className="altitude-tag" style={{ background: '#E31B2B', color: '#FFFFFF', border: 'none' }}>
                    ALTITUDE WALL INDUCTEE
                  </span>
                )}
              </div>
            </div>

            {/* Quick Dossier Details */}
            <div style={{ padding: '2rem' }}>
              <div className="altitude-mono" style={{
                fontSize: '0.75rem',
                color: isTech ? '#E31B2B' : isCreative ? '#FFD700' : '#FFFFFF',
                marginBottom: '0.5rem',
                fontWeight: 700
              }}>
                [{nominee.category_code || 'HONORIS'}] // {nominee.category}
              </div>

              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '2rem',
                fontWeight: 700,
                color: '#FFFFFF',
                margin: '0 0 0.5rem 0',
                letterSpacing: '-0.02em'
              }}>
                {nominee.nominee_name}
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: 'var(--alt-secondary-text)',
                marginBottom: '1.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFFFFF' }}>
                  <Briefcase size={15} className="altitude-text-red" />
                  <span>{nominee.current_role}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Building2 size={15} style={{ color: 'rgba(255,255,255,0.5)' }} />
                  <span>{nominee.organization} {nominee.department ? `(${nominee.department})` : ''}</span>
                </div>
                {nominee.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={15} style={{ color: 'rgba(255,255,255,0.5)' }} />
                    <span>{nominee.location}</span>
                  </div>
                )}
              </div>

              {/* Verified Digital Presence */}
              <div style={{
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div className="altitude-mono" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>
                  VERIFIED CHANNELS
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {nominee.portfolio_url && (
                    <a 
                      href={nominee.portfolio_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="altitude-btn altitude-btn-ghost"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem' }}
                    >
                      <Globe size={13} />
                      <span>PORTFOLIO</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
                  {nominee.linkedin_url && (
                    <a 
                      href={nominee.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="altitude-btn altitude-btn-ghost"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem' }}
                    >
                      <Linkedin size={13} />
                      <span>LINKEDIN</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
                  {nominee.instagram_url && (
                    <span 
                      className="altitude-btn altitude-btn-ghost"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem', pointerEvents: 'none' }}
                    >
                      <Instagram size={13} />
                      <span>{nominee.instagram_url}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Share Action */}
              <div style={{ marginTop: '2rem' }}>
                <button
                  onClick={handleShare}
                  className="altitude-btn altitude-btn-outline"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '0.7rem' }}
                >
                  {copied ? <Check size={14} color="#2ED573" /> : <Share2 size={14} />}
                  <span>{copied ? 'PROFILE LINK COPIED' : 'SHARE NOMINEE PROFILE'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Merit Portfolio */}
          <div style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header / Institutional Stamp */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div className="altitude-subhead">
                <ShieldCheck size={14} className="altitude-text-gold" />
                <span>JURY MERIT RECORD // DOSSIER #{nominee.reference_id || 'ALT-2027'}</span>
              </div>
              <span className="altitude-mono" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                CONFERMENT: 2 APR 2027
              </span>
            </div>

            {/* Achievement Highlight */}
            <div>
              <div className="altitude-mono" style={{ fontSize: '0.75rem', color: '#E31B2B', marginBottom: '0.6rem' }}>
                // CORE VERIFIED ACHIEVEMENT
              </div>
              <p style={{
                fontSize: '1.15rem',
                lineHeight: 1.7,
                color: '#FFFFFF',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                margin: 0
              }}>
                "{nominee.achievement}"
              </p>
            </div>

            {/* Major Projects & Technical / Creative Artifacts */}
            {nominee.major_projects && (
              <div style={{
                padding: '1.5rem',
                background: 'rgba(8, 9, 12, 0.6)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <div className="altitude-mono" style={{ fontSize: '0.75rem', color: '#FFD700', marginBottom: '0.6rem' }}>
                  // MAJOR PROJECTS & INNOVATIONS
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  color: 'var(--alt-secondary-text)',
                  margin: 0,
                  whiteSpace: 'pre-line'
                }}>
                  {nominee.major_projects}
                </p>
              </div>
            )}

            {/* Impact, Recognition & Community Footprint */}
            {nominee.impact_recognition && (
              <div>
                <div className="altitude-mono" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.6rem' }}>
                  // MEASURABLE IMPACT & RECOGNITION
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  color: 'var(--alt-secondary-text)',
                  margin: 0,
                  whiteSpace: 'pre-line'
                }}>
                  {nominee.impact_recognition}
                </p>
              </div>
            )}

            {/* Jury Case: Why Should They Win */}
            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(227, 27, 43, 0.08), rgba(21, 23, 28, 0.8))',
              borderLeft: '3px solid #E31B2B',
              borderRadius: '0 8px 8px 0'
            }}>
              <div className="altitude-mono" style={{ fontSize: '0.75rem', color: '#E31B2B', marginBottom: '0.4rem' }}>
                // JURY ADVOCACY STATEMENT
              </div>
              <p style={{
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: '#FFFFFF',
                margin: 0,
                fontStyle: 'italic'
              }}>
                "{nominee.why_win}"
              </p>
            </div>

            {/* Evidence Links */}
            {nominee.evidence_links && (
              <div style={{
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <div className="altitude-mono" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>
                  // SUBMITTED EVIDENCE ARTIFACTS
                </div>
                <div style={{ fontSize: '0.85rem', color: '#FFD700', wordBreak: 'break-all' }}>
                  {nominee.evidence_links}
                </div>
              </div>
            )}

            {/* Institutional Seal Footnote */}
            <div style={{
              marginTop: 'auto',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.4)'
            }}>
              <span className="altitude-mono">OOU FUTURE TECH 2.0 // FLIGHT EDITION</span>
              <span className="altitude-mono" style={{ color: '#2ED573' }}>VERIFIED BY AWARDS JURY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
