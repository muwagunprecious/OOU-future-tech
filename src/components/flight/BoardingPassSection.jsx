import React, { useState } from 'react';
import { Plane, ArrowRight, CheckCircle2, Ticket, Shield } from 'lucide-react';

export default function BoardingPassSection({ onRegister }) {
  const [ticketClass, setTicketClass] = useState('Standard');
  const [previewName, setPreviewName] = useState('ADEOLA BAKARE');

  return (
    <section id="boarding-pass" className="flight-section alt-bg" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="flight-container">
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '2rem',
          marginBottom: '3.5rem'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FFFFFF',
              border: '2px solid #000000',
              boxShadow: '3px 3px 0 #000000',
              borderRadius: '9999px',
              padding: '0.4rem 1rem',
              marginBottom: '1.25rem'
            }}>
              <span className="flight-status-dot" />
              <span className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000' }}>
                DIGITAL TICKETING • PASSENGER SEAT ALLOCATION
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1,
              margin: 0,
              color: '#000000'
            }}>
              CLAIM YOUR BOARDING PASS.
            </h2>
          </div>
          <p style={{
            fontSize: '1.05rem',
            color: '#475569',
            maxWidth: '520px',
            margin: 0,
            lineHeight: 1.6
          }}>
            Secure your passage on Flight FT2027. Select your class of travel, customize your digital passenger pass, and reserve your seat.
          </p>
        </div>

        {/* 3D Class Selector & Personalizer Controls */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Class Switcher Pill Group */}
          <div style={{
            display: 'inline-flex',
            background: '#FFFFFF',
            padding: '4px',
            borderRadius: '9999px',
            border: '2px solid #000000',
            boxShadow: '4px 4px 0 #000000'
          }}>
            <button
              type="button"
              onClick={() => setTicketClass('Standard')}
              style={{
                background: ticketClass === 'Standard' ? 'var(--color-airline-red)' : 'transparent',
                color: ticketClass === 'Standard' ? '#FFFFFF' : '#000000',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.04em',
                padding: '0.65rem 1.4rem',
                borderRadius: '9999px',
                border: ticketClass === 'Standard' ? '1.5px solid #000' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              GENERAL PASS (STUDENT)
            </button>
            <button
              type="button"
              onClick={() => setTicketClass('Pro')}
              style={{
                background: ticketClass === 'Pro' ? 'var(--color-airline-red)' : 'transparent',
                color: ticketClass === 'Pro' ? '#FFFFFF' : '#000000',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.04em',
                padding: '0.65rem 1.4rem',
                borderRadius: '9999px',
                border: ticketClass === 'Pro' ? '1.5px solid #000' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              INDUSTRY & VIP STAND
            </button>
          </div>

          {/* Passenger Name Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000' }}>
              PASSENGER PREVIEW:
            </span>
            <input
              type="text"
              value={previewName}
              onChange={(e) => setPreviewName(e.target.value.toUpperCase())}
              placeholder="YOUR NAME"
              style={{
                background: '#FFFFFF',
                border: '2px solid #000000',
                boxShadow: '3px 3px 0 #000000',
                color: '#000000',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                fontWeight: 700,
                padding: '0.55rem 1rem',
                borderRadius: '6px',
                outline: 'none',
                width: '180px'
              }}
            />
          </div>
        </div>

        {/* 3D Physical Boarding Pass */}
        <div className="flight-pass-3d">
          
          {/* Perforation Cutouts */}
          <div className="flight-pass-3d-notch-top" />
          <div className="flight-pass-3d-notch-bottom" />
          <div className="flight-pass-3d-perforation" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))'
          }}>
            
            {/* Left / Main Boarding Ticket */}
            <div style={{
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              borderRight: '2px solid #E2E8F0',
              background: '#FFFFFF',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Subtle Airplane Silhouette Watermark */}
              <div style={{
                position: 'absolute',
                right: '-40px',
                bottom: '-30px',
                opacity: 0.04,
                pointerEvents: 'none',
                color: '#000000',
                transform: 'rotate(-25deg)'
              }}>
                <Plane size={360} />
              </div>
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                borderBottom: '2px solid #000000',
                paddingBottom: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <img
                    src="/conference-logo.png"
                    alt="OOU FutureTech"
                    style={{
                      height: '44px',
                      width: 'auto',
                      borderRadius: '8px',
                      border: '2px solid #000000',
                      boxShadow: '2px 2px 0 #000000',
                      objectFit: 'contain'
                    }}
                  />
                  <div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 950, fontSize: '1.2rem', color: '#000000', display: 'block', lineHeight: 1 }}>
                      OOU FUTURETECH
                    </span>
                    <span className="flight-mono" style={{ fontSize: '0.68rem', color: 'var(--color-airline-red)', fontWeight: 800 }}>
                      FLIGHT EDITION • OFFICIAL BOARDING PASS
                    </span>
                  </div>
                </div>

                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  background: 'var(--color-airline-red)',
                  border: '2px solid #000000',
                  boxShadow: '2px 2px 0 #000000',
                  padding: '0.35rem 0.8rem',
                  borderRadius: '9999px'
                }}>
                  {ticketClass === 'Pro' ? 'CLASS: INDUSTRY PRO' : 'CLASS: GENERAL ADMISSION'}
                </span>
              </div>

              {/* Origin to Destination Route */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: '2.5rem'
              }}>
                <div>
                  <span className="flight-mono" style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 800, display: 'block', marginBottom: '2px' }}>
                    FROM (ORIGIN)
                  </span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 950, color: '#000000', display: 'block', lineHeight: 1 }}>
                    OOU
                  </span>
                  <span className="flight-mono" style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 700 }}>
                    AGO-IWOYE, NIGERIA
                  </span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div className="flight-mono" style={{ fontSize: '0.72rem', color: 'var(--color-airline-red)', fontWeight: 800, marginBottom: '4px' }}>
                    FLIGHT FT2027
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-airline-red)' }}>
                    <span style={{ width: '30px', height: '2px', background: '#000000' }} />
                    <Plane size={18} color="#000" />
                    <span style={{ width: '30px', height: '2px', background: '#000000' }} />
                  </div>
                  <span className="flight-mono" style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 700 }}>
                    NON-STOP
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="flight-mono" style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 800, display: 'block', marginBottom: '2px' }}>
                    TO (DESTINATION)
                  </span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 950, color: 'var(--color-airline-red)', display: 'block', lineHeight: 1 }}>
                    FUTURE
                  </span>
                  <span className="flight-mono" style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 700 }}>
                    GLOBAL TECH ECOSYSTEM
                  </span>
                </div>
              </div>

              {/* Passenger & Gate Parameters */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1.25rem',
                padding: '1.5rem',
                background: '#F8FAFC',
                borderRadius: '1rem',
                border: '2px solid #000000',
                boxShadow: '3px 3px 0 #000000',
                marginBottom: '2rem'
              }}>
                <div>
                  <span className="flight-mono" style={{ fontSize: '0.62rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                    PASSENGER
                  </span>
                  <span className="flight-mono" style={{ fontSize: '0.95rem', fontWeight: 900, color: '#000000' }}>
                    {previewName || 'ATTENDEE'}
                  </span>
                </div>

                <div>
                  <span className="flight-mono" style={{ fontSize: '0.62rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                    DATE
                  </span>
                  <span className="flight-mono" style={{ fontSize: '0.95rem', fontWeight: 900, color: '#000000' }}>
                    02 APR 2027
                  </span>
                </div>

                <div>
                  <span className="flight-mono" style={{ fontSize: '0.62rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                    GATE
                  </span>
                  <span className="flight-mono" style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--color-airline-red)' }}>
                    FT-02
                  </span>
                </div>

                <div>
                  <span className="flight-mono" style={{ fontSize: '0.62rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                    SEAT
                  </span>
                  <span className="flight-mono" style={{ fontSize: '0.95rem', fontWeight: 900, color: '#000000' }}>
                    {ticketClass === 'Pro' ? '01A (PRIORITY)' : '14F (STANDARD)'}
                  </span>
                </div>
              </div>

              {/* Inclusions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                <span className="flight-mono" style={{ fontSize: '0.68rem', fontWeight: 800, color: '#000000' }}>
                  INCLUDED:
                </span>
                {(ticketClass === 'Pro' ? [
                  'Concourse Exhibition Stand',
                  'VIP Lounge Pass',
                  'Talent Recruitment Access'
                ] : [
                  'Main Auditorium Keynotes',
                  'Hands-on Masterclasses',
                  'Digital Boarding Credential'
                ]).map((inc) => (
                  <span key={inc} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#000000',
                    background: '#FFFFFF',
                    border: '1.5px solid #000000',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                    boxShadow: '1.5px 1.5px 0 #000'
                  }}>
                    <CheckCircle2 size={13} color="var(--color-airline-red)" />
                    {inc}
                  </span>
                ))}
              </div>
            </div>

            {/* Right / Tear-Off Stub */}
            <div style={{
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: '#F8FAFC'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '2px solid #000000',
                  paddingBottom: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <span className="flight-mono" style={{ fontSize: '0.75rem', color: 'var(--color-airline-red)', fontWeight: 900 }}>
                    BOARDING STUB
                  </span>
                  <span className="flight-mono" style={{ fontSize: '0.72rem', color: '#000000', fontWeight: 800 }}>
                    FT2027 / 02
                  </span>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <span className="flight-mono" style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                    PASSENGER
                  </span>
                  <span className="flight-mono" style={{ fontSize: '1.1rem', fontWeight: 900, color: '#000000', display: 'block' }}>
                    {previewName || 'ATTENDEE'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <span className="flight-mono" style={{ fontSize: '0.62rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                      FLIGHT
                    </span>
                    <span className="flight-mono" style={{ fontSize: '0.95rem', fontWeight: 900, color: '#000000' }}>
                      FT2027
                    </span>
                  </div>
                  <div>
                    <span className="flight-mono" style={{ fontSize: '0.62rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                      GATE
                    </span>
                    <span className="flight-mono" style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--color-airline-red)' }}>
                      FT-02
                    </span>
                  </div>
                </div>

                {/* Barcode */}
                <div style={{ marginBottom: '2rem' }}>
                  <span className="flight-mono" style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 800, display: 'block', marginBottom: '6px' }}>
                    ELECTRONIC MANIFEST CODE
                  </span>
                  <div style={{ display: 'flex', alignItems: 'stretch', height: '44px', gap: '2px' }}>
                    {[3, 1, 4, 1, 2, 4, 1, 3, 2, 5, 1, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 5, 2, 3, 1, 4].map((width, i) => (
                      <span
                        key={i}
                        style={{ width: `${width * 2}px`, background: '#000000', opacity: i % 4 === 0 ? 0.35 : 1 }}
                      />
                    ))}
                  </div>
                  <span className="flight-mono" style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 700, display: 'block', marginTop: '6px' }}>
                    ETKT 982-2027-OOU-AFRICA
                  </span>
                </div>
              </div>

              {/* 3D Action Button */}
              <div>
                <button
                  type="button"
                  className="flight-btn-red"
                  onClick={() => onRegister(ticketClass)}
                  style={{
                    width: '100%',
                    padding: '1.15rem',
                    fontSize: '0.95rem',
                    justifyContent: 'center'
                  }}
                >
                  RESERVE YOUR SEAT
                  <ArrowRight size={18} />
                </button>
                <p className="flight-mono" style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700, textAlign: 'center', marginTop: '0.6rem', margin: '0.6rem 0 0 0' }}>
                  INSTANT DIGITAL TICKET ISSUANCE
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
