import React, { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { supabase } from '../../lib/supabase';
import {
  X, Plane, CheckCircle2, Download, AlertCircle, ArrowRight, ShieldCheck, Ticket
} from 'lucide-react';

export default function FlightRegisterModal({
  isOpen,
  onClose,
  initialType = 'Standard',
  isRegistrationOpen = true
}) {
  const ticketRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Standard',
    companyName: '',
    whatsappNumber: '',
    products: ''
  });
  const [ticketId, setTicketId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        type: initialType || 'Standard',
        companyName: '',
        whatsappNumber: '',
        products: ''
      });
      setIsSubmitted(false);
      setError(null);
    }
  }, [isOpen, initialType]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const generatedTicketId = `FT2027-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedTicketId);

    try {
      // Check for existing registration in Supabase
      const { data: existing, error: checkError } = await supabase
        .from('registrations')
        .select('email')
        .eq('email', formData.email.trim().toLowerCase())
        .maybeSingle();

      if (checkError) {
        console.warn('Check error:', checkError);
      }

      if (existing) {
        setError('This email is already registered on Flight FT2027. Each passenger may claim one boarding pass.');
        setLoading(false);
        return;
      }

      // Insert registration
      const { error: sbError } = await supabase
        .from('registrations')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            ticket_type: formData.type,
            ticket_id: generatedTicketId,
            company_name: formData.type === 'Pro' ? formData.companyName : null,
            whatsapp_number: formData.type === 'Pro' ? formData.whatsappNumber : null,
            products: formData.type === 'Pro' ? formData.products : null
          }
        ]);

      if (sbError) {
        console.error('Supabase error:', sbError);
        if (sbError.code === '23505') {
          setError('This email has already reserved a seat.');
        } else {
          setError('Failed to record reservation. Please check your network or try again.');
        }
        setLoading(false);
        return;
      }

      // Trigger email dispatch if server is operational
      try {
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const apiBase = isLocal ? 'http://localhost:3001' : '';
        await fetch(`${apiBase}/api/send-ticket`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email.trim().toLowerCase(),
            name: formData.name.trim(),
            ticketId: generatedTicketId,
            type: formData.type
          })
        });
      } catch (emailErr) {
        console.warn('Email dispatch failed or offline:', emailErr);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTicket = async () => {
    if (!ticketRef.current) return;
    setDownloading(true);
    try {
      const node = ticketRef.current;
      const dataUrl = await toPng(node, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#FFFFFF',
        cacheBust: true,
        width: node.scrollWidth,
        height: node.scrollHeight
      });

      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const pdf = new jsPDF({
        orientation: img.width > img.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [img.width, img.height]
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
      pdf.save(`OOU-FutureTech-2027-BoardingPass-${formData.name.replace(/\s+/g, '-')}.pdf`);
    } catch (err) {
      console.error('Download ticket error:', err);
      alert('Could not generate PDF download directly. Please take a screenshot of your boarding pass.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 'clamp(0.75rem, 2.5vw, 1.5rem)',
      overflowY: 'auto'
    }}>
      <div style={{
        background: '#FFFFFF',
        border: '3px solid #000000',
        borderRadius: '1.75rem',
        boxShadow: 'clamp(6px, 1.5vw, 12px) clamp(6px, 1.5vw, 12px) 0 #000000',
        width: '100%',
        maxWidth: isSubmitted ? '840px' : '560px',
        padding: 'clamp(1.25rem, 3.5vw, 2.5rem)',
        position: 'relative',
        margin: 'auto',
        color: '#000000'
      }}>
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#FFFFFF',
            border: '2px solid #000000',
            boxShadow: '2px 2px 0 #000000',
            borderRadius: '50%',
            color: '#000000',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#F1F5F9',
                border: '1.5px solid #000000',
                boxShadow: '2px 2px 0 #000000',
                padding: '0.35rem 0.8rem',
                borderRadius: '9999px',
                marginBottom: '0.75rem'
              }}>
                <span className="flight-status-dot" />
                <span className="flight-mono" style={{ fontSize: '0.72rem', fontWeight: 800, color: '#000000' }}>
                  PASSENGER BOOKING • FLIGHT FT2027
                </span>
              </div>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)',
                margin: '0 0 0.4rem 0',
                color: '#000000'
              }}>
                Reserve Your Seat
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748B', margin: 0 }}>
                Join Africa's next export of technology talent. Enter your passenger details to issue your official digital boarding pass.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000', display: 'block', marginBottom: '6px' }}>
                  FULL PASSENGER NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adeola Bakare"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: '#FFFFFF',
                    border: '2px solid #000000',
                    boxShadow: '3px 3px 0 #000000',
                    borderRadius: '8px',
                    color: '#000000',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000', display: 'block', marginBottom: '6px' }}>
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. adeola@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: '#FFFFFF',
                    border: '2px solid #000000',
                    boxShadow: '3px 3px 0 #000000',
                    borderRadius: '8px',
                    color: '#000000',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000', display: 'block', marginBottom: '6px' }}>
                  CLASS OF TRAVEL
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.85rem'
                }}>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'Standard' })}
                    style={{
                      padding: '0.85rem',
                      background: formData.type === 'Standard' ? 'var(--color-airline-red)' : '#FFFFFF',
                      border: '2px solid #000000',
                      boxShadow: '3px 3px 0 #000000',
                      borderRadius: '8px',
                      color: formData.type === 'Standard' ? '#FFFFFF' : '#000000',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.82rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    STUDENT PASS
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'Pro' })}
                    style={{
                      padding: '0.85rem',
                      background: formData.type === 'Pro' ? 'var(--color-airline-red)' : '#FFFFFF',
                      border: '2px solid #000000',
                      boxShadow: '3px 3px 0 #000000',
                      borderRadius: '8px',
                      color: formData.type === 'Pro' ? '#FFFFFF' : '#000000',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.82rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    INDUSTRY STAND
                  </button>
                </div>
              </div>

              {formData.type === 'Pro' && (
                <>
                  <div>
                    <label className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000', display: 'block', marginBottom: '6px' }}>
                      WHATSAPP NUMBER *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+234..."
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        background: '#FFFFFF',
                        border: '2px solid #000000',
                        boxShadow: '3px 3px 0 #000000',
                        borderRadius: '8px',
                        color: '#000000',
                        fontSize: '0.95rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000', display: 'block', marginBottom: '6px' }}>
                      COMPANY / STARTUP NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Tech"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        background: '#FFFFFF',
                        border: '2px solid #000000',
                        boxShadow: '3px 3px 0 #000000',
                        borderRadius: '8px',
                        color: '#000000',
                        fontSize: '0.95rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000', display: 'block', marginBottom: '6px' }}>
                      EXHIBIT DETAILS *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe your tech products..."
                      value={formData.products}
                      onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        background: '#FFFFFF',
                        border: '2px solid #000000',
                        boxShadow: '3px 3px 0 #000000',
                        borderRadius: '8px',
                        color: '#000000',
                        fontSize: '0.95rem',
                        outline: 'none',
                        resize: 'vertical',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </>
              )}

              {error && (
                <div style={{
                  padding: '0.85rem 1rem',
                  background: '#FEE2E2',
                  border: '2px solid #DC2626',
                  boxShadow: '3px 3px 0 #DC2626',
                  borderRadius: '8px',
                  color: '#991B1B',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}>
                  <AlertCircle size={18} flexShrink={0} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flight-btn-red"
                style={{
                  width: '100%',
                  padding: '1.1rem',
                  marginTop: '0.5rem',
                  fontSize: '1rem',
                  opacity: loading ? 0.7 : 1,
                  justifyContent: 'center'
                }}
              >
                {loading ? 'ISSUING BOARDING PASS...' : 'CONFIRM & ISSUE BOARDING PASS'}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Boarding Pass */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#DCFCE7',
                color: '#166534',
                border: '2px solid #000000',
                boxShadow: '3px 3px 0 #000000',
                padding: '0.5rem 1.4rem',
                borderRadius: '9999px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 900,
                marginBottom: '1rem'
              }}>
                <CheckCircle2 size={18} /> SEAT RESERVATION CONFIRMED
              </div>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                margin: '0 0 0.35rem 0',
                color: '#000000'
              }}>
                Your Boarding Pass is Issued
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748B', margin: 0 }}>
                Present this official credential on April 02, 2027 at OGD Hall, OOU.
              </p>
            </div>

            {/* Printable Pass Container */}
            <div
              ref={ticketRef}
              style={{
                background: '#FFFFFF',
                border: '3px solid #000000',
                boxShadow: '8px 8px 0 #000000',
                borderRadius: '1.5rem',
                padding: '2rem',
                marginBottom: '2rem',
                position: 'relative'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '2px solid #000000',
                paddingBottom: '1.25rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img
                    src="/conference-logo.png"
                    alt="OOU FutureTech"
                    style={{
                      height: '42px',
                      width: 'auto',
                      borderRadius: '8px',
                      border: '2px solid #000',
                      boxShadow: '2px 2px 0 #000',
                      objectFit: 'contain'
                    }}
                  />
                  <div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 950, fontSize: '1.15rem', color: '#000', display: 'block' }}>
                      OOU FUTURETECH
                    </span>
                    <span className="flight-mono" style={{ fontSize: '0.68rem', color: 'var(--color-airline-red)', fontWeight: 800 }}>
                      FLIGHT FT2027 • OFFICIAL PASSENGER
                    </span>
                  </div>
                </div>

                <div className="flight-mono" style={{
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  color: '#000000',
                  background: '#F1F5F9',
                  border: '2px solid #000000',
                  boxShadow: '2px 2px 0 #000000',
                  padding: '0.35rem 0.8rem',
                  borderRadius: '6px'
                }}>
                  {ticketId}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <span className="flight-mono" style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                    PASSENGER
                  </span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 900, color: '#000' }}>
                    {formData.name.toUpperCase()}
                  </span>
                </div>

                <div>
                  <span className="flight-mono" style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                    ORIGIN
                  </span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 900, color: '#000' }}>
                    OOU NIGERIA
                  </span>
                </div>

                <div>
                  <span className="flight-mono" style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                    DESTINATION
                  </span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 900, color: 'var(--color-airline-red)' }}>
                    THE FUTURE
                  </span>
                </div>

                <div>
                  <span className="flight-mono" style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 800, display: 'block' }}>
                    DATE
                  </span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 900, color: '#000' }}>
                    02 APR 2027
                  </span>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '1rem',
                padding: '1.25rem',
                background: '#F8FAFC',
                borderRadius: '12px',
                border: '2px solid #000000',
                boxShadow: '3px 3px 0 #000000',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <span className="flight-mono" style={{ fontSize: '0.62rem', color: '#64748B', fontWeight: 800 }}>
                    GATE
                  </span>
                  <span className="flight-mono" style={{ fontSize: '0.95rem', fontWeight: 900, color: '#000', display: 'block' }}>
                    GATE FT-02
                  </span>
                </div>

                <div>
                  <span className="flight-mono" style={{ fontSize: '0.62rem', color: '#64748B', fontWeight: 800 }}>
                    SEAT
                  </span>
                  <span className="flight-mono" style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--color-airline-red)', display: 'block' }}>
                    {formData.type === 'Pro' ? '01A PRIORITY' : '14F STANDARD'}
                  </span>
                </div>

                <div>
                  <span className="flight-mono" style={{ fontSize: '0.62rem', color: '#64748B', fontWeight: 800 }}>
                    CLASS
                  </span>
                  <span className="flight-mono" style={{ fontSize: '0.95rem', fontWeight: 900, color: '#000', display: 'block' }}>
                    {formData.type === 'Pro' ? 'INDUSTRY VIP' : 'STUDENT PASS'}
                  </span>
                </div>

                <div>
                  <span className="flight-mono" style={{ fontSize: '0.62rem', color: '#64748B', fontWeight: 800 }}>
                    STATUS
                  </span>
                  <span className="flight-mono" style={{ fontSize: '0.95rem', fontWeight: 900, color: '#16A34A', display: 'block' }}>
                    CONFIRMED
                  </span>
                </div>
              </div>

              {/* Barcode */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'stretch', height: '36px', gap: '2px' }}>
                  {[2, 4, 1, 3, 1, 4, 2, 5, 1, 3, 2, 4, 1, 2, 4, 1, 3, 2, 5, 1, 4, 2, 1, 3].map((w, i) => (
                    <span key={i} style={{ width: `${w * 2}px`, background: '#000000', opacity: i % 4 === 0 ? 0.4 : 1 }} />
                  ))}
                </div>
                <span className="flight-mono" style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700 }}>
                  OOU-FT2027-SECURE-ENTRY
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                type="button"
                onClick={handleDownloadTicket}
                disabled={downloading}
                className="flight-btn-red"
                style={{ flex: 1, padding: '1rem', justifyContent: 'center' }}
              >
                <Download size={18} />
                {downloading ? 'GENERATING PDF...' : 'DOWNLOAD BOARDING PASS (.PDF)'}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flight-btn-outline"
                style={{ padding: '1rem 2rem' }}
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
