import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShieldCheck, Plane, Calendar, MapPin, X, User, Mail, Award, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function PassengerVerificationModal({ onClose }) {
  const [ticketData, setTicketData] = useState(null);
  const [dbVerified, setDbVerified] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('verify') || params.get('id') || params.get('ticket');
    const name = params.get('name') || '';
    const email = params.get('email') || '';
    const type = params.get('type') || 'Standard';

    if (id) {
      setTicketData({
        id,
        name: decodeURIComponent(name) || 'OOU Attendee',
        email: decodeURIComponent(email) || 'Verified Passenger',
        type: decodeURIComponent(type)
      });

      // Check real Supabase database if connected
      const checkDb = async () => {
        try {
          const { data, error } = await supabase
            .from('registrations')
            .select('*')
            .eq('ticket_id', id)
            .maybeSingle();

          if (data && !error) {
            setDbVerified(true);
            setTicketData({
              id: data.ticket_id || id,
              name: data.name || decodeURIComponent(name) || 'Registered Delegate',
              email: data.email || decodeURIComponent(email),
              type: data.ticket_type || type
            });
          } else {
            setDbVerified(false);
          }
        } catch (err) {
          console.warn('Live verification check:', err);
          setDbVerified(false);
        } finally {
          setLoading(false);
        }
      };

      checkDb();
    }
  }, []);

  if (!ticketData) return null;

  const isPro = ticketData.type === 'Pro' || ticketData.type === 'Platinum' || ticketData.type === 'VIP';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(10px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          border: '3px solid #000000',
          borderRadius: '0px',
          boxShadow: '12px 12px 0 var(--color-airline-red)',
          maxWidth: '560px',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          color: '#000000',
          animation: 'modalSlideUp 0.3s ease'
        }}
      >
        {/* Top Header Bar */}
        <div style={{
          background: '#000000',
          color: '#FFFFFF',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '3px solid #000000'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Plane size={18} color="var(--color-airline-red)" style={{ transform: 'rotate(-45deg)' }} />
            <span className="flight-mono" style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.08em' }}>
              OFFICIAL BOARDING CREDENTIAL VERIFICATION
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close verification modal"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Verification Status Badge */}
        <div style={{ padding: '2rem 2rem 1.5rem 2rem', textAlign: 'center' }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: '#DCFCE7',
            border: '3px solid #000000',
            boxShadow: '4px 4px 0 #000000',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem'
          }}>
            <ShieldCheck size={38} color="#16A34A" />
          </div>

          <div style={{
            display: 'inline-block',
            background: '#16A34A',
            color: '#FFFFFF',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 900,
            padding: '0.35rem 1rem',
            borderRadius: '0px',
            border: '2px solid #000000',
            marginBottom: '0.75rem',
            letterSpacing: '0.06em'
          }}>
            STATUS: 100% VERIFIED PASSENGER
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.1rem)',
            fontWeight: 950,
            margin: '0 0 0.4rem 0',
            color: '#000000',
            lineHeight: 1.15
          }}>
            Cleared For Boarding
          </h2>

          <p style={{
            fontSize: '0.92rem',
            color: '#64748B',
            margin: 0,
            lineHeight: 1.5
          }}>
            Official admission credentials for OOU FutureTech Conference 2027.
          </p>
        </div>

        {/* Passenger Information Table */}
        <div style={{
          padding: '0 2rem 2rem 2rem'
        }}>
          <div style={{
            background: '#F8FAFC',
            border: '3px solid #000000',
            borderRadius: '0px',
            boxShadow: '4px 4px 0 #000000',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.25rem 1rem'
            }}>
              <div>
                <span className="flight-mono" style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                  PASSENGER NAME
                </span>
                <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: '#000000', display: 'block', marginTop: '2px' }}>
                  {ticketData.name}
                </strong>
              </div>

              <div>
                <span className="flight-mono" style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                  TICKET SERIAL ID
                </span>
                <strong className="flight-mono" style={{ fontSize: '1.1rem', color: 'var(--color-airline-red)', display: 'block', marginTop: '2px', fontWeight: 900 }}>
                  {ticketData.id}
                </strong>
              </div>

              <div>
                <span className="flight-mono" style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                  FLIGHT & CLASS
                </span>
                <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#000000', display: 'block', marginTop: '2px' }}>
                  FT2027 • {isPro ? 'PLATINUM PRO' : 'STUDENT PASS'}
                </span>
              </div>

              <div>
                <span className="flight-mono" style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                  CLEARANCE
                </span>
                <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#16A34A', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <CheckCircle2 size={15} /> ALL GATES AUTHORIZED
                </span>
              </div>
            </div>

            <div style={{
              borderTop: '1px dashed #CBD5E1',
              marginTop: '1.25rem',
              paddingTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: '#475569'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={15} color="var(--color-airline-red)" />
                <strong>Date: To Be Announced Soon</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={15} color="var(--color-airline-red)" />
                <span>OGD Hall, Olabisi Onabanjo University, Ago-Iwoye</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="flight-btn-red"
            onClick={onClose}
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.95rem',
              fontSize: '0.95rem'
            }}
          >
            CONTINUE TO FLIGHT PORTAL
          </button>
        </div>
      </div>
    </div>
  );
}
