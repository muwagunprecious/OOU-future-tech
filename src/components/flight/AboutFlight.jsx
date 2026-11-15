import React from 'react';
import { Download, Shield, Globe, Compass, Users, CheckCircle2, Plane, Sparkles, Navigation, Layers, Clock, Radio, ArrowUpRight, Activity, Gauge, MapPin, Award, Terminal } from 'lucide-react';

export default function AboutFlight() {
  const ascentFlights = [
    {
      flightNo: 'FT-0101',
      code: 'PILLAR 01',
      title: 'GLOBAL INTEGRATION',
      headline: 'Silicon Valley & London Direct',
      text: 'Direct remote engineering pipeline connecting campus software builders to global tech teams.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      routeOrigin: 'OOU / NIGERIA (LOS)',
      routeDest: 'GLOBAL REMOTE',
      status: 'BOARDING',
      statusColor: '#22C55E'
    },
    {
      flightNo: 'FT-0202',
      code: 'PILLAR 02',
      title: 'FRONTIER TECH & AI',
      headline: 'Ethical Sovereignty',
      text: 'Viable, high-income engineering pathways in AI, Cloud Infrastructure, and Cybersecurity.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      routeOrigin: 'CAMPUS',
      routeDest: 'AI & CYBER',
      status: 'ON SCHEDULE',
      statusColor: '#38BDF8'
    },
    {
      flightNo: 'FT-0303',
      code: 'PILLAR 03',
      title: 'VENTURE INCUBATION',
      headline: 'Campus Founders & Seed Grants',
      text: 'Pitch training, equity-free grants, and investor networks to build venture-backed startups.',
      image: '/archives/archive-2026-keynote-speaker.jpg',
      routeOrigin: 'DORM LABS',
      routeDest: 'VENTURE CAPITAL',
      status: 'CLEARED',
      statusColor: '#F59E0B'
    },
    {
      flightNo: 'FT-0404',
      code: 'PILLAR 04',
      title: 'SOVEREIGN FOUNDRY',
      headline: 'Africa’s Premier Tech Campus',
      text: 'Permanent institutional linkages between OOU, global enterprises, and top tech founders.',
      image: '/archives/archive-2026-crowd.png',
      routeOrigin: 'OOU FOUNDRY',
      routeDest: 'GLOBAL LEADERSHIP',
      status: 'FINAL CALL',
      statusColor: 'var(--color-airline-red)'
    }
  ];

  return (
    <section id="about" className="flight-section" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="flight-container">
        
        {/* Section Top ATC Dispatch Indicator */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: '#FFFFFF',
            border: '2px solid #000000',
            boxShadow: '3px 3px 0 #000000',
            borderRadius: '9999px',
            padding: '0.45rem 1.2rem',
            flexWrap: 'wrap'
          }}>
            <span className="flight-status-dot" />
            <span className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 900, color: '#000000' }}>
              AIR TRAFFIC CONTROL & FIDS • THE ASCENT MANIFEST
            </span>
            <span style={{ color: '#CBD5E1' }}>|</span>
            <span className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-airline-red)' }}>
              AIRSPACE CLEARED DIRECT
            </span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            fontWeight: 800,
            color: '#64748B'
          }}>
            <Radio size={14} color="var(--color-airline-red)" />
            <span>RADAR: LIVE // TOWER 118.100 MHz // SQUAWK: 2027</span>
          </div>
        </div>

        {/* =========================================================================
            ELECTRONIC FLIGHT PROGRESS STRIPS (FPS) — THE 4 ASCENT PILLARS
            Authentic Air Traffic Control Flight Strip Cards
            ========================================================================= */}
        <div style={{ marginBottom: '5rem' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <span className="flight-mono" style={{ fontSize: '0.72rem', color: 'var(--color-airline-red)', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
              ATC FLIGHT PROGRESS STRIPS // EXPEDITION PILLARS
            </span>
            <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#000000', margin: 0 }}>
              THE FOUR FLIGHT TRACKS OF THE ASCENT.
            </h3>
          </div>

          {/* 2x2 Grid of Flight Progress Strip Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '2rem'
          }}>
            {ascentFlights.map((flight) => (
              <div key={flight.flightNo} className="flight-strip-card">
                
                {/* Flight Strip Top Bay Header */}
                <div className="flight-strip-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plane size={14} color="var(--color-airline-red)" style={{ transform: 'rotate(-45deg)' }} />
                    <span style={{ fontWeight: 950 }}>{flight.flightNo}</span>
                    <span style={{ color: '#64748B' }}>//</span>
                    <span style={{ color: 'var(--color-airline-red)' }}>{flight.code}</span>
                  </div>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.68rem',
                    color: flight.statusColor,
                    background: '#111827',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '9999px',
                    border: `1px solid ${flight.statusColor}`
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: flight.statusColor,
                      boxShadow: `0 0 6px ${flight.statusColor}`
                    }} />
                    <span>{flight.status}</span>
                  </div>
                </div>

                {/* Main Strip Body */}
                <div className="flight-strip-body">
                  
                  {/* Visual High-Impact Card Image */}
                  <div style={{
                    height: '180px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '2px solid #000000',
                    marginBottom: '1.2rem',
                    position: 'relative'
                  }}>
                    <img
                      src={flight.image}
                      alt={flight.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.65) 100%)'
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase'
                    }}>
                      {flight.routeOrigin} ──✈── {flight.routeDest}
                    </div>
                  </div>

                  {/* Title & Headline */}
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.45rem',
                    fontWeight: 950,
                    lineHeight: 1.15,
                    margin: '0 0 0.35rem 0',
                    color: '#000000',
                    textTransform: 'uppercase'
                  }}>
                    {flight.title}
                  </h3>

                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    color: 'var(--color-airline-red)',
                    marginBottom: '0.6rem',
                    display: 'block'
                  }}>
                    {flight.headline}
                  </span>

                  <p style={{
                    fontSize: '0.92rem',
                    color: '#475569',
                    lineHeight: 1.55,
                    margin: 0,
                    flexGrow: 1
                  }}>
                    {flight.text}
                  </p>

                  {/* Strip Footer with ICAO Stamp */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '2px dashed #CBD5E1',
                    marginTop: '1.25rem'
                  }}>
                    <div className="flight-strip-stamp">
                      <Shield size={12} />
                      <span>ICAO APPROVED</span>
                    </div>

                    <span className="flight-mono" style={{ fontSize: '0.7rem', fontWeight: 800, color: '#16A34A' }}>
                      ● CLEARED DIRECT
                    </span>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

        {/* =========================================================================
            IN-FLIGHT CABIN & AIRCRAFT WINDOW SHOWCASE
            Direct Airplane Imagery + In-Flight Tech Specs
            ========================================================================= */}
        <div style={{
          background: '#F8FAFC',
          border: '3px solid #000000',
          borderRadius: '2rem',
          boxShadow: '8px 8px 0 #000000',
          padding: 'clamp(1.5rem, 4vw, 3.5rem)',
          marginBottom: '5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)',
          alignItems: 'center'
        }}>
          
          {/* Airplane Window Cutout Component */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="airplane-window-frame" style={{
              maxWidth: '380px',
              aspectRatio: '1 / 1.38',
              backgroundColor: '#FFFFFF',
              border: '4px solid #000000',
              borderRadius: '130px',
              boxShadow: '10px 10px 0 #000000',
              padding: '14px',
              position: 'relative'
            }}>
              {/* Inner Aircraft Window Ring */}
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '116px',
                border: '3px solid #000000',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#0F172A'
              }}>
                <img
                  src="/ascent-builder.jpg"
                  alt="African Builder on FutureTech Flight"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 12%',
                    display: 'block'
                  }}
                />

                {/* Airplane Glass Reflection */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.2) 100%)',
                  pointerEvents: 'none'
                }} />

                {/* Window Wing Perspective Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0, 0, 0, 0.88)',
                  backdropFilter: 'blur(8px)',
                  border: '1.5px solid #FFFFFF',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '0.35rem 0.9rem',
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap'
                }}>
                  SEAT 01A • THE EXPEDITION
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#64748B',
              textAlign: 'center'
            }}>
              PASSENGER CABIN VIEW // SEAT 01A • THE EXPEDITION
            </div>
          </div>

          {/* Right Side: Aircraft Mission Specifications & Amenities */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FFFFFF',
              border: '2px solid #000000',
              boxShadow: '2px 2px 0 #000000',
              borderRadius: '9999px',
              padding: '0.35rem 0.9rem',
              marginBottom: '1rem'
            }}>
              <Plane size={14} color="var(--color-airline-red)" />
              <span className="flight-mono" style={{ fontSize: '0.72rem', fontWeight: 800, color: '#000000' }}>
                FLIGHT SPECIFICATIONS // FT2027
              </span>
            </div>

            <h3 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              lineHeight: 1.15,
              color: '#000000',
              margin: '0 0 1rem 0'
            }}>
              ENGINEERED FOR THE ASCENT OF AFRICAN BUILDERS.
            </h3>

            <p style={{
              fontSize: '1rem',
              color: '#475569',
              lineHeight: 1.6,
              margin: '0 0 2rem 0'
            }}>
              Step aboard an intellectual flight configured specifically to launch student developers, UI/UX designers, product leads, and startup founders from campus dormitories into venture-backed careers.
            </p>

            {/* In-Flight Feature Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
              
              <div style={{
                background: '#FFFFFF',
                border: '2px solid #000000',
                borderRadius: '1rem',
                boxShadow: '3px 3px 0 #000000',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Navigation size={16} color="var(--color-airline-red)" />
                  <span className="flight-mono" style={{ fontSize: '0.72rem', fontWeight: 800 }}>NON-STOP ROUTE</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#334155', fontWeight: 600 }}>
                  Direct campus connection to global tech ecosystems.
                </div>
              </div>

              <div style={{
                background: '#FFFFFF',
                border: '2px solid #000000',
                borderRadius: '1rem',
                boxShadow: '3px 3px 0 #000000',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Users size={16} color="var(--color-airline-red)" />
                  <span className="flight-mono" style={{ fontSize: '0.72rem', fontWeight: 800 }}>2,000+ PASSENGERS</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#334155', fontWeight: 600 }}>
                  High-density talent convergence from 10+ faculties.
                </div>
              </div>

              <div style={{
                background: '#FFFFFF',
                border: '2px solid #000000',
                borderRadius: '1rem',
                boxShadow: '3px 3px 0 #000000',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Sparkles size={16} color="var(--color-airline-red)" />
                  <span className="flight-mono" style={{ fontSize: '0.72rem', fontWeight: 800 }}>FIRST CLASS AMENITIES</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#334155', fontWeight: 600 }}>
                  Keynote sessions, live code demos, pitch arena & swag kits.
                </div>
              </div>

              <div style={{
                background: '#FFFFFF',
                border: '2px solid #000000',
                borderRadius: '1rem',
                boxShadow: '3px 3px 0 #000000',
                padding: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Shield size={16} color="var(--color-airline-red)" />
                  <span className="flight-mono" style={{ fontSize: '0.72rem', fontWeight: 800 }}>VERIFIED TRAJECTORY</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#334155', fontWeight: 600 }}>
                  Zero ambiguity: 100% legitimate, high-paying tech skills.
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Verified Stats 3D Container (White/Slate with 8px hard shadow) */}
        <div style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          borderRadius: '2rem',
          boxShadow: '8px 8px 0 #000000',
          padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: '2.5rem',
          textAlign: 'center',
          marginBottom: '3.5rem'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
              fontWeight: 950,
              color: 'var(--color-airline-red)',
              lineHeight: 1,
              marginBottom: '0.4rem'
            }}>
              2,000+
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 900, color: '#000000' }}>
              VERIFIED ATTENDEES
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>
              Students & Tech Professionals
            </div>
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
              fontWeight: 950,
              color: '#000000',
              lineHeight: 1,
              marginBottom: '0.4rem'
            }}>
              8+
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 900, color: '#000000' }}>
              EXPERT FLIGHT CREW
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>
              Keynote Speakers & Leaders
            </div>
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
              fontWeight: 950,
              color: '#000000',
              lineHeight: 1,
              marginBottom: '0.4rem'
            }}>
              10+
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 900, color: '#000000' }}>
              STRATEGIC DELEGATES
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>
              Venture & Corporate Allies
            </div>
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
              fontWeight: 950,
              color: 'var(--color-airline-red)',
              lineHeight: 1,
              marginBottom: '0.4rem'
            }}>
              100%
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 900, color: '#000000' }}>
              LEGITIMATE CAREERS
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '4px' }}>
              Ethical High-Impact Tech
            </div>
          </div>
        </div>

        {/* Download Prospectus 3D Box */}
        <div style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          borderRadius: '1.5rem',
          boxShadow: '6px 6px 0 #000000',
          padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
          <div>
            <span className="flight-mono" style={{ fontSize: '0.72rem', color: 'var(--color-airline-red)', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
              EVENT ROADMAP & SPONSORSHIP DOSSIER
            </span>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.35rem 0', color: '#000000' }}>
              Download Official Event Prospectus
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#64748B', margin: 0 }}>
              Review the detailed flight syllabus, demographic breakdown, sponsorship tiers, and conference agenda.
            </p>
          </div>

          <a
            href="/prospectus.pdf"
            download="OOU_FutureTech_2027_Prospectus.pdf"
            className="flight-btn-red"
            style={{ padding: '0.95rem 2rem', fontSize: '0.9rem' }}
          >
            <Download size={18} />
            DOWNLOAD PROSPECTUS (.PDF)
          </a>
        </div>

      </div>
    </section>
  );
}