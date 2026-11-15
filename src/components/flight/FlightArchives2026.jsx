import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Pause } from 'lucide-react';

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
      alt: 'OOU FutureTech 2026 Auditorium Audience'
    },
    {
      id: 'keynote-stage',
      src: '/archives/archive-2026-keynote-speaker.jpg',
      alt: 'OOU FutureTech 2026 Keynote Address'
    },
    {
      id: 'dignitary-patron',
      src: '/archives/archive-2026-dignitary.jpg',
      alt: 'OOU FutureTech 2026 University Leadership'
    },
    {
      id: 'press-conference',
      src: '/archives/archive-2026-press-conference.jpg',
      alt: 'OOU FutureTech 2026 Press Coverage'
    },
    {
      id: 'hall-focus',
      src: '/archives/archive-2026-auditorium-hall.png',
      alt: 'OOU FutureTech 2026 Student Builders'
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
      padding: 'clamp(4.5rem, 7vw, 7rem) 0',
      backgroundColor: '#070709',
      color: '#FFFFFF',
      borderBottom: '3px solid #000000',
      overflow: 'hidden'
    }}>
      {/* Aviation Radar Grid pattern on dark background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(215, 25, 32, 0.22) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
        opacity: 0.6,
        pointerEvents: 'none'
      }} />

      <div className="flight-container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Simple Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: 'rgba(215, 25, 32, 0.15)',
            border: '2px solid var(--color-airline-red)',
            borderRadius: '9999px',
            padding: '0.45rem 1.15rem',
            marginBottom: '1.25rem'
          }}>
            <span className="flight-status-dot" />
            <span className="flight-mono" style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FFFFFF' }}>
              BLACK BOX FLIGHT RECORDER // MARCH 2026
            </span>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                fontWeight: 950,
                lineHeight: 1.05,
                color: '#FFFFFF',
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '-0.03em'
              }}>
                2026 EVENT ARCHIVES.
              </h2>
            </div>

            {/* Navigation & Glide Controls */}
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
                aria-label="Previous photo"
                style={{
                  width: '42px',
                  height: '42px',
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
                aria-label="Next photo"
                style={{
                  width: '42px',
                  height: '42px',
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

      {/* Freely Gliding Photos Carousel - PURE CLEAN PICTURES, NO TEXT OVERLAY */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          width: '100%',
          overflow: 'hidden',
          padding: '0.5rem 0 2rem 0',
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
                  width: 'clamp(280px, 60vw, 640px)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  opacity: isActive ? 1 : 0.72,
                  transform: isActive ? 'scale(1)' : 'scale(0.97)'
                }}
              >
                {/* Pure Clean Picture - NO TEXT, NO BOX */}
                <div style={{
                  position: 'relative',
                  height: 'clamp(240px, 42vw, 420px)',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  backgroundColor: '#0F172A'
                }}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Dots Indicator */}
      <div className="flight-container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.65rem',
          paddingTop: '0.5rem'
        }}>
          {archivePhotos.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: idx === currentIndex ? '32px' : '10px',
                height: '8px',
                borderRadius: '9999px',
                background: idx === currentIndex ? 'var(--color-airline-red)' : '#334155',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Clean Lightbox Modal - Just the pure photo with close button */}
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
            padding: '2rem'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '920px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '-3.2rem',
                right: 0,
                background: 'var(--color-airline-red)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}
            >
              <X size={22} />
            </button>

            {/* Modal Photo */}
            <div style={{
              borderRadius: '1.25rem',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)',
              maxHeight: '85vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000000'
            }}>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
