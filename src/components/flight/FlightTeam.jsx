import React from 'react';
import { Users, Shield, ArrowUpRight, Award, Compass, Radio, Plane, RotateCw, CheckCircle2, Star, Crown } from 'lucide-react';

// Verified authentic team member photos (curated from Supabase & verified studio shoots)
const TEAM_IMAGE_MAP = {
  'ADEMUWAGUN MAYOKUN': '/team/mayokun.jpg',
  'Oyindamola Deji-Agboola': '/team/oyindamola.jpg',
  'Muritala Aminat': '/team/aminat.jpg',
  'Temy Topsy': '/team/temy-topsy.jpg',
  'Usman Joseph': '/team/usman.jpg',
  'Oluwabukunmi Priscillia': '/team/priscillia.jpg'
};

const resolveTeamImage = (m) => {
  const cleanName = (m.name || '').trim().toLowerCase();
  for (const [key, val] of Object.entries(TEAM_IMAGE_MAP)) {
    if (key.toLowerCase() === cleanName) {
      return val;
    }
  }
  if (m.image_url) {
    let resolved = m.image_url
      .replace('https://kvghrhwkwlydpdlenrzo.supabase.co', 'https://addtzgrmmoybmvasmxss.supabase.co')
      .replace('/object/cms-images/', '/object/public/cms-images/');
    return resolved;
  }
  return '/team/mayokun.jpg';
};

