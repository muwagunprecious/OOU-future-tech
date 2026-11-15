import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function DepartureBoard() {
  const departures = [
    {
      code: 'TRACK 01',
      title: 'DIGITAL INNOVATION',
      desc: 'Scalable cloud infrastructure, sovereign African software platforms, and distributed engineering paradigms.',
      gate: 'GATE 01',
      status: 'BOARDING',
      statusType: 'active'
    },
    {
      code: 'TRACK 02',
      title: 'ARTIFICIAL INTELLIGENCE',
      desc: 'Autonomous agents, localized LLMs, computational computer vision, and frontier machine intelligence.',
      gate: 'GATE 02',
      status: 'ON SCHEDULE',
      statusType: 'confirmed'
    },
    {
      code: 'TRACK 03',
      title: 'FINANCIAL TECHNOLOGY',
      desc: 'Cross-border liquidity, modern payment rails, open banking APIs, and financial sovereignty for emerging markets.',
      gate: 'GATE 03',
      status: 'CONFIRMED',
      statusType: 'confirmed'
    },
    {
      code: 'TRACK 04',
      title: 'AGRICULTURAL TECHNOLOGY',
      desc: 'Satellite data telemetry, predictive crop modeling, climate resilience, and algorithmic agri-supply chains.',
      gate: 'GATE 04',
      status: 'ON SCHEDULE',
      statusType: 'confirmed'
    },
    {
      code: 'TRACK 05',
      title: 'WEB3 AND EMERGING TECHNOLOGIES',
      desc: 'Decentralized compute, zero-knowledge verifiable credentials, smart contract systems, and digital property rights.',
      gate: 'GATE 05',
      status: 'BOARDING',
      statusType: 'active'
    },
    {
      code: 'TRACK 06',
      title: 'CREATIVE ECONOMY',
      desc: 'Digital product design, 3D visualization, interactive media, and global monetization channels for African creators.',
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
            maxWidth: '520px',
            margin: 0,
            lineHeight: 1.6
          }}>
            Your journey towards the future begins with understanding where we are going. Review our primary flight tracks and technological destinations.
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

                {/* Track Details */}
                <div>
                  <h3 style={{
                    fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
                    margin: '0 0 0.35rem 0',
                    color: '#000000'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.94rem',
                    color: '#475569',
                    margin: 0,
                    lineHeight: 1.55,
                    maxWidth: '850px'
                  }}>
                    {item.desc}
                  </p>
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
