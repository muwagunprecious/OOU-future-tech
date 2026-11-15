import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function DepartureBoard() {
  const departures = [
    {
      code: 'TRACK 01',
      title: 'DIGITAL INNOVATION',
      desc: 'Cloud systems, sovereign African software platforms & distributed engineering.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80',
      gate: 'GATE 01',
      status: 'BOARDING',
      statusType: 'active'
    },
    {
      code: 'TRACK 02',
      title: 'ARTIFICIAL INTELLIGENCE',
      desc: 'Autonomous agents, localized LLMs & frontier machine learning.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      gate: 'GATE 02',
      status: 'ON SCHEDULE',
      statusType: 'confirmed'
    },
    {
      code: 'TRACK 03',
      title: 'FINANCIAL TECHNOLOGY',
      desc: 'Cross-border liquidity, open banking APIs & digital finance rails.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80',
      gate: 'GATE 03',
      status: 'CONFIRMED',
      statusType: 'confirmed'
    },
    {
      code: 'TRACK 04',
      title: 'AGRICULTURAL TECHNOLOGY',
      desc: 'Satellite telemetry, predictive crop modeling & algorithmic farming.',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=400&q=80',
      gate: 'GATE 04',
      status: 'ON SCHEDULE',
      statusType: 'confirmed'
    },
    {
      code: 'TRACK 05',
      title: 'WEB3 & EMERGING TECH',
      desc: 'Decentralized compute, zk-credentials & smart contract protocols.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&q=80',
      gate: 'GATE 05',
      status: 'BOARDING',
      statusType: 'active'
    },
    {
      code: 'TRACK 06',
      title: 'CREATIVE ECONOMY',
      desc: 'Digital product design, 3D media & global creator monetization.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80',
      gate: 'GATE 06',
      status: 'CONFIRMED',
      statusType: 'confirmed'
    }
  ];

  return (
    <section id="departures" className="flight-section" style={{ backgroundColor: '#FFFFFF' }}>
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
              background: '#F1F5F9',
              border: '2px solid #000000',
              boxShadow: '3px 3px 0 #000000',
              borderRadius: '9999px',
              padding: '0.4rem 1rem',
              marginBottom: '1.25rem'
            }}>
              <span className="flight-status-dot" />
              <span className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000' }}>
                FLIGHT INFORMATION • DEPARTURE MANIFEST
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              margin: 0,
              lineHeight: 1,
              color: '#000000'
            }}>
              FLIGHT INFORMATION.
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
            Explore the 6 primary technological flight corridors accelerating African talent to global leadership.
          </p>
        </div>

        {/* 3D Neo-Brutalist Departure Board Container */}
        <div className="flight-dep-board-3d">
          
          {/* Header Bar */}
          <div className="flight-dep-header-3d">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span className="flight-mono" style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.12em' }}>
                FT2027 DEPARTURE BOARD
              </span>
              <span className="flight-mono" style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                TIME: 09:00 WAT
              </span>
            </div>
            <div className="flight-mono" style={{ fontSize: '0.75rem', color: 'var(--color-airline-red)', fontWeight: 800 }}>
              ALL GATES CLOSING IN SEQUENCE
            </div>
          </div>

          {/* Rows */}
          <div>
            {departures.map((item) => (
              <div key={item.code} className="flight-dep-row-3d">
                
                {/* Track Code */}
                <div>
                  <span className="flight-mono" style={{
                    fontSize: '0.85rem',
                    fontWeight: 900,
                    color: 'var(--color-airline-red)',
                    display: 'block'
                  }}>
                    {item.code}
                  </span>
                  <span className="flight-mono" style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700 }}>
                    {item.gate}
                  </span>
                </div>

                {/* Track Details with Thumbnail Image */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    minWidth: '64px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '2px solid #000000',
                    boxShadow: '3px 3px 0 #000000',
                    flexShrink: 0
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                  <div style={{ flex: '1 1 200px' }}>
                    <h3 style={{
                      fontSize: 'clamp(1.15rem, 1.8vw, 1.4rem)',
                      margin: '0 0 0.25rem 0',
                      color: '#000000',
                      fontWeight: 900
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '0.92rem',
                      color: '#475569',
                      margin: 0,
                      lineHeight: 1.45
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Status Indicator */}
                <div style={{ textAlign: 'right' }}>
                  <span className={`flight-status-badge-3d ${item.statusType === 'active' ? 'active' : ''}`}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: item.statusType === 'active' ? '#FFFFFF' : '#000000',
                      display: 'inline-block'
                    }} />
                    {item.status}
                  </span>
                </div>

              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div style={{
            padding: '1.25rem 2rem',
            background: '#F1F5F9',
            borderTop: '2px solid #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <span className="flight-mono" style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700 }}>
              * FOCUS DESTINATIONS VERIFIED BY OOU TECH RESEARCH LABS
            </span>
            <span className="flight-mono" style={{ fontSize: '0.72rem', color: '#000000', fontWeight: 800 }}>
              DEPARTURE: 02 APRIL 2027
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
