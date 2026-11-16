import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  X, Plane, CheckCircle2, Clock, AlertCircle, ArrowRight, ShieldAlert, Sparkles, User, Mail, Phone, Briefcase, Code2, Palette, Globe
} from 'lucide-react';

export default function FlightRegisterModal({
  isOpen,
  onClose,
  initialType = 'Standard',
  isRegistrationOpen = true
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Techie', // 'Founder' | 'Creative' | 'Techie' | 'Others'
    type: 'Standard',
    companyName: '',
    products: ''
  });
  const [ticketId, setTicketId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'Techie',
        type: initialType || 'Standard',
        companyName: '',
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

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('Please fill in your name, email address, and phone number.');
      setLoading(false);
      return;
    }

    const generatedTicketId = `FT2027-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedTicketId);

    try {
      const cleanEmail = formData.email.trim().toLowerCase();
      const cleanPhone = formData.phone.trim();
      const cleanName = formData.name.trim();

      // Check for existing registration in Supabase
      const { data: existing, error: checkError } = await supabase
        .from('registrations')
        .select('email')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (checkError) {
        console.warn('Check error:', checkError);
      }

      if (existing) {
        setError('This email address already has a pending or confirmed application on Flight FT2027.');
        setLoading(false);
        return;
      }

      // Metadata with category, pending status, and phone
      const productsPayload = JSON.stringify({
        category: formData.category,
        status: 'pending',
        phone: cleanPhone,
        travel_class: formData.type,
        company: formData.companyName.trim() || null,
        exhibit_details: formData.products.trim() || null,
        submitted_at: new Date().toISOString()
      });

      const companyStatus = formData.companyName.trim()
        ? `STATUS:PENDING • ${formData.companyName.trim()}`
        : 'STATUS:PENDING';

      // Insert registration into Supabase
      const { error: sbError } = await supabase
        .from('registrations')
        .insert([
          {
            name: cleanName,
            email: cleanEmail,
            ticket_type: formData.type,
            ticket_id: generatedTicketId,
            whatsapp_number: cleanPhone,
            company_name: companyStatus,
            products: productsPayload
          }
        ]);

      if (sbError) {
        console.error('Supabase error:', sbError);
        if (sbError.code === '23505') {
          setError('This email has already submitted an application.');
        } else {
          setError('Failed to record reservation. Please check your connection and try again.');
        }
        setLoading(false);
        return;
      }

      // Application successfully logged as PENDING APPROVAL
      setIsSubmitted(true);
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      id: 'Founder',
      title: 'Founder',
      desc: 'Building a startup, product or venture',
      icon: Briefcase,
      color: '#8B5CF6'
    },
    {
      id: 'Creative',
      title: 'Creative',
      desc: 'UI/UX, 3D art, brand, audio/visual',
      icon: Palette,
      color: '#F59E0B'
    },
    {
      id: 'Techie',
      title: 'Techie',
      desc: 'Software, AI, data, systems engineering',
      icon: Code2,
      color: '#10B981'
    },
    {
      id: 'Others',
      title: 'Others',
      desc: 'Student, researcher, investor, ecosystem',
      icon: Globe,
      color: '#64748B'
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.78)',
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
        maxWidth: isSubmitted ? '640px' : '580px',
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
            cursor: 'pointer',
            zIndex: 10
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div style={{ marginBottom: '1.75rem' }}>
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
                  ADMISSIONS MANIFEST • STRICTLY BY INVITATION
                </span>
              </div>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.2rem)',
                margin: '0 0 0.4rem 0',
                color: '#000000',
                fontFamily: 'var(--font-heading)'
              }}>
                Request Your Invitation
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                OOU FutureTech Flight Edition is a curated gathering. Enter your details below to apply for admissions clearance.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              {/* Full Name */}
              <div>
                <label className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <User size={13} color="var(--color-airline-red)" /> FULL PASSENGER NAME *
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
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Mail size={13} color="var(--color-airline-red)" /> EMAIL ADDRESS *
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
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Phone / WhatsApp Number */}
              <div>
                <label className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Phone size={13} color="var(--color-airline-red)" /> PHONE / WHATSAPP NUMBER *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +234 812 345 6789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: '#FFFFFF',
                    border: '2px solid #000000',
                    boxShadow: '3px 3px 0 #000000',
                    borderRadius: '8px',
                    color: '#000000',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Category / Persona Selector */}
              <div>
                <label className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000', display: 'block', marginBottom: '6px' }}>
                  WHAT BEST DESCRIBES YOU? *
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.65rem'
                }}>
                  {categories.map((cat) => {
                    const isSelected = formData.category === cat.id;
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.6rem',
                          padding: '0.75rem 0.85rem',
                          background: isSelected ? '#000000' : '#FFFFFF',
                          color: isSelected ? '#FFFFFF' : '#000000',
                          border: '2px solid #000000',
                          boxShadow: isSelected ? '3px 3px 0 var(--color-airline-red)' : '2px 2px 0 #000000',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{
                          padding: '0.35rem',
                          borderRadius: '6px',
                          background: isSelected ? 'var(--color-airline-red)' : '#F1F5F9',
                          color: isSelected ? '#FFFFFF' : '#000000',
                          flexShrink: 0
                        }}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase' }}>
                            {cat.title}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: isSelected ? '#CBD5E1' : '#64748B', lineHeight: 1.25, marginTop: '2px' }}>
                            {cat.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Class of Travel */}
              <div>
                <label className="flight-mono" style={{ fontSize: '0.75rem', fontWeight: 800, color: '#000000', display: 'block', marginBottom: '6px' }}>
                  CLASS OF TRAVEL
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem'
                }}>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'Standard' })}
                    style={{
                      padding: '0.75rem',
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
                    STUDENT PASS (FREE)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'Pro' })}
                    style={{
                      padding: '0.75rem',
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
                      COMPANY / STARTUP NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Technologies"
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
                      rows={2}
                      placeholder="Briefly describe what tech products or services you plan to exhibit..."
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
                  padding: '1.05rem',
                  marginTop: '0.5rem',
                  fontSize: '0.95rem',
                  opacity: loading ? 0.7 : 1,
                  justifyContent: 'center'
                }}
              >
                {loading ? 'SUBMITTING APPLICATION...' : 'SUBMIT APPLICATION FOR INVITATION'}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen: Strictly by Invitation & Pending Approval */
          <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: '#FEF3C7',
              border: '3px solid #D97706',
              boxShadow: '4px 4px 0 #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <Clock size={34} color="#D97706" />
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FFFBEB',
              border: '2px solid #D97706',
              boxShadow: '2px 2px 0 #000000',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              color: '#B45309',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.8rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}>
              <ShieldAlert size={15} /> STATUS: PENDING ADMISSION CLEARANCE
            </div>

            <h2 style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.1rem)',
              margin: '0 0 0.75rem 0',
              color: '#000000',
              fontFamily: 'var(--font-heading)',
              lineHeight: 1.2
            }}>
              Your Registration is Pending Approval
            </h2>

            {/* Crucial Banner Required by User */}
            <div style={{
              background: '#000000',
              color: '#FFFFFF',
              border: '2px solid #000000',
              boxShadow: '4px 4px 0 var(--color-airline-red)',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              margin: '0 auto 1.5rem auto',
              textAlign: 'center'
            }}>
              <div className="flight-mono" style={{ fontSize: '0.75rem', color: 'var(--color-airline-red)', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '4px' }}>
                SECURITY & CAPACITY CLEARANCE
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                THE EVENT IS STRICTLY BY INVITATION
              </div>
            </div>

            <p style={{
              fontSize: '0.95rem',
              color: '#475569',
              margin: '0 0 1.5rem 0',
              lineHeight: 1.6,
              maxWidth: '520px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Thank you for applying, <strong>{formData.name}</strong>. Due to limited auditorium seats and curated tracks for <strong>{formData.category}s</strong>, every reservation undergoes review by the flight admissions board.
            </p>

            {/* Application Summary Box */}
            <div style={{
              background: '#F8FAFC',
              border: '2px solid #000000',
              boxShadow: '3px 3px 0 #000000',
              borderRadius: '12px',
              padding: '1.25rem',
              textAlign: 'left',
              marginBottom: '1.75rem'
            }}>
              <div className="flight-mono" style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800, marginBottom: '0.75rem' }}>
                APPLICATION RECEIPT MANIFEST:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.75rem', display: 'block' }}>REFERENCE ID:</span>
                  <span className="flight-mono" style={{ fontWeight: 900, color: 'var(--color-airline-red)' }}>{ticketId}</span>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.75rem', display: 'block' }}>COHORT CATEGORY:</span>
                  <span style={{ fontWeight: 800 }}>{formData.category.toUpperCase()}</span>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.75rem', display: 'block' }}>EMAIL:</span>
                  <span style={{ fontWeight: 700, wordBreak: 'break-all' }}>{formData.email}</span>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.75rem', display: 'block' }}>PHONE / WHATSAPP:</span>
                  <span style={{ fontWeight: 700 }}>{formData.phone}</span>
                </div>
              </div>
              <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px dashed #CBD5E1', fontSize: '0.8rem', color: '#475569' }}>
                📩 <strong>What happens next?</strong> As soon as the admin approves your registration in the dashboard, your verified <strong>Boarding Pass with QR code</strong> will be dispatched directly to your email address and WhatsApp.
              </div>
            </div>

            {/* Return / Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="flight-btn-red"
              style={{
                width: '100%',
                padding: '1rem',
                justifyContent: 'center',
                fontSize: '0.95rem'
              }}
            >
              UNDERSTOOD • RETURN TO FLIGHT FT2027
            </button>
          </div>
        )}
      </div>
    </div>
  );
}