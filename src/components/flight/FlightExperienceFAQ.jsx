import React, { useState } from 'react';
import { Plus, Minus, Plane, Mail, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function FlightExperienceFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Who is eligible to board Flight FT2027?',
      a: 'Open to all OOU students, visiting undergraduates, software developers, product designers, and tech founders across Africa.'
    },
    {
      q: 'Is ticket registration free for OOU students?',
      a: 'Yes, General Admission (Student Pass) is 100% free with access to all keynotes, breakout halls, and a digital Certificate of Boarding.'
    },
    {
      q: 'What is included in the Industry & Pro Stand pass?',
      a: 'An exhibition booth in the concourse, recruitment access to top student engineers, investor networking, and VIP Flight Lounge privileges.'
    },
    {
      q: 'How do I receive and present my Boarding Pass?',
      a: 'Your pass generates instantly upon registration. Save it to your phone and show it at Gate FT-02 on April 02, 2027 for rapid check-in.'
    },
    {
      q: 'How can organizations partner or sponsor?',
      a: 'We offer Platinum, Gold, and Silver tiers. Reach our flight coordinators directly at ooufuturetech@gmail.com for the prospectus.'
    }
  ];

  return (
    <section id="faqs" className="flight-section alt-bg" style={{ backgroundColor: '#F8FAFC' }}>
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
                PASSENGER INFORMATION • PROTOCOLS & FAQS
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1,
              margin: 0,
              color: '#000000'
            }}>
              FLIGHT PROTOCOLS & FAQS.
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
            Quick answers to passenger registration, gate requirements, and event logistics.
          </p>
        </div>

        {/* 2-Column Visual & FAQ Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          
          {/* Left Visual Concourse Card */}
          <div style={{
            background: '#FFFFFF',
            border: '3px solid #000000',
            borderRadius: '1.75rem',
            boxShadow: '8px 8px 0 #000000',
            overflow: 'hidden'
          }}>
            <div style={{ height: '220px', position: 'relative', overflow: 'hidden', borderBottom: '3px solid #000000' }}>
              <img
                src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80"
                alt="Airport Departure Concourse"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: '#000000',
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 900,
                padding: '4px 10px',
                borderRadius: '6px'
              }}>
                GATE FT-02 // DEPARTURE LOUNGE
              </div>
            </div>

            <div style={{ padding: '2rem' }}>
              <span className="flight-mono" style={{ fontSize: '0.72rem', color: 'var(--color-airline-red)', fontWeight: 800, display: 'block', marginBottom: '0.35rem' }}>
                PASSENGER DISPATCH CONCIERGE
              </span>
              <h3 style={{ fontSize: '1.4rem', color: '#000000', margin: '0 0 1rem 0' }}>
                Need Help With Your Booking?
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.55, margin: '0 0 1.5rem 0' }}>
                Our dispatch crew is on standby to assist with ticketing, group seats, and sponsorship enquiries.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', fontWeight: 700, color: '#000000' }}>
                  <CheckCircle2 size={16} color="var(--color-airline-red)" />
                  Instant digital boarding pass
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', fontWeight: 700, color: '#000000' }}>
                  <CheckCircle2 size={16} color="var(--color-airline-red)" />
                  Free student admission pass
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', fontWeight: 700, color: '#000000' }}>
                  <CheckCircle2 size={16} color="var(--color-airline-red)" />
                  Fast-track RFID gate check-in
                </div>
              </div>

              <a
                href="mailto:ooufuturetech@gmail.com"
                className="flight-btn-red"
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem 1.5rem', fontSize: '0.88rem' }}
              >
                <Mail size={16} /> CONTACT DISPATCH DESK
              </a>
            </div>
          </div>

          {/* Right 3D FAQ Accordion List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {faqs.map((f, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: '2px solid #000000',
                    boxShadow: isOpen ? '6px 6px 0 var(--color-airline-red)' : '4px 4px 0 #000000',
                    borderRadius: '1.25rem',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '1.35rem 1.6rem',
                      background: 'transparent',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)',
                      fontWeight: 900,
                      color: '#000000'
                    }}>
                      {f.q}
                    </span>
                    <span style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: isOpen ? 'var(--color-airline-red)' : '#F1F5F9',
                      border: '2px solid #000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: isOpen ? '#FFFFFF' : '#000000',
                      transition: 'all 0.2s ease'
                    }}>
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 1.6rem 1.4rem 1.6rem',
                      color: '#475569',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      borderTop: '2px solid #E2E8F0',
                      paddingTop: '1rem'
                    }}>
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
