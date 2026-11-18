import React from 'react';
import { Cpu, Globe, Award, Code2, Rocket, Lightbulb, Handshake, Plane, Sparkles, Building2, CheckCircle2, Navigation } from 'lucide-react';

const PARTNER_FALLBACK_ICONS = {
  'OOU TECH COMMUNITY': <Cpu size={24} color="var(--color-airline-red)" />,
  'OOU WEB3 COMMUNITY': <Globe size={24} color="#0B5FFF" />,
  'Web3 Bridge': <Code2 size={24} color="#7C3AED" />,
  'GDGoC OOU': <Rocket size={24} color="#EA4335" />,
  'DSN-OOU': <Cpu size={24} color="#16A34A" />,
  'Chicago Digital Academy': <Award size={24} color="#CA8A04" />,
  'Nacos OOU': <Code2 size={24} color="#0B5FFF" />,
  'XponetHer': <Sparkles size={24} color="#EC4899" />,
  'Defilio': <Globe size={24} color="#14B8A6" />,
  'Boom Tech Zone': <Lightbulb size={24} color="#F59E0B" />,
  'Olabisi Onabanjo University': <Award size={24} color="var(--color-airline-red)" />,
  'OOU Innovators Hub': <Lightbulb size={24} color="#CA8A04" />
};

