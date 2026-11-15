import React from 'react';
import { Plane, Clock, MapPin, Zap } from 'lucide-react';

export default function FlightItinerary() {
  const itinerary = [
    {
      time: '08:00 WAT',
      stage: 'PASSENGER CHECK-IN',
      flightId: 'FT-CHK01',
      gate: 'MAIN CONCOURSE',
      title: 'Accreditation & Welcome Kit Collection',
      desc: 'Attendee badge verification, flight packs, and networking coffee in the departure lounge.',
      category: 'CHECK-IN'
    },
    {
      time: '09:00 WAT',
      stage: 'BOARDING BEGINS',
      flightId: 'FT-BRD02',
      gate: 'GATE FT-02',
      title: 'Pre-Flight Briefing & Delegate Assembly',
      desc: 'General assembly of delegates and student builders in OGD Hall with opening remarks.',
      category: 'BOARDING'
    },
    {
      time: '10:00 WAT',
      stage: 'TAKE-OFF: OPENING CEREMONY',
      flightId: 'FT-LCH03',
      gate: 'MAIN STAGE',
      title: 'Keynote Address — Africa’s Next Export: Talent',
      desc: 'Official take-off with the Vice Chancellor and global technology visionaries.',
      category: 'KEYNOTE'
    },
    {
      time: '11:00 WAT',
      stage: 'IN-FLIGHT CONVERSATIONS',
      flightId: 'FT-CON04',
      gate: 'STAGE A',
      title: 'Cruising Altitude: Building Global Tech',
      desc: 'Fireside sessions with tech unicorn founders, lead engineers, and product executives.',
      category: 'IN-FLIGHT'
    },
    {
      time: '13:00 WAT',
      stage: 'CONNECTING FLIGHTS',
      flightId: 'FT-PNL05',
      gate: 'GATES 01–06',
      title: 'Parallel Exploration Masterclasses',
      desc: 'Concurrent breakout tracks in Artificial Intelligence, FinTech, Web3, and Creative Design.',
      category: 'BREAKOUTS'
    },
    {
      time: '15:00 WAT',
      stage: 'ARRIVAL ANNOUNCEMENT',
      flightId: 'FT-ARR06',
      gate: 'MAIN STAGE',
      title: 'Touchdown: Pitch Awards & Final Declaration',
      desc: 'Startup pitch winners announcement, student innovation honors, and cohort grants.',
      category: 'ARRIVAL'
    }
  ];

  const inFlightGallery = [
    {
      img: '/archives/archive-2026-keynote-speaker.jpg',
      label: 'MAIN FLIGHT DECK',
      sub: 'Keynote Address'
    },
    {
      img: '/archives/archive-2026-auditorium-hall.png',
      label: 'MAIN CONCOURSE',
      sub: 'Delegate Assembly'
    },
    {
      img: '/archives/archive-2026-press-conference.jpg',
      label: 'VIP PRESS ROOM',
      sub: 'Media Briefing'
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
            maxWidth: '480px',
            margin: 0,
            lineHeight: 1.5,
            fontWeight: 500
          }}>
            Follow the sequenced checkpoints of Flight FT2027 from morning boarding to touchdown awards.
          </p>
        </div>

        {/* Visual Live Concourse Image Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {inFlightGallery.map((photo, i) => (
            <div
              key={i}
              style={{
                borderRadius: '1.25rem',
                border: '3px solid #000000',
                boxShadow: '5px 5px 0 #000000',
                overflow: 'hidden',
                background: '#000000',
                height: '200px',
                position: 'relative'
              }}
            >
              <img
                src={photo.img}
                alt={photo.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  opacity: 0.92
                }}
                loading="lazy"
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.85) 60%)',
                padding: '1rem 1.25rem 0.85rem',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between'
              }}>
                <span className="flight-mono" style={{ color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 900 }}>
                  {photo.label}
                </span>
                <span className="flight-mono" style={{ color: 'var(--color-airline-red)', fontSize: '0.68rem', fontWeight: 800 }}>
                  {photo.sub}
                </span>
              </div>
            </div>
          ))}
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
          * TIMINGS ARE ESTIMATED FLIGHT PLAN CHECKPOINTS • OFFICIAL EVENT DATE TO BE ANNOUNCED SOON
        </p>

      </div>
    </section>
  );
}