export default function FlightTeam({ dynamicTeam }) {
  const defaultTeam = [
    {
      name: 'ADEMUWAGUN MAYOKUN',
      role: 'CONVENER',
      bio: 'Leading the ecosystem vision and global tech partnerships of OOU FutureTech.',
      doorCode: 'DOOR 1L',
      dept: 'MISSION CONTROL'
    },
    {
      name: 'Oyindamola Deji-Agboola',
      role: 'Director of Alliance',
      bio: 'Orchestrating strategic corporate alliances and venture engagement.',
      doorCode: 'DOOR 1R',
      dept: 'STRATEGIC ALLIANCE'
    },
    {
      name: 'Muritala Aminat',
      role: 'Program Director',
      bio: 'Directing flight tracks, technical workshops, and conference syllabus.',
      doorCode: 'DOOR 2L',
      dept: 'FLIGHT SYLLABUS'
    },
    {
      name: 'Temy Topsy',
      role: 'Director of Web3',
      bio: 'Steering decentralized protocols and Web3 campus developer acceleration.',
      doorCode: 'DOOR 2R',
      dept: 'DECENTRALIZED TECH'
    },
    {
      name: 'Usman Joseph',
      role: 'Director of Branding',
      bio: 'Directing the visual identity and creative brand communications.',
      doorCode: 'DOOR 3L',
      dept: 'CREATIVE DIRECTION'
    },
    {
      name: 'Oluwabukunmi Priscillia',
      role: 'Content Strategist',
      bio: 'Leading media narratives, editorial outreach, and ecosystem storytelling.',
      doorCode: 'DOOR 3R',
      dept: 'COMMUNICATIONS'
    }
  ];

  const teamList = (dynamicTeam && dynamicTeam.length > 0)
    ? dynamicTeam.map((m, idx) => {
        const cleanName = (m.name || '').trim();
        const fallback = defaultTeam.find(d => d.name.toLowerCase() === cleanName.toLowerCase()) || defaultTeam[idx % defaultTeam.length];
        return {
          num: `OPS 0${idx + 1}`,
          name: cleanName || fallback.name,
          role: m.role || fallback.role,
          bio: (m.bio && m.bio !== 'OOUFUTURE TECH' && m.bio.length > 5)
            ? m.bio
            : fallback.bio,
          image: resolveTeamImage(m),
          dept: fallback.dept,
          doorCode: fallback.doorCode
        };
      })
    : defaultTeam.map((m, idx) => ({ ...m, num: `OPS 0${idx + 1}`, image: resolveTeamImage(m) }));

  // Ensure the Convener is always positioned first for prominent presentation
  const sortedTeamList = [...teamList].sort((a, b) => {
    const aIsConvener = (a.role || '').toUpperCase().includes('CONVENER') || (a.name || '').toUpperCase().includes('ADEMUWAGUN');
    const bIsConvener = (b.role || '').toUpperCase().includes('CONVENER') || (b.name || '').toUpperCase().includes('ADEMUWAGUN');
    if (aIsConvener && !bIsConvener) return -1;
    if (!aIsConvener && bIsConvener) return 1;
    return 0;
  });

  return (
    <section id="team" className="flight-section alt-bg" style={{ backgroundColor: '#F8FAFC' }}>
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
              borderRadius: '0px',
              padding: '0.45rem 1rem',
              marginBottom: '1.25rem'
            }}>
              <span className="flight-status-dot" />
              <span className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000' }}>
                GROUND CREW & MISSION CONTROL • ORGANIZING TEAM
              </span>
            </div>
            
            <h2 style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1,
              margin: 0,
              color: '#000000'
            }}>
              THE TEAM BEHIND THE FLIGHT.
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
            The directors and campus leaders orchestrating flight operations and corporate alliances.
          </p>
        </div>

        {/* 3D Airplane Door Member Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          marginBottom: '4rem'
        }}>
          {sortedTeamList.map((member) => {
            const isConvener = (member.role || '').toUpperCase().includes('CONVENER') || (member.name || '').toUpperCase().includes('ADEMUWAGUN');

            return (
              <div
                key={member.name}
                className="airplane-door-card"
                style={{
                  boxShadow: isConvener ? '10px 10px 0 var(--color-airline-red)' : '8px 8px 0 #000000',
                  border: isConvener ? '3px solid #000000' : '3px solid #000000'
                }}
              >
                
                {/* Door Exit Sign & Status Bar */}
                <div
                  className="airplane-door-header"
                  style={{
                    background: isConvener ? 'var(--color-airline-red)' : '#000000',
                    color: '#FFFFFF'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {isConvener ? (
                      <Star size={15} color="#FDE047" fill="#FDE047" />
                    ) : (
                      <Plane size={14} color="var(--color-airline-red)" style={{ transform: 'rotate(-45deg)' }} />
                    )}
                    <span style={{ fontWeight: 950, letterSpacing: '0.08em' }}>
                      {member.doorCode} // {isConvener ? 'CONVENER FLIGHT COMMAND' : 'EXIT HATCH'}
                    </span>
                  </div>

                  <div style={{
                    background: isConvener ? '#000000' : 'transparent',
                    color: isConvener ? '#FFFFFF' : 'var(--color-airline-red)',
                    padding: isConvener ? '0.2rem 0.55rem' : '0',
                    borderRadius: '0px',
                    fontWeight: 950,
                    fontSize: '0.68rem',
                    letterSpacing: '0.06em'
                  }}>
                    {isConvener ? '★ CHIEF OF MISSION' : 'TYPE A DOOR'}
                  </div>
                </div>

                {/* Upper Box: Image Covers the Entire Upper Area */}
                <div className="airplane-door-image-box">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="airplane-door-cover-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                    }}
                  />
                  <div className="airplane-door-image-overlay" />
                  <div className="airplane-door-glass-sheen" />

                  {/* Prominent Convener Badge on the Image */}
                  {isConvener && (
                    <div className="airplane-door-convener-pill">
                      <Star size={14} color="#FDE047" fill="#FDE047" />
                      <span>★ CONVENER • MISSION COMMAND ★</span>
                    </div>
                  )}

                  {/* Operations Callout Tag */}
                  <div className="airplane-door-ops-badge">
                    <Radio size={12} color="var(--color-airline-red)" />
                    <span>{member.num} // {member.doorCode}</span>
                  </div>

                  {/* Aviation Door Slide Status */}
                  <div className="airplane-door-latch-badge">
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} />
                    <span>{isConvener ? 'SLIDE ARMED // COMMAND' : 'SLIDE ARMED'}</span>
                  </div>
                </div>

                {/* Emergency Safety Hazard Striping */}
                <div className="airplane-door-hazard-stripe" />

                {/* Lower Console: Team Member Details */}
                <div style={{ padding: '2rem 1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1, background: '#FFFFFF' }}>
                  
                  {/* HIGH-IMPACT PROMINENT TITLE DESIGN */}
                  <div style={{ marginBottom: '1rem' }}>
                    {isConvener ? (
                      /* Eye-Catching, Bold, Unmistakable CONVENER Title Badge */
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'var(--color-airline-red)',
                        color: '#FFFFFF',
                        border: '3px solid #000000',
                        boxShadow: '4px 4px 0 #000000',
                        borderRadius: '0px',
                        padding: '0.65rem 1.15rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                          <Award size={20} color="#FFFFFF" />
                          <span style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.15rem',
                            fontWeight: 950,
                            letterSpacing: '0.12em',
                            color: '#FFFFFF',
                            textTransform: 'uppercase'
                          }}>
                            CONVENER
                          </span>
                        </div>

                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          background: '#000000',
                          color: '#FFFFFF',
                          fontSize: '0.68rem',
                          fontWeight: 900,
                          padding: '0.22rem 0.6rem',
                          borderRadius: '0px',
                          letterSpacing: '0.08em'
                        }}>
                          HEAD OF MISSION
                        </span>
                      </div>
                    ) : (
                      /* Clean High-Contrast Role Pill for Directors */
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          background: '#FFFFFF',
                          color: '#000000',
                          border: '2px solid #000000',
                          boxShadow: '2.5px 2.5px 0 #000000',
                          borderRadius: '0px',
                          padding: '0.35rem 0.85rem'
                        }}>
                          <span className="flight-mono" style={{
                            fontSize: '0.78rem',
                            color: 'var(--color-airline-red)',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em'
                          }}>
                            {member.role}
                          </span>
                        </div>

                        <span className="flight-mono" style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          color: '#000000',
                          background: '#F1F5F9',
                          border: '1.5px solid #000000',
                          boxShadow: '1.5px 1.5px 0 #000000',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '0px'
                        }}>
                          {member.dept}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Full Member Name */}
                  <h3 style={{
                    fontSize: isConvener ? '1.55rem' : '1.4rem',
                    lineHeight: 1.2,
                    margin: '0 0 0.85rem 0',
                    color: '#000000',
                    textTransform: 'uppercase',
                    fontWeight: 950
                  }}>
                    {member.name}
                  </h3>

                  {/* Editorial Bio */}
                  <p style={{
                    fontSize: '0.92rem',
                    color: '#475569',
                    lineHeight: 1.6,
                    margin: '0 0 1.5rem 0',
                    flexGrow: 1
                  }}>
                    {member.bio}
                  </p>

                  {/* Door Pressure & Flight Clearance Seal */}
                  <div style={{
                    paddingTop: '0.9rem',
                    borderTop: '2px dashed #CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 800
                  }}>
                    <span style={{ color: '#000000' }}>
                      {member.num} // {isConvener ? 'LEAD COMMAND' : 'CLEARED'}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#16A34A' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} />
                      {isConvener ? 'MISSION LEADER • ACTIVE' : 'DOOR SECURE & READY'}
                    </span>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Join Ground Crew Banner (Academy Neo-Brutalist Card) */}
        <div style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          borderRadius: '0px',
          boxShadow: '8px 8px 0 #000000',
          padding: '2rem 2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
          <div>
            <span className="flight-mono" style={{ fontSize: '0.72rem', color: 'var(--color-airline-red)', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
              CAMPUS VOLUNTEER & LOGISTICS CORPS
            </span>
            <h3 style={{ fontSize: '1.45rem', margin: '0 0 0.35rem 0', color: '#000000' }}>
              Want to join the Ground Crew?
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#64748B', margin: 0 }}>
              Join student volunteers across flight operations, technical support, accreditation, media coverage, and protocol.
            </p>
          </div>

          <a
            href="mailto:ooufuturetech@gmail.com?subject=Ground%20Crew%20Volunteer%20Application"
            className="flight-btn-red"
            style={{ padding: '0.85rem 1.8rem', fontSize: '0.88rem' }}
          >
            VOLUNTEER WITH US
            <ArrowUpRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}