export default function TravelPartners({ dynamicPartners }) {
  const defaultPartners = [
    { name: 'OOU TECH COMMUNITY', category: 'Host & Lead Flight Carrier', code: 'TC-01' },
    { name: 'OOU WEB3 COMMUNITY', category: 'Decentralized Rails Alliance', code: 'W3-02' },
    { name: 'Web3 Bridge', category: 'Smart Contract Infrastructure', code: 'BR-03' },
    { name: 'GDGoC OOU', category: 'Developer Student Alliance', code: 'GD-04' },
    { name: 'DSN-OOU', category: 'Data & AI Research Concourse', code: 'DS-05' },
    { name: 'Chicago Digital Academy', category: 'International Education Fleet', code: 'CD-06' },
    { name: 'Nacos OOU', category: 'Computer Science Syndicate', code: 'NC-07' },
    { name: 'XponetHer', category: 'Women in Technology Alliance', code: 'XP-08' },
    { name: 'Defilio', category: 'Digital Finance Protocol', code: 'DF-09' },
    { name: 'Boom Tech Zone', category: 'Web3 Growth & Ecosystem Hub', code: 'BZ-10' }
  ];

  const partnersToRender = (dynamicPartners && dynamicPartners.length > 0)
    ? dynamicPartners.map((p, idx) => ({
        name: p.name,
        category: p.category || defaultPartners[idx % defaultPartners.length]?.category || 'Official Flight Alliance',
        code: defaultPartners[idx % defaultPartners.length]?.code || `AL-${idx + 1 < 10 ? '0' : ''}${idx + 1}`,
        logo_url: p.logo_url
          ? p.logo_url
              .replace('https://kvghrhwkwlydpdlenrzo.supabase.co', 'https://addtzgrmmoybmvasmxss.supabase.co')
              .replace('/object/cms-images/', '/object/public/cms-images/')
          : null
      }))
    : defaultPartners;

  return (
    <section id="partners" className="flight-section" style={{ backgroundColor: '#FFFFFF' }}>
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
              borderRadius: '0px',
              padding: '0.45rem 1rem',
              marginBottom: '1.25rem'
            }}>
              <span className="flight-status-dot" />
              <span className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000' }}>
                TRAVEL ALLIANCES & ECOSYSTEM FLEET
              </span>
            </div>
            
            <h2 style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1,
              margin: 0,
              color: '#000000'
            }}>
              OUR TRAVEL PARTNERS.
            </h2>
          </div>

          <a
            href="mailto:ooufuturetech@gmail.com?subject=Flight%20FT2027%20Partnership%20Enquiry"
            className="flight-btn-outline"
            style={{ padding: '0.9rem 2rem', fontSize: '0.88rem' }}
          >
            <Handshake size={18} /> BECOME A FLIGHT PARTNER
          </a>
        </div>

        {/* 3D Aircraft Tail Fin & Fleet Carrier Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2rem)',
          marginBottom: '4rem'
        }}>
          {partnersToRender.map((p, idx) => (
            <div key={idx} className="airplane-partner-card">
              
              {/* Aircraft Fleet Carrier Header */}
              <div className="airplane-partner-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Plane size={14} color="var(--color-airline-red)" style={{ transform: 'rotate(-45deg)' }} />
                  <span>FLEET ALLIANCE // CARRIER {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                </div>
                
                {/* Active Navigation Strobe Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.62rem', color: '#CBD5E1' }}>
                  <span style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#22C55E',
                    display: 'inline-block',
                    boxShadow: '0 0 6px #22C55E'
                  }} />
                  <span>STROBE: ON</span>
                </div>
              </div>

              {/* Main Body: Engine Nacelle Logo + Partner Identity */}
              <div className="airplane-partner-body">
                
                {/* Nacelle Engine Turbine Ring */}
                <div className="airplane-partner-nacelle">
                  {p.logo_url ? (
                    <img
                      src={p.logo_url}
                      alt={p.name}
                      style={{
                        maxWidth: '85%',
                        maxHeight: '85%',
                        objectFit: 'contain'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback Icon */}
                  <div style={{
                    display: p.logo_url ? 'none' : 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%'
                  }}>
                    {PARTNER_FALLBACK_ICONS[p.name] || <Award size={24} color="var(--color-airline-red)" />}
                  </div>
                </div>

                {/* Partner Metadata */}
                <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    fontWeight: 950,
                    color: '#000000',
                    margin: '0 0 0.25rem 0',
                    lineHeight: 1.15,
                    textTransform: 'uppercase'
                  }}>
                    {p.name}
                  </h3>

                  <span className="flight-mono" style={{
                    fontSize: '0.72rem',
                    color: 'var(--color-airline-red)',
                    fontWeight: 800,
                    display: 'block'
                  }}>
                    {p.category}
                  </span>
                </div>

              </div>

              {/* Aircraft Telemetry Footer */}
              <div className="airplane-partner-footer">
                <span style={{ color: '#64748B' }}>
                  CALLSIGN: {p.code || `AL-${idx + 1}`}
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#000000'
                }}>
                  <span>TIER 1</span>
                  <span style={{ color: 'var(--color-airline-red)' }}>──✈──</span>
                  <span>APPROVED</span>
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Neo-Brutalist Aircraft Hangar & Sponsorship Concourse (Academy Form Aesthetic) */}
        <div style={{
          border: '3px solid #000000',
          background: '#070709',
          color: '#FFFFFF',
          borderRadius: '0px',
          boxShadow: '8px 8px 0 var(--color-airline-red)',
          padding: 'clamp(2rem, 4vw, 4rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle hangar beam grid overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(215, 25, 32, 0.2) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.6,
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--color-airline-red)',
              color: '#FFFFFF',
              border: '2px solid #FFFFFF',
              boxShadow: '3px 3px 0 #FFFFFF',
              padding: '0.4rem 1rem',
              borderRadius: '0px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              marginBottom: '1.25rem'
            }}>
              <Building2 size={14} />
              <span>ALLIANCE HANGAR // FLIGHT SPONSORSHIP CONCOURSE</span>
            </div>

            <h3 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 950,
              margin: '0 0 1rem 0',
              lineHeight: 1.1,
              color: '#FFFFFF',
              textTransform: 'uppercase'
            }}>
              Align Your Brand with Africa's Next Export of Talent.
            </h3>

            <p style={{
              fontSize: '1rem',
              color: '#CBD5E1',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: '560px'
            }}>
              Sponsorship tiers include keynote stage naming rights, direct campus engineering recruiting lounges, workshop hosting, and co-branded flight concourses.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
            <a
              href="mailto:ooufuturetech@gmail.com?subject=Request%20Flight%202027%20Sponsorship%20Pack"
              className="flight-btn-red"
              style={{ padding: '1.15rem 2.4rem', fontSize: '0.98rem' }}
            >
              REQUEST ALLIANCE SPONSORSHIP PACK (.PDF)
              <Plane size={18} style={{ transform: 'rotate(45deg)' }} />
            </a>

            <div className="flight-mono" style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700 }}>
              TIER 1 (GOLD) • TIER 2 (SILVER) • RECRUITMENT BOOTHS
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
