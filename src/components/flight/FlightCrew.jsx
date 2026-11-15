import React from 'react';
import { ArrowUpRight, Plane, CheckCircle2 } from 'lucide-react';

export default function FlightCrew({ dynamicSpeakers, speakersMode = 'live', comingSoonText }) {
  const defaultCrew = [
    {
      num: 'CREW 01',
      seat: '01A',
      name: 'Dr. Kunle Ade',
      title: 'Principal Security Architect',
      org: 'Defensive Cyber Command & OOU Fellow',
      bio: 'Pioneering ethical cyber defense frameworks across West Africa. Advising academic institutions and enterprise platforms on cyber resilience.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=800'
    },
    {
      num: 'CREW 02',
      seat: '01B',
      name: 'Sarah Omotayo',
      title: 'Head of Product Design',
      org: 'Global Fintech Systems',
      bio: 'Leading multi-currency user experience and digital consumer interfaces reaching over 4 million active African accounts.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=85&w=800'
    },
    {
      num: 'CREW 03',
      seat: '02A',
      name: 'Victor Ige',
      title: 'Staff Infrastructure Engineer',
      org: 'Distributed Cloud Labs',
      bio: 'Core open-source contributor specializing in scalable microservices, Rust systems, and distributed database consistency across emerging regions.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=85&w=800'
    },
    {
      num: 'CREW 04',
      seat: '02B',
      name: 'Emerald Nwosu',
      title: 'Decentralized Systems Lead',
      org: 'Web3 Protocol Foundation',
      bio: 'Architecting sovereign digital identity systems and zero-knowledge privacy protocols for cross-border African commerce.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=85&w=800'
    }
  ];

  const crewList = (dynamicSpeakers && dynamicSpeakers.length > 0)
    ? dynamicSpeakers.map((s, idx) => ({
        num: `CREW 0${idx + 1}`,
        seat: `0${Math.floor(idx / 2) + 1}${idx % 2 === 0 ? 'A' : 'B'}`,
        name: s.name,
        title: s.role || 'Keynote Speaker',
        org: s.company || s.expertise || 'OOU Tech Community',
        bio: s.bio || `${s.name} is a renowned technologist leading innovation in ${s.expertise || s.role}.`,
        image: (s.image_url || s.img || defaultCrew[idx % defaultCrew.length].image)
          ?.replace('https://kvghrhwkwlydpdlenrzo.supabase.co', 'https://addtzgrmmoybmvasmxss.supabase.co')
          ?.replace('/object/cms-images/', '/object/public/cms-images/')
      }))
    : defaultCrew;

  return (
    <section id="flight-crew" className="flight-section" style={{ backgroundColor: '#FFFFFF' }}>
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
                FLIGHT DECK COMMAND • CONFIRMED FLIGHT CREW
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1,
              margin: 0,
              color: '#000000'
            }}>
              MEET YOUR FLIGHT CREW.
            </h2>
          </div>
          <p style={{
            fontSize: '1.05rem',
            color: '#475569',
            maxWidth: '520px',
            margin: 0,
            lineHeight: 1.6
          }}>
            Seasoned commanders of engineering, design, and venture building who will guide your trajectory towards global technology competence.
          </p>
        </div>

        {/* 3D Crew Grid - Airplane Cabin Window Box Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(1.75rem, 3.5vw, 2.5rem)'
        }}>
          {crewList.map((crew) => (
            <div key={crew.num} className="speaker-window-card">
              
              {/* Outer Airplane Window Bezel with Aircraft Interior Framing */}
              <div className="speaker-window-bezel">
                
                {/* Airplane Window Shade Notch / Slider */}
                <div className="speaker-window-notch" title="Cabin Window Frame" />

                {/* Authentic Oval / Stadium Airplane Window Portal */}
                <div className="speaker-window-portal">
                  
                  {/* Floating Cabin Seat Allocation Badge */}
                  <div className="speaker-window-badge">
                    <Plane size={13} style={{ transform: 'rotate(-45deg)' }} />
                    <span>{crew.num} // SEAT {crew.seat || '01A'}</span>
                  </div>

                  {/* Glass Sheen / Reflection Overlay */}
                  <div className="speaker-window-glass" />

                  {/* Speaker Photo through the Window Glass */}
                  <img
                    src={crew.image}
                    alt={crew.name}
                    className="speaker-window-img"
                    loading="lazy"
                  />

                  {/* Bottom Window Frame Indicator */}
                  <div style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(6px)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '9999px',
                    whiteSpace: 'nowrap',
                    zIndex: 4,
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    WINDOW VIEW • FLIGHT FT2027
                  </div>

                </div>

              </div>

              {/* Speaker Metadata Panel (Lower Cabin Console) */}
              <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1, background: '#FFFFFF' }}>
                <span className="flight-mono" style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-airline-red)',
                  fontWeight: 800,
                  marginBottom: '0.35rem',
                  display: 'block'
                }}>
                  {crew.title}
                </span>

                <h3 style={{
                  fontSize: '1.45rem',
                  lineHeight: 1.2,
                  margin: '0 0 0.35rem 0',
                  color: '#000000'
                }}>
                  {crew.name}
                </h3>

                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#64748B',
                  marginBottom: '1rem',
                  display: 'block'
                }}>
                  {crew.org}
                </span>

                <p style={{
                  fontSize: '0.92rem',
                  color: '#475569',
                  lineHeight: 1.6,
                  margin: '0 0 1.5rem 0',
                  flexGrow: 1
                }}>
                  {crew.bio}
                </p>

                {/* Bottom Manifest Verification Pill */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.9rem',
                  borderTop: '2px dashed #E2E8F0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 800
                }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#16A34A' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} />
                    BOARDED & READY
                  </span>
                  <span style={{ color: '#000000' }}>
                    KEYNOTE CREW
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Box */}
        <div style={{
          marginTop: '3.5rem',
          padding: '1.5rem 2rem',
          background: '#F8FAFC',
          border: '2px solid #000000',
          borderRadius: '1rem',
          boxShadow: '4px 4px 0 #000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <span className="flight-mono" style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700 }}>
            * ADDITIONAL INTERNATIONAL FLIGHT CREW PILOTS TO BE ANNOUNCED
          </span>
          <a
            href="mailto:ooufuturetech@gmail.com?subject=Flight%20Crew%20Nomination"
            className="flight-mono"
            style={{ fontSize: '0.78rem', color: 'var(--color-airline-red)', textDecoration: 'none', fontWeight: 900 }}
          >
            NOMINATE A FLIGHT CREW SPEAKER ➔
          </a>
        </div>

      </div>
    </section>
  );
}
