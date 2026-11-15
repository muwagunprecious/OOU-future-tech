import React, { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { supabase } from '../../lib/supabase';
import {
  X, Plane, CheckCircle2, Download, AlertCircle, ArrowRight, ShieldCheck, Ticket, Image as ImageIcon
} from 'lucide-react';
import FlightTicketCard from './FlightTicketCard';

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

  const handleDownloadPng = async () => {
    if (!ticketRef.current) return;
    setDownloading(true);
    try {
      const node = ticketRef.current;
      const dataUrl = await toPng(node, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#FFFFFF',
        cacheBust: true
      });

      const link = document.createElement('a');
      link.download = `OOU-FutureTech-2027-BoardingPass-${formData.name.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download PNG error:', err);
      alert('Could not generate PNG download directly.');
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
                Present this official credential at OGD Hall, OOU. Event date to be announced soon.
              </p>
            </div>

            {/* Printable Pass Container */}
            <div
              ref={ticketRef}
              style={{
                maxWidth: '780px',
                margin: '0 auto 2rem auto',
                padding: '4px',
                backgroundColor: '#FFFFFF'
              }}
            >
              <FlightTicketCard
                ticketId={ticketId}
                name={formData.name.toUpperCase()}
                email={formData.email}
                ticketClass={formData.type}
                price={formData.type === 'Pro' ? '₦50,000' : '₦0'}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
              <button
                type="button"
                onClick={handleDownloadPng}
                disabled={downloading}
                className="flight-btn-red"
                style={{ flex: 1, minWidth: '200px', padding: '0.95rem 1.25rem', justifyContent: 'center', fontSize: '0.9rem' }}
              >
                <ImageIcon size={18} />
                {downloading ? 'PROCESSING...' : 'SAVE BOARDING PASS (.PNG)'}
              </button>

              <button
                type="button"
                onClick={handleDownloadTicket}
                disabled={downloading}
                className="flight-btn-red"
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '0.95rem 1.25rem',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  background: '#000000'
                }}
              >
                <Download size={18} />
                {downloading ? 'PROCESSING...' : 'DOWNLOAD DOCUMENT (.PDF)'}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flight-btn-outline"
                style={{ padding: '0.95rem 1.5rem', fontSize: '0.9rem' }}
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
