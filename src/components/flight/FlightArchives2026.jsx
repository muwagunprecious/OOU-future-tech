import React, { useState, useEffect, useRef } from 'react';
import { Camera, Plane, Calendar, MapPin, ChevronLeft, ChevronRight, Maximize2, X, CheckCircle2, Play, Pause } from 'lucide-react';

export default function FlightArchives2026() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const trackRef = useRef(null);

  const archivePhotos = [
    {
      id: 'crowd-full',
      src: '/archives/archive-2026-crowd.png',
      title: 'CAPACITY ASCENT // 2,000+ STUDENT BUILDERS',
      category: 'AUDITORIUM DECK',
      flightLog: 'LOG #01 • CAPACITY MANIFEST',
      date: 'MARCH 2026',
      caption: 'The main university auditorium packed to the rafters with thousands of ambitious undergraduate engineers, designers, and innovators.'
    },
    {
      id: 'keynote-stage',
      src: '/archives/archive-2026-keynote-speaker.jpg',
      title: 'KEYNOTE TRANSMISSION // STAGE COMMAND',
      category: 'KEYNOTE DISPATCH',
      flightLog: 'LOG #02 • MISSION PODIUM',
      date: 'MARCH 2026',
      caption: 'Keynote address delivered at the digital podium on building technological self-reliance and digital economic sovereignty.'
    },
    {
      id: 'dignitary-patron',
      src: '/archives/archive-2026-dignitary.jpg',
      title: 'PATRON DIRECTIVE // UNIVERSITY LEADERSHIP',
      category: 'VIP FLIGHT SALON',
      flightLog: 'LOG #03 • EXECUTIVE PATRONAGE',
      date: 'MARCH 2026',
      caption: 'Distinguished university governance, council members, and academic deans in attendance endorsing student tech talent.'
    },
    {
      id: 'press-conference',
      src: '/archives/archive-2026-press-conference.jpg',
      title: 'NATIONAL BROADCAST // PRESS CLEARANCE',
      category: 'MEDIA TOWER',
      flightLog: 'LOG #04 • BROADCAST AIRSPACE',
      date: 'MARCH 2026',
      caption: 'Live television and broadcast press interviews (OGTV, PL9 News) documenting OOU FutureTech as Ogun State’s tech landmark.'
    },
    {
      id: 'hall-focus',
      src: '/archives/archive-2026-auditorium-hall.png',
      title: 'TIERED SESSIONS // IMMERSIVE AUDIENCE',
      category: 'PASSENGER CABIN',
      flightLog: 'LOG #05 • TIERED SECTORS',
      date: 'MARCH 2026',
      caption: 'TETFund Auditorium halls packed with students attentively learning high-income tech skills, software engineering, and design.'
    }
  ];

  // Glide freely every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % archivePhotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, archivePhotos.length]);

  // Track slide width dynamically for smooth gliding
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current && trackRef.current.children[0]) {
        const item = trackRef.current.children[0];
        const gap = 24; // 1.5rem
        setSlideWidth(item.offsetWidth + gap);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? archivePhotos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % archivePhotos.length);
  };

  return (
    <section id="archives" style={{
      position: 'relative',
      padding: 'clamp(5rem, 8vw, 8rem) 0',
      backgroundColor: '#070709',
      color: '#FFFFFF',
      borderBottom: '3px solid #000000',
      overflow: 'hidden'
    }}>
      {/* Aviation Radar Sweep Grid Pattern on dark background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(215, 25, 32, 0.22) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
        opacity: 0.6,
        pointerEvents: 'none'
      }} />

      <div className="flight-container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: 'rgba(215, 25, 32, 0.15)',
            border: '2px solid var(--color-airline-red)',
            borderRadius: '9999px',
            padding: '0.45rem 1.15rem',
            marginBottom: '1.25rem',
            flexWrap: 'wrap'
          }}>
            <span className="flight-status-dot" />
            <span className="flight-mono" style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FFFFFF' }}>
              BLACK BOX FLIGHT RECORDER // MARCH 2026
            </span>
            <span style={{ color: '#475569' }}>|</span>
            <span className="flight-mono" style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-airline-red)' }}>
              THE INAUGURAL EXPEDITION
            </span>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}>
            <div style={{ maxWidth: '820px' }}>
              <h2 style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 4.4rem)',
                fontWeight: 950,
                lineHeight: 1.02,
                color: '#FFFFFF',
                margin: '0 0 1rem 0',
                textTransform: 'uppercase',
                letterSpacing: '-0.03em'
              }}>
                THE 2026 EVENT ARCHIVES. <br />
                <span style={{
                  color: 'var(--color-airline-red)',
                  textDecoration: 'underline',
                  textDecorationColor: '#FFFFFF',
                  textUnderlineOffset: '8px'
                }}>
                  PROOF OF ASCENT.
                </span>
              </h2>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: '#CBD5E1',
                lineHeight: 1.6,
                margin: 0
              }}>
                Before we board Flight FT-2027, review the raw documented history of the inaugural OOU FutureTech 2026 conference. Over 2,000 students, academic leadership, state dignitaries, and national television converged to launch Africa’s tech frontier.
              </p>
            </div>

            {/* Navigation & Auto-Glide Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1.5px solid #334155',
                  borderRadius: '9999px',
                  color: '#FFFFFF',
                  padding: '0.5rem 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                {isPaused ? <Play size={13} color="#22C55E" /> : <Pause size={13} color="var(--color-airline-red)" />}
                <span>{isPaused ? 'RESUME GLIDE' : 'GLIDING EVERY 4S'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous slide"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '2px solid #000000',
                  boxShadow: '3px 3px 0 var(--color-airline-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#000000'
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next slide"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '2px solid #000000',
                  boxShadow: '3px 3px 0 var(--color-airline-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#000000'
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Freely Gliding Photos Carousel (WITHOUT BOX FRAMES) */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          width: '100%',
          overflow: 'hidden',
          padding: '1rem 0 2.5rem 0',
          position: 'relative'
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '1.5rem',
            paddingLeft: 'max(1.5rem, calc((100vw - 1240px) / 2 + 1.5rem))',
            paddingRight: 'max(1.5rem, calc((100vw - 1240px) / 2 + 1.5rem))',
            transform: `translateX(-${currentIndex * (slideWidth || 360)}px)`,
            transition: 'transform 0.95s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {archivePhotos.map((photo, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                style={{
                  flex: '0 0 auto',
                  width: 'clamp(300px, 68vw, 720px)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  opacity: isActive ? 1 : 0.72,
                  transform: isActive ? 'scale(1)' : 'scale(0.97)'
                }}
              >
                {/* Clean borderless photo without card box */}
                <div style={{
                  position: 'relative',
                  height: 'clamp(260px, 46vw, 450px)',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  backgroundColor: '#0F172A'
                }}>
                  <img
                    src={photo.src}
                    alt={photo.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 25%',
                      display: 'block',
                      transition: 'transform 0.6s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />

                  {/* Cinematic dark gradient vignette */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 40%, rgba(7,7,9,0.92) 100%)',
                    pointerEvents: 'none'
                  }} />

                  {/* Top Floating Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1.25rem',
                    left: '1.25rem',
                    background: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '9999px',
                    padding: '0.4rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#FFFFFF'
                  }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-airline-red)', display: 'inline-block' }} />
                    <span>{photo.flightLog}</span>
                  </div>

                  {/* Expand Icon */}
                  <div style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    background: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}>
                    <Maximize2 size={16} />
                  </div>

                  {/* Bottom Text Over Photo (No Box) */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    right: '1.5rem'
                  }}>
                    <div style={{
                      display: 'inline-block',
                      color: 'var(--color-airline-red)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 900,
                      letterSpacing: '0.08em',
                      marginBottom: '0.4rem'
                    }}>
                      {photo.category}
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.15rem, 2.5vw, 1.65rem)',
                      fontWeight: 950,
                      color: '#FFFFFF',
                      margin: '0 0 0.5rem 0',
                      lineHeight: 1.2
                    }}>
                      {photo.title}
                    </h3>

                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(0.85rem, 1.4vw, 0.98rem)',
                      color: '#CBD5E1',
                      lineHeight: 1.5,
                      margin: 0,
                      maxWidth: '620px'
                    }}>
                      {photo.caption}
                    </p>
                  </div>
                </div>

                {/* Sub-photo date & location indicator */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  marginTop: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#94A3B8',
                  fontWeight: 800,
                  paddingLeft: '0.5rem'
                }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={13} color="var(--color-airline-red)" /> {photo.date}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={13} color="var(--color-airline-red)" /> OOU MAIN AUDITORIUM
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Dots Indicator & Auto-Glide Progress Line */}
      <div className="flight-container" style={{ position: 'relative', zIndex: 2, marginTop: '1rem' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          borderTop: '1px solid #1E293B',
          paddingTop: '1.5rem'
        }}>
          {/* Slide Indicator Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {archivePhotos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: idx === currentIndex ? '38px' : '12px',
                  height: '10px',
                  borderRadius: '9999px',
                  background: idx === currentIndex ? 'var(--color-airline-red)' : '#334155',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#94A3B8',
            fontWeight: 800
          }}>
            FLIGHT ARCHIVE LOG {currentIndex + 1} OF {archivePhotos.length} // CONTINUOUS 4S GLIDE
          </div>
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#070709',
              border: '2px solid #334155',
              borderRadius: '1.5rem',
              boxShadow: '0 0 40px rgba(0, 0, 0, 0.9)',
              maxWidth: '920px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              position: 'relative',
              color: '#FFFFFF'
            }}
          >
            {/* Modal Header */}
            <div style={{
              background: '#000000',
              color: '#FFFFFF',
              padding: '1rem 1.5rem',
              borderBottom: '2px solid #1E293B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plane size={14} color="var(--color-airline-red)" style={{ transform: 'rotate(-45deg)' }} />
                <span>{selectedPhoto.flightLog}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                style={{
                  background: 'var(--color-airline-red)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Photo */}
            <div style={{
              maxHeight: '560px',
              backgroundColor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '560px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>

            {/* Modal Description */}
            <div style={{ padding: '1.5rem 1.75rem' }}>
              <div style={{
                display: 'inline-block',
                background: 'rgba(215, 25, 32, 0.15)',
                color: 'var(--color-airline-red)',
                border: '1px solid var(--color-airline-red)',
                borderRadius: '9999px',
                padding: '0.25rem 0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 900,
                marginBottom: '0.75rem'
              }}>
                {selectedPhoto.category}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.45rem',
                fontWeight: 950,
                color: '#FFFFFF',
                margin: '0 0 0.5rem 0'
              }}>
                {selectedPhoto.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: '#CBD5E1',
                lineHeight: 1.6,
                margin: '0 0 1.25rem 0'
              }}>
                {selectedPhoto.caption}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#94A3B8',
                fontWeight: 800,
                borderTop: '1px solid #1E293B',
                paddingTop: '1rem'
              }}>
                <span>DATE: {selectedPhoto.date}</span>
                <span>•</span>
                <span>VENUE: OOU MAIN CAMPUS, AGO-IWOYE</span>
                <span>•</span>
                <span style={{ color: '#22C55E' }}>STATUS: ARCHIVED IN BLACK BOX</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
