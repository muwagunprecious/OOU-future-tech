import React from 'react';
import { ArrowUpRight, Compass, Users, Sparkles, Building, Globe2, Plane, Navigation, Zap, MapPin } from 'lucide-react';

export default function TheDestination() {
  const narrativeCards = [
    {
      num: '01',
      title: 'Youth Demographic Surge',
      headline: 'The World’s Youngest Workforce',
      text: 'Africa possesses the youngest, most energetic talent pool on earth—the future architects of global tech.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      tag: 'DEMOGRAPHICS'
    },
    {
      num: '02',
      title: 'Cognitive Capital',
      headline: 'Code Over Raw Commodities',
      text: 'Shifting from physical minerals to high-margin software, machine intelligence, and sovereign algorithms.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      tag: 'COGNITIVE CAPITAL'
    },
    {
      num: '03',
      title: 'Venture Foundry',
      headline: 'Campus as an Innovation Engine',
      text: 'Converting university lecture halls into venture foundries and enterprise software incubators.',
      image: '/archives/archive-2026-auditorium-hall.png',
      tag: 'VENTURE FOUNDRY'
    }
  ];

  return (
    <section id="destination" className="flight-section-black" style={{
      position: 'relative',
      backgroundColor: '#08080A',
      backgroundImage: 'url("https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=2000&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'scroll',
      padding: 'clamp(6rem, 10vw, 9rem) 0',
      borderTop: '3px solid #000000',
      borderBottom: '3px solid #000000',
      overflow: 'hidden'
    }}>
      {/* Cinematic Dark Airline Atmosphere Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(8,8,10,0.94) 0%, rgba(8,8,10,0.84) 40%, rgba(8,8,10,0.96) 100%)',
        zIndex: 1
      }} />

      {/* Flight Radar Sweep & Grid Watermark */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(215, 25, 32, 0.15) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.7,
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Large Airplane Silhouette Watermark in Background */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '-5%',
        opacity: 0.04,
        color: '#FFFFFF',
        pointerEvents: 'none',
        zIndex: 1,
        transform: 'rotate(-25deg)'
      }}>
        <Plane size={600} strokeWidth={1} />
      </div>

      <div className="flight-container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header with White & Red Contrast */}
        <div style={{ maxWidth: '1050px', marginBottom: '4.5rem' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '3px 3px 0 var(--color-airline-red)',
            borderRadius: '9999px',
            padding: '0.45rem 1.2rem',
            marginBottom: '1.5rem'
          }}>
            <Plane size={15} color="var(--color-airline-red)" style={{ transform: 'rotate(-45deg)' }} />
            <span className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.1em' }}>
              CRUISING ALTITUDE 38,000 FT • INTELLECTUAL THESIS
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2.6rem, 6vw, 4.8rem)',
            fontWeight: 950,
            lineHeight: 1.04,
            color: '#FFFFFF',
            margin: '0 0 1.5rem 0',
            letterSpacing: '-0.03em'
          }}>
            THE WORLD IS SEARCHING FOR <br />
            <span style={{
              color: 'var(--color-airline-red)',
              textDecoration: 'underline',
              textDecorationColor: '#FFFFFF',
              textUnderlineOffset: '8px'
            }}>
              WHAT AFRICA HAS TO OFFER.
            </span>
          </h2>

          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.25rem, 2.4vw, 1.8rem)',
            color: '#F8FAFC',
            fontWeight: 800,
            lineHeight: 1.4,
            margin: '0 0 1.5rem 0',
            textTransform: 'none'
          }}>
            Africa's greatest export is not what we dig from beneath our ground. <br />
            <span style={{ color: 'var(--color-airline-red)' }}>
              It is the cognitive capital and creative code we engineer in the minds of our youth.
            </span>
          </p>
        </div>

        {/* 3D High-Contrast White Cards Floating over Dark Airplane Background */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          marginBottom: '4.5rem'
        }}>
          {narrativeCards.map((card) => (
            <div
              key={card.num}
              style={{
                background: '#FFFFFF',
                border: '3px solid #000000',
                borderRadius: '1.75rem',
                boxShadow: '8px 8px 0 var(--color-airline-red)',
                padding: '1.75rem 1.75rem 2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-3px, -3px)';
                e.currentTarget.style.boxShadow = '12px 12px 0 #FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '8px 8px 0 var(--color-airline-red)';
              }}
            >
              <div>
                {/* Visual Image Banner */}
                {card.image && (
                  <div style={{
                    width: '100%',
                    height: '180px',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    border: '2px solid #000000',
                    marginBottom: '1.25rem',
                    position: 'relative'
                  }}>
                    <img
                      src={card.image}
                      alt={card.headline}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      loading="lazy"
                    />
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'var(--color-airline-red)',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 900,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: '1.5px solid #000000'
                    }}>
                      {card.num} // {card.tag}
                    </div>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '2px solid #E2E8F0',
                  paddingBottom: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    fontWeight: 950,
                    color: 'var(--color-airline-red)'
                  }}>
                    {card.num}
                  </span>

                  <span className="flight-mono" style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#000000',
                    background: '#F1F5F9',
                    border: '1.5px solid #000000',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px'
                  }}>
                    {card.tag}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.45rem',
                  lineHeight: 1.25,
                  margin: '0 0 1rem 0',
                  color: '#000000'
                }}>
                  {card.headline}
                </h3>

                <p style={{
                  fontSize: '0.98rem',
                  color: '#475569',
                  lineHeight: 1.65,
                  margin: 0
                }}>
                  {card.text}
                </p>
              </div>

              <div style={{
                marginTop: '2rem',
                paddingTop: '1rem',
                borderTop: '2px dashed #CBD5E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#000000'
              }}>
                <span>TRAJECTORY VERIFIED</span>
                <ArrowUpRight size={16} color="var(--color-airline-red)" />
              </div>
            </div>
          ))}
        </div>

        {/* Great-Circle Flight Route Visual Banner */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '3px solid #FFFFFF',
          borderRadius: '2rem',
          boxShadow: '10px 10px 0 var(--color-airline-red)',
          padding: '2.5rem 2rem',
          color: '#FFFFFF'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: '1.75rem'
          }}>
            <div>
              <span className="flight-mono" style={{ fontSize: '0.72rem', color: 'var(--color-airline-red)', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                TRANSCONTINENTAL TALENT ROUTE
              </span>
              <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', margin: 0, textTransform: 'uppercase' }}>
                DIRECT NON-STOP CORRIDOR TO GLOBAL TECH HUBS
              </h3>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: '#FFFFFF',
              color: '#000000',
              border: '2px solid #000000',
              boxShadow: '3px 3px 0 var(--color-airline-red)',
              borderRadius: '9999px',
              padding: '0.45rem 1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A34A' }} />
              AIRSPACE ACTIVE // 0 DELAYS
            </div>
          </div>

          {/* Interactive Route Map Pathway */}
          <div style={{
            background: '#070709',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: '1.25rem',
            padding: '1.75rem 2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Origin Node */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'var(--color-airline-red)',
                border: '2px solid #FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(215, 25, 32, 0.6)'
              }}>
                <MapPin size={22} color="#FFFFFF" />
              </div>
              <div>
                <span className="flight-mono" style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block' }}>ORIGIN HUB</span>
                <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#FFFFFF' }}>OOU / LAGOS (LOS)</strong>
              </div>
            </div>

            {/* Flight Line with Jet */}
            <div style={{ flex: '1 1 240px', minWidth: '200px', textAlign: 'center', position: 'relative' }}>
              <div style={{ height: '3px', borderTop: '3px dashed var(--color-airline-red)', position: 'relative' }}>
                <Plane size={20} color="#FFFFFF" style={{
                  position: 'absolute',
                  top: '-9px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)',
                  filter: 'drop-shadow(0 0 8px #D71920)'
                }} />
              </div>
              <span className="flight-mono" style={{ fontSize: '0.72rem', color: '#CBD5E1', display: 'block', marginTop: '0.75rem' }}>
                GREAT-CIRCLE FLIGHT PATH • CRUISE SPEED MACH 0.85
              </span>
            </div>

            {/* Destination Hubs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '2px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(255, 255, 255, 0.4)'
              }}>
                <Globe2 size={22} color="#000000" />
              </div>
              <div>
                <span className="flight-mono" style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block' }}>GLOBAL DESTINATIONS</span>
                <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-airline-red)' }}>
                  SFO • LHR • BER • DXB • TYO
                </strong>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
