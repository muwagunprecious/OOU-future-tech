import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function FlightTicketCard({
  ticketId = 'FT2027-4821',
  name = 'ADEOLA BAKARE',
  email = 'attendee@ooufuturetech.com',
  ticketClass = 'Standard',
  price = '₦0',
  className = '',
  style = {}
}) {
  const isPro = ticketClass === 'Pro' || ticketClass === 'Platinum' || ticketClass === 'VIP';
  const displayClassTitle = isPro ? 'PLATINUM' : 'STUDENT PASS';
  const displayClassLabel = isPro ? 'PARTNERSHIP CLASS' : 'PASSENGER CLASS';
  const displayPrice = isPro ? (price !== '₦0' ? price : '₦50,000') : (price !== '₦0' ? price : '₦0');
  const classCode = isPro ? '01' : '02';

  // Construct official verification URL encoded in the QR code
  // When scanned with any smartphone camera, it opens the verification portal on the domain
  const siteOrigin = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'https://ooufuturetech.com';
  
  const verifyUrl = `${siteOrigin}/?verify=${encodeURIComponent(ticketId)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&type=${encodeURIComponent(ticketClass)}`;

  return (
    <div
      className={`flight-ticket-stub-card ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        maxWidth: '780px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        border: '3px solid #000000',
        borderRadius: '1.25rem',
        boxShadow: '10px 10px 0 #000000',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Top Red Accent Stripe (matching reference) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '6px',
        backgroundColor: 'var(--color-airline-red)',
        zIndex: 3
      }} />

      {/* Main Ticket Body (Left Side - White Background) */}
      <div style={{
        flex: '1 1 380px',
        padding: 'clamp(1.75rem, 3.5vw, 2.4rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#FFFFFF',
        position: 'relative',
        minHeight: '280px'
      }}>
        {/* Top Header */}
        <div>
          <div className="flight-mono" style={{
            fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
            fontWeight: 900,
            color: '#000000',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            OOU FUTURETECH
          </div>

          <div className="flight-mono" style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#475569',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.35rem'
          }}>
            {displayClassLabel}
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 950,
            color: '#000000',
            lineHeight: 1,
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase'
          }}>
            {displayClassTitle}
          </h2>

          {/* Bold Price Display */}
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
            fontWeight: 950,
            color: '#000000',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            margin: '0.5rem 0 1.25rem 0'
          }}>
            {displayPrice}
          </div>
        </div>

        {/* Passenger Accreditation Info */}
        <div style={{
          borderTop: '2px dashed #CBD5E1',
          paddingTop: '1rem',
          marginTop: '0.5rem'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            marginBottom: '0.75rem'
          }}>
            <div>
              <span className="flight-mono" style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                PASSENGER MANIFEST
              </span>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 900, color: '#000000' }}>
                {name || 'ADEOLA BAKARE'}
              </strong>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className="flight-mono" style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                TICKET SERIAL
              </span>
              <span className="flight-mono" style={{ fontSize: '0.92rem', fontWeight: 900, color: 'var(--color-airline-red)' }}>
                {ticketId}
              </span>
            </div>
          </div>

          <div className="flight-mono" style={{
            fontSize: 'clamp(0.72rem, 1.2vw, 0.85rem)',
            fontWeight: 900,
            color: '#000000',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            DESTINATION: THE FUTURE
          </div>
        </div>
      </div>

      {/* Center Tear-Off Perforation Line with Circular Cutout Notches */}
      <div style={{
        position: 'relative',
        width: '0px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 4
      }}>
        {/* Top Circular Notch Cutout (matching reference) */}
        <div style={{
          position: 'absolute',
          top: '-14px',
          left: '-14px',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundColor: '#000000',
          border: '3px solid #000000',
          zIndex: 5
        }} />

        {/* Vertical Dashed Perforation Line */}
        <div style={{
          position: 'absolute',
          top: '14px',
          bottom: '14px',
          left: '-1px',
          width: '2px',
          borderLeft: '2px dashed rgba(0, 0, 0, 0.45)'
        }} />

        {/* Bottom Circular Notch Cutout (matching reference) */}
        <div style={{
          position: 'absolute',
          bottom: '-14px',
          left: '-14px',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundColor: '#000000',
          border: '3px solid #000000',
          zIndex: 5
        }} />
      </div>

      {/* Right Ticket Stub (Solid Airline Red Background) */}
      <div style={{
        flex: '0 0 190px',
        backgroundColor: 'var(--color-airline-red)',
        color: '#FFFFFF',
        padding: '1.75rem 1.4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        minHeight: '280px',
        boxSizing: 'border-box'
      }}>
        {/* Flight Information */}
        <div style={{ width: '100%', textAlign: 'left' }}>
          <div className="flight-mono" style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: 'rgba(255, 255, 255, 0.85)',
            textTransform: 'uppercase'
          }}>
            FLIGHT
          </div>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.9rem',
            fontWeight: 950,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: '1rem'
          }}>
            FT2027
          </div>

          <div className="flight-mono" style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: 'rgba(255, 255, 255, 0.85)',
            textTransform: 'uppercase'
          }}>
            CLASS
          </div>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.35rem',
            fontWeight: 950,
            lineHeight: 1.05,
            color: '#FFFFFF',
            marginBottom: '1.25rem'
          }}>
            {classCode}
          </div>
        </div>

        {/* Verifiable QR Code Block */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          width: '100%'
        }}>
          {/* QR Code Container */}
          <div
            title="Scan with phone camera to verify passenger boarding credentials"
            style={{
              background: '#FFFFFF',
              padding: '6px',
              borderRadius: '8px',
              border: '2px solid #000000',
              boxShadow: '3px 3px 0 #000000',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <QRCodeSVG
              value={verifyUrl}
              size={90}
              level="M"
              bgColor="#FFFFFF"
              fgColor="#000000"
            />
          </div>

          {/* Date Label (matching reference "02 APR 27") */}
          <div className="flight-mono" style={{
            fontSize: '0.82rem',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '0.1em',
            textAlign: 'center',
            marginTop: '4px'
          }}>
            02 APR 27
          </div>
        </div>
      </div>
    </div>
  );
}
