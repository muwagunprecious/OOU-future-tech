import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FlightExperienceFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Who is eligible to board Flight FT2027?',
      a: 'Flight FT2027 is open to all students of Olabisi Onabanjo University, visiting university undergraduates, software engineers, product designers, venture founders, and anyone invested in Africa\'s technological sovereignty.'
    },
    {
      q: 'Is ticket registration free for OOU students?',
      a: 'Yes. General Admission (Student Pass) is completely free of charge. It provides full access to main stage keynotes, the exhibition concourse, break-out seminars, and a digital Certificate of Boarding.'
    },
    {
      q: 'What is included in the Industry & Pro Stand pass?',
      a: 'The Industry Pass provides an exclusive branded exhibition booth in the flight concourse to showcase your tech products, meet student talent, pitch to investors, and access the VIP Flight Lounge.'
    },
    {
      q: 'How do I download and present my Boarding Pass on the event day?',
      a: 'Upon reserving your seat through our registration portal, your official digital boarding pass is generated instantly. You can save it directly to your mobile device as a PDF or PNG. Present this pass at Gate FT-02 on April 02, 2027 for swift badge collection.'
    },
    {
      q: 'How can organizations partner or sponsor Flight FT2027?',
      a: 'Corporate entities, tech startups, and academic institutions can partner across our Platinum, Gold, and Silver flight tiers. Contact our flight coordinators via ooufuturetech@gmail.com for the complete sponsorship deck.'
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
            maxWidth: '520px',
            margin: 0,
            lineHeight: 1.6
          }}>
            Clear answers to your passenger enquiries, ticketing policies, gate requirements, and sponsorship pathways.
          </p>
        </div>

        {/* 3D FAQ Accordion List */}
        <div style={{ maxWidth: '920px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                    padding: '1.5rem 2rem',
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
                    fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
                    fontWeight: 900,
                    color: '#000000'
                  }}>
                    {f.q}
                  </span>
                  <span style={{
                    width: '32px',
                    height: '32px',
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
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 2rem 1.75rem 2rem',
                    color: '#475569',
                    fontSize: '1rem',
                    lineHeight: 1.65,
                    borderTop: '2px solid #E2E8F0',
                    paddingTop: '1.25rem'
                  }}>
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
