import React from 'react';
import { Plane, Clock, MapPin, Zap } from 'lucide-react';

export default function FlightItinerary() {
  const itinerary = [
    {
      time: '08:00 WAT',
      stage: 'PASSENGER CHECK-IN',
      flightId: 'FT-CHK01',
      gate: 'MAIN CONCOURSE',
      title: 'Passenger Manifest Verification & Boarding Kit Collection',
      desc: 'Attendee badge accreditation, welcome kit distribution, networking coffee at the departure lounge, and opening media coverage.',
      category: 'CHECK-IN'
    },
    {
      time: '09:00 WAT',
      stage: 'BOARDING BEGINS',
      flightId: 'FT-BRD02',
      gate: 'GATE FT-02',
      title: 'Assembly & Pre-Flight Briefing',
      desc: 'General assembly of delegates and students in OGD Hall. Opening ceremonial welcome address from the OOU Tech Community leadership.',
      category: 'BOARDING'
    },
    {
      time: '10:00 WAT',
      stage: 'TAKE-OFF: OPENING CEREMONY',
      flightId: 'FT-LCH03',
      gate: 'MAIN STAGE',
      title: 'Keynote Address — Africa’s Next Export: Talent',
      desc: 'Official take-off with the Vice Chancellor of OOU and global technology visionaries on building Africa’s future engineering and creative workforce.',
      category: 'KEYNOTE'
    },
    {
      time: '11:00 WAT',
      stage: 'IN-FLIGHT CONVERSATIONS',
      flightId: 'FT-CON04',
      gate: 'STAGE A',
      title: 'Cruising Altitude: Building Global Tech from Africa',
      desc: 'Fireside sessions with tech unicorn founders, executive engineers, and design leaders on navigating international remote careers and cross-border software architecture.',
      category: 'IN-FLIGHT'
    },
    {
      time: '13:00 WAT',
      stage: 'CONNECTING FLIGHTS: PANEL SESSIONS',
      flightId: 'FT-PNL05',
      gate: 'GATES 01–06',
      title: 'Parallel Exploration Tracks',
      desc: 'Concurrent breakout masterclasses across Artificial Intelligence, FinTech Rails, Web3 Infrastructure, and the Creative Economy.',
      category: 'BREAKOUTS'
    },
    {
      time: '15:00 WAT',
      stage: 'ARRIVAL ANNOUNCEMENT',
      flightId: 'FT-ARR06',
      gate: 'MAIN STAGE',
      title: 'Touchdown: Student Innovation Awards & Final Declaration',
      desc: 'Startup pitch winners announcement, student innovation honors, venture incubator awards, and next phase launch for OOU FutureTech cohorts.',
      category: 'ARRIVAL'
    }
  ];

  return (
    <section id="itinerary" className="flight-section alt-bg" style={{ backgroundColor: '#F8FAFC' }}>
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
                FLIGHT PLAN • EVENT PROGRAMME
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1,
              margin: 0,
              color: '#000000'
            }}>
              YOUR FLIGHT ITINERARY.
            </h2>
          </div>
          <p style={{
            fontSize: '1.05rem',
            color: '#475569',
            maxWidth: '520px',
            margin: 0,
            lineHeight: 1.6
          }}>
            Review the sequenced stages of your journey. Timings reflect estimated flight duration and schedule checkpoints.
          </p>
        </div>

        {/* 3D Timeline Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {itinerary.map((item) => (
            <div
              key={item.flightId}
              className="flight-itinerary-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-3px, -3px)';
                e.currentTarget.style.boxShadow = '8px 8px 0 #000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '5px 5px 0 #000000';
              }}
            >
              {/* Time */}
              <div>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)',
                  fontWeight: 950,
                  color: '#000000',
                  display: 'block',
                  lineHeight: 1
                }}>
                  {item.time}
                </span>
                <span className="flight-mono" style={{
                  fontSize: '0.72rem',
                  color: 'var(--color-airline-red)',
                  fontWeight: 800,
                  marginTop: '6px',
                  display: 'block'
                }}>
                  {item.stage}
                </span>
              </div>

              {/* Title & Desc */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                  <span className="flight-mono" style={{
                    fontSize: '0.68rem',
                    color: '#000000',
                    background: '#F1F5F9',
                    border: '1.5px solid #000',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    fontWeight: 700
                  }}>
                    {item.flightId}
                  </span>
                  <span className="flight-mono" style={{
                    fontSize: '0.7rem',
                    color: '#64748B',
                    fontWeight: 700
                  }}>
                    {item.gate}
                  </span>
                </div>

                <h3 style={{
                  fontSize: 'clamp(1.2rem, 1.8vw, 1.45rem)',
                  margin: '0 0 0.35rem 0',
                  color: '#000000',
                  lineHeight: 1.25
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: '0.94rem',
                  color: '#475569',
                  margin: 0,
                  lineHeight: 1.55
                }}>
                  {item.desc}
                </p>
              </div>

              {/* Tag */}
              <div style={{ textAlign: 'right' }}>
                <span className="flight-mono" style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#000000',
                  background: '#FFFFFF',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '9999px',
                  border: '2px solid #000000',
                  boxShadow: '2px 2px 0 #000000',
                  display: 'inline-block'
                }}>
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="flight-mono" style={{
          fontSize: '0.75rem',
          color: '#64748B',
          fontWeight: 700,
          marginTop: '2.5rem',
          textAlign: 'center'
        }}>
          * TIMINGS ARE ESTIMATED FLIGHT PLAN CHECKPOINTS SUBJECT TO LIVE DEPARTURE ADJUSTMENTS ON APRIL 02, 2027
        </p>

      </div>
    </section>
  );
}
