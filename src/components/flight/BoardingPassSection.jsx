import React, { useState } from 'react';
import { ArrowRight, Ticket, CheckCircle2 } from 'lucide-react';
import FlightTicketCard from './FlightTicketCard';

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
          marginBottom: '3rem'
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
            maxWidth: '480px',
            margin: 0,
            lineHeight: 1.5,
            fontWeight: 500
          }}>
            Secure your passage on Flight FT2027. Scan the QR code to verify passenger credentials in real time.
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

        {/* The Exact Reference Boarding Pass Ticket Stub */}
        <div style={{ marginBottom: '2.5rem' }}>
          <FlightTicketCard
            name={previewName || 'ADEOLA BAKARE'}
            ticketClass={ticketClass}
            ticketId="FT2027-4821"
            price={ticketClass === 'Pro' ? '₦50,000' : '₦0'}
          />
        </div>

        {/* CTA Reserve Button */}
        <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <button
            type="button"
            className="flight-btn-red"
            onClick={() => onRegister(ticketClass)}
            style={{
              width: '100%',
              padding: '1.2rem',
              fontSize: '1.05rem',
              justifyContent: 'center'
            }}
          >
            <Ticket size={20} />
            RESERVE YOUR OFFICIAL BOARDING PASS
            <ArrowRight size={20} />
          </button>
          <p className="flight-mono" style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800, marginTop: '0.75rem' }}>
            ✓ 100% VERIFIABLE QR CREDENTIALS • INSTANT GENERATION & DOWNLOAD
          </p>
        </div>

      </div>
    </section>
  );
}
