import React, { useState, useEffect } from 'react';
import { ALTITUDE_CATEGORIES, submitAltitudeNomination } from '../../lib/altitudeService';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Award, 
  Copy,
  Sparkles
} from 'lucide-react';

export default function AltitudeNominationForm({ preselectedCategory, onNominationSuccess, onExploreClick }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: preselectedCategory || ALTITUDE_CATEGORIES[0].name,
    nomineeName: '',
    nomineeEmail: '',
    nomineePhone: '',
    organization: '',
    department: '',
    currentRole: '',
    location: 'Ogun State, Nigeria',
    portfolioUrl: '',
    linkedinUrl: '',
    instagramUrl: '',
    otherLinks: '',
    achievement: '',
    majorProjects: '',
    impactRecognition: '',
    whyWin: '',
    evidenceLinks: '',
    nominatorName: '',
    nominatorEmail: '',
    nominatorRelationship: 'Peer / Colleague',
    nominatorOrg: '',
    confirmed: false
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    if (preselectedCategory) {
      setFormData(prev => ({ ...prev, category: preselectedCategory }));
    }
  }, [preselectedCategory]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.category) errs.category = 'Please select an award category';
    } else if (step === 2) {
      if (!formData.nomineeName.trim()) errs.nomineeName = 'Nominee full name is required';
      if (!formData.organization.trim()) errs.organization = 'University or organization is required';
      if (!formData.currentRole.trim()) errs.currentRole = 'Current role is required';
      if (!formData.location.trim()) errs.location = 'Location is required';
      if (formData.nomineeEmail && !/\S+@\S+\.\S+/.test(formData.nomineeEmail)) {
        errs.nomineeEmail = 'Invalid email address format';
      }
    } else if (step === 3) {
      if (!formData.achievement.trim() || formData.achievement.trim().length < 20) {
        errs.achievement = 'Please provide a clear description of their accomplishments (at least 20 characters).';
      }
      if (!formData.whyWin.trim() || formData.whyWin.trim().length < 10) {
        errs.whyWin = 'Please provide a short statement on why this nominee should win.';
      }
    } else if (step === 4) {
      if (!formData.nominatorName.trim()) errs.nominatorName = 'Your name is required';
      if (!formData.nominatorEmail.trim()) {
        errs.nominatorEmail = 'Your email address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.nominatorEmail)) {
        errs.nominatorEmail = 'Invalid email address format';
      }
      if (!formData.nominatorRelationship.trim()) errs.nominatorRelationship = 'Please select your relationship';
    } else if (step === 5) {
      if (!formData.confirmed) {
        errs.confirmed = 'You must confirm that this information is accurate.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
      const section = document.getElementById('nominate');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setSubmitting(true);
    try {
      const res = await submitAltitudeNomination(formData);
      setSubmissionResult(res);
      if (onNominationSuccess) onNominationSuccess(res);
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ submit: 'Failed to submit nomination. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      category: ALTITUDE_CATEGORIES[0].name,
      nomineeName: '',
      nomineeEmail: '',
      nomineePhone: '',
      organization: '',
      department: '',
      currentRole: '',
      location: 'Ogun State, Nigeria',
      portfolioUrl: '',
      linkedinUrl: '',
      instagramUrl: '',
      otherLinks: '',
      achievement: '',
      majorProjects: '',
      impactRecognition: '',
      whyWin: '',
      evidenceLinks: '',
      nominatorName: '',
      nominatorEmail: '',
      nominatorRelationship: 'Peer / Colleague',
      nominatorOrg: '',
      confirmed: false
    });
    setCurrentStep(1);
    setSubmissionResult(null);
    setErrors({});
  };

  const copyReference = () => {
    if (submissionResult?.referenceId) {
      navigator.clipboard.writeText(submissionResult.referenceId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  const steps = [
    { num: 1, title: 'CATEGORY' },
    { num: 2, title: 'NOMINEE' },
    { num: 3, title: 'ACHIEVEMENTS' },
    { num: 4, title: 'NOMINATOR' },
    { num: 5, title: 'REVIEW' }
  ];

  const selectedCategoryObj = ALTITUDE_CATEGORIES.find(c => c.name === formData.category) || ALTITUDE_CATEGORIES[0];

  return (
    <section id="nominate" className="altitude-section" style={{ position: 'relative', background: '#08090C' }}>
      <div className="altitude-container">
        {/* Section Heading - Minimal Words */}
        <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
          <div className="altitude-subhead" style={{ marginBottom: '0.65rem' }}>
            <Sparkles size={14} className="altitude-text-red" />
            <span>OFFICIAL NOMINATION PORTAL // CLASS OF 2027</span>
          </div>

          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.05,
            margin: '0 0 0.75rem 0'
          }}>
            EVERY GREAT JOURNEY STARTS WITH <span style={{ color: '#FF3B4D' }}>RECOGNITION.</span>
          </h2>

          <p style={{
            fontSize: '1.1rem',
            color: '#E2E8F0',
            lineHeight: 1.5,
            margin: '0 0 0.5rem 0'
          }}>
            Nominate an exceptional student, creator, or innovator for the Altitude Awards 2027.
          </p>

          <div className="altitude-mono" style={{ fontSize: '0.75rem', color: '#CBD5E1', fontWeight: 700 }}>
            // NOMINATIONS OPEN ACROSS ALL 19 HONORS • CONFERMENT CEREMONY 2 APRIL 2027
          </div>
        </div>

        {/* Form Container */}
        <div style={{
          background: '#14171F',
          border: '1.5px solid rgba(255, 255, 255, 0.22)',
          borderRadius: '16px',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
          position: 'relative'
        }}>

          {/* SUCCESS SCREEN */}
          {submissionResult ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 1rem', maxWidth: '680px', margin: '0 auto' }}>
              <div style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: 'rgba(227, 27, 43, 0.2)',
                border: '2px solid #FF3B4D',
                color: '#FF3B4D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <CheckCircle2 size={42} />
              </div>

              <div className="altitude-subhead" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>
                <ShieldCheck size={14} className="altitude-text-gold" />
                <span>OFFICIAL SUBMISSION VERIFIED</span>
              </div>

              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '0.75rem'
              }}>
                NOMINATION RECEIVED.
              </h3>

              <p style={{ color: '#E2E8F0', fontSize: '1.05rem', lineHeight: 1.5, marginBottom: '2rem' }}>
                Your nomination has been lodged and sent for jury review.
              </p>

              {/* Reference ID Certificate Card */}
              <div style={{
                background: '#0C0F14',
                border: '2px solid #FFD700',
                borderRadius: '12px',
                padding: '1.75rem',
                marginBottom: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span className="altitude-mono" style={{ fontSize: '0.72rem', color: '#E2E8F0', fontWeight: 800 }}>
                  OFFICIAL REFERENCE CODE
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    color: '#FFD700'
                  }}>
                    {submissionResult.referenceId}
                  </span>
                  <button 
                    onClick={copyReference}
                    className="altitude-btn altitude-btn-outline"
                    style={{ padding: '0.45rem 0.9rem', fontSize: '0.75rem' }}
                    title="Copy Code"
                  >
                    {copiedRef ? <Check size={14} color="#2ED573" /> : <Copy size={14} />}
                    <span>{copiedRef ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
                <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  Please save this reference code for your records.
                </span>
              </div>

              {/* Notice */}
              <div style={{
                padding: '1rem 1.25rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                fontSize: '0.85rem',
                color: '#E2E8F0',
                lineHeight: 1.5,
                marginBottom: '2rem',
                textAlign: 'left'
              }}>
                <strong style={{ color: '#FFFFFF' }}>Jury Review Notice:</strong> All submissions enter administrative review. Only verified, approved nominees appear on the public registry.
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={resetForm}
                  className="altitude-btn altitude-btn-primary"
                  style={{ fontSize: '0.85rem', padding: '0.8rem 1.75rem' }}
                >
                  <Sparkles size={16} />
                  <span>NOMINATE ANOTHER TALENT</span>
                </button>

                {onExploreClick && (
                  <button
                    onClick={onExploreClick}
                    className="altitude-btn altitude-btn-outline"
                    style={{ fontSize: '0.85rem', padding: '0.8rem 1.75rem' }}
                  >
                    <span>EXPLORE APPROVED NOMINEES</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* Stepper Header */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.25rem',
                  gap: '0.5rem',
                  overflowX: 'auto',
                  paddingBottom: '0.5rem'
                }}>
                  {steps.map((s) => {
                    const isDone = currentStep > s.num;
                    const isCurr = currentStep === s.num;

                    return (
                      <div 
                        key={s.num}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          opacity: isCurr ? 1 : isDone ? 0.9 : 0.45,
                          flexShrink: 0
                        }}
                      >
                        <div style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          background: isDone ? '#2ED573' : isCurr ? '#FF3B4D' : 'rgba(255,255,255,0.1)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.78rem',
                          fontFamily: "'Space Mono', monospace",
                          fontWeight: 800
                        }}>
                          {isDone ? <Check size={14} /> : s.num}
                        </div>
                        <span style={{
                          fontSize: '0.78rem',
                          fontFamily: "'Space Mono', monospace",
                          fontWeight: 800,
                          color: isCurr ? '#FFFFFF' : '#E2E8F0'
                        }}>
                          {s.title}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Line */}
                <div style={{
                  height: '4px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${((currentStep - 1) / 4) * 100}%`,
                    background: 'linear-gradient(90deg, #FF3B4D, #FFD700)',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit}>
                {/* STEP 1: SELECT CATEGORY */}
                {currentStep === 1 && (
                  <div>
                    <div style={{ marginBottom: '1.75rem' }}>
                      <span className="altitude-mono" style={{ fontSize: '0.72rem', color: '#FF3B4D', fontWeight: 800 }}>
                        STEP 01 // CATEGORY SELECTION
                      </span>
                      <h3 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        margin: '0.2rem 0 0.4rem 0'
                      }}>
                        Select Award Category
                      </h3>
                      <p style={{ color: '#E2E8F0', fontSize: '0.92rem', margin: 0 }}>
                        Choose the honor that best reflects the candidate's core expertise.
                      </p>
                    </div>

                    <div style={{ marginBottom: '1.75rem' }}>
                      <label className="altitude-label">
                        Award Category <span style={{ color: '#FF3B4D' }}>*</span>
                      </label>
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="altitude-select"
                        style={{ fontSize: '0.95rem', padding: '0.95rem 1.15rem' }}
                      >
                        <optgroup label="A. TECHNOLOGY & INNOVATION">
                          {ALTITUDE_CATEGORIES.filter(c => c.group === 'TECHNOLOGY & INNOVATION').map(c => (
                            <option key={c.id} value={c.name}>
                              [{c.code}] {c.name}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="B. CREATIVE EXCELLENCE">
                          {ALTITUDE_CATEGORIES.filter(c => c.group === 'CREATIVE EXCELLENCE').map(c => (
                            <option key={c.id} value={c.name}>
                              [{c.code}] {c.name}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="C. SPECIAL RECOGNITION">
                          {ALTITUDE_CATEGORIES.filter(c => c.group === 'SPECIAL RECOGNITION').map(c => (
                            <option key={c.id} value={c.name}>
                              [{c.code}] {c.name}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      {errors.category && <div className="altitude-error"><AlertCircle size={12} /> {errors.category}</div>}
                    </div>

                    {/* Category Details Card */}
                    <div style={{
                      background: '#0C0F14',
                      border: '1.5px solid #FFD700',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div className="altitude-mono" style={{ fontSize: '0.72rem', color: '#FFD700', marginBottom: '0.3rem', fontWeight: 800 }}>
                        [{selectedCategoryObj.code}] // {selectedCategoryObj.group}
                      </div>
                      <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', color: '#FFFFFF', margin: '0 0 0.4rem 0' }}>
                        {selectedCategoryObj.name}
                      </h4>
                      <p style={{ color: '#E2E8F0', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 0.75rem 0' }}>
                        {selectedCategoryObj.shortDesc}
                      </p>
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.65rem', fontSize: '0.85rem', color: '#FFFFFF' }}>
                        <strong style={{ color: '#FFD700' }}>Criteria:</strong> {selectedCategoryObj.criteria}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: NOMINEE INFORMATION */}
                {currentStep === 2 && (
                  <div>
                    <div style={{ marginBottom: '1.75rem' }}>
                      <span className="altitude-mono" style={{ fontSize: '0.72rem', color: '#FF3B4D', fontWeight: 800 }}>
                        STEP 02 // CANDIDATE PROFILE
                      </span>
                      <h3 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        margin: '0.2rem 0 0.4rem 0'
                      }}>
                        Nominee Information
                      </h3>
                      <p style={{ color: '#E2E8F0', fontSize: '0.92rem', margin: 0 }}>
                        Provide verified credentials and contact information.
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label className="altitude-label">Nominee's Full Name <span style={{ color: '#FF3B4D' }}>*</span></label>
                        <input
                          type="text"
                          name="nomineeName"
                          value={formData.nomineeName}
                          onChange={handleChange}
                          placeholder="e.g. Oluwaseun Adeleke"
                          className="altitude-input"
                        />
                        {errors.nomineeName && <div className="altitude-error"><AlertCircle size={12} /> {errors.nomineeName}</div>}
                      </div>

                      <div>
                        <label className="altitude-label">Nominee's Email Address (Optional)</label>
                        <input
                          type="email"
                          name="nomineeEmail"
                          value={formData.nomineeEmail}
                          onChange={handleChange}
                          placeholder="nominee@example.com"
                          className="altitude-input"
                        />
                        {errors.nomineeEmail && <div className="altitude-error"><AlertCircle size={12} /> {errors.nomineeEmail}</div>}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label className="altitude-label">Nominee's Phone Number (Optional)</label>
                        <input
                          type="tel"
                          name="nomineePhone"
                          value={formData.nomineePhone}
                          onChange={handleChange}
                          placeholder="+234 800 000 0000"
                          className="altitude-input"
                        />
                      </div>

                      <div>
                        <label className="altitude-label">University or Organisation <span style={{ color: '#FF3B4D' }}>*</span></label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          placeholder="e.g. Olabisi Onabanjo University"
                          className="altitude-input"
                        />
                        {errors.organization && <div className="altitude-error"><AlertCircle size={12} /> {errors.organization}</div>}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label className="altitude-label">Department / Course of Study</label>
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          placeholder="e.g. Computer Science, 400L"
                          className="altitude-input"
                        />
                      </div>

                      <div>
                        <label className="altitude-label">Current Role or Profession <span style={{ color: '#FF3B4D' }}>*</span></label>
                        <input
                          type="text"
                          name="currentRole"
                          value={formData.currentRole}
                          onChange={handleChange}
                          placeholder="e.g. Systems Engineer / UI Designer"
                          className="altitude-input"
                        />
                        {errors.currentRole && <div className="altitude-error"><AlertCircle size={12} /> {errors.currentRole}</div>}
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <label className="altitude-label">Location <span style={{ color: '#FF3B4D' }}>*</span></label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Ago-Iwoye, Ogun State, Nigeria"
                        className="altitude-input"
                      />
                      {errors.location && <div className="altitude-error"><AlertCircle size={12} /> {errors.location}</div>}
                    </div>

                    {/* Social Profiles */}
                    <div style={{
                      padding: '1.25rem',
                      background: '#0C0F14',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      marginTop: '1.5rem'
                    }}>
                      <div className="altitude-mono" style={{ fontSize: '0.72rem', color: '#FFD700', marginBottom: '0.75rem', fontWeight: 800 }}>
                        DIGITAL CHANNELS (OPTIONAL)
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                        <div>
                          <label className="altitude-label">Portfolio URL</label>
                          <input
                            type="url"
                            name="portfolioUrl"
                            value={formData.portfolioUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="altitude-input"
                          />
                        </div>
                        <div>
                          <label className="altitude-label">LinkedIn Profile</label>
                          <input
                            type="url"
                            name="linkedinUrl"
                            value={formData.linkedinUrl}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/..."
                            className="altitude-input"
                          />
                        </div>
                        <div>
                          <label className="altitude-label">Instagram Handle</label>
                          <input
                            type="text"
                            name="instagramUrl"
                            value={formData.instagramUrl}
                            onChange={handleChange}
                            placeholder="@username"
                            className="altitude-input"
                          />
                        </div>
                        <div>
                          <label className="altitude-label">GitHub / Repository</label>
                          <input
                            type="text"
                            name="otherLinks"
                            value={formData.otherLinks}
                            onChange={handleChange}
                            placeholder="https://github.com/..."
                            className="altitude-input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: ACHIEVEMENTS & CONTRIBUTIONS */}
                {currentStep === 3 && (
                  <div>
                    <div style={{ marginBottom: '1.75rem' }}>
                      <span className="altitude-mono" style={{ fontSize: '0.72rem', color: '#FF3B4D', fontWeight: 800 }}>
                        STEP 03 // MERIT SPECIFICATIONS
                      </span>
                      <h3 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        margin: '0.2rem 0 0.4rem 0'
                      }}>
                        Achievements and Contributions
                      </h3>
                      <p style={{ color: '#E2E8F0', fontSize: '0.92rem', margin: 0 }}>
                        Describe the candidate's work and impact for jury evaluation.
                      </p>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <label className="altitude-label">
                        Nominee's Core Achievement <span style={{ color: '#FF3B4D' }}>*</span>
                      </label>
                      <textarea
                        name="achievement"
                        value={formData.achievement}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Describe their major accomplishment, projects, impact, or contributions."
                        className="altitude-textarea"
                      />
                      {errors.achievement && <div className="altitude-error"><AlertCircle size={12} /> {errors.achievement}</div>}
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <label className="altitude-label">Major Projects and Innovations</label>
                      <textarea
                        name="majorProjects"
                        value={formData.majorProjects}
                        onChange={handleChange}
                        rows={2}
                        placeholder="List key projects, apps, products, or campaigns completed by the nominee."
                        className="altitude-textarea"
                      />
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <label className="altitude-label">Impact and Recognition</label>
                      <textarea
                        name="impactRecognition"
                        value={formData.impactRecognition}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Notable awards, community results, or metrics achieved."
                        className="altitude-textarea"
                      />
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <label className="altitude-label">
                        Why Should This Person Win? <span style={{ color: '#FF3B4D' }}>*</span>
                      </label>
                      <textarea
                        name="whyWin"
                        value={formData.whyWin}
                        onChange={handleChange}
                        rows={2}
                        placeholder="One compelling statement explaining why this nominee deserves the award."
                        className="altitude-textarea"
                      />
                      {errors.whyWin && <div className="altitude-error"><AlertCircle size={12} /> {errors.whyWin}</div>}
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                      <label className="altitude-label">Supporting Evidence Links (Optional)</label>
                      <input
                        type="text"
                        name="evidenceLinks"
                        value={formData.evidenceLinks}
                        onChange={handleChange}
                        placeholder="Links to live projects, portfolios, drive folders, or media..."
                        className="altitude-input"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: NOMINATOR INFORMATION */}
                {currentStep === 4 && (
                  <div>
                    <div style={{ marginBottom: '1.75rem' }}>
                      <span className="altitude-mono" style={{ fontSize: '0.72rem', color: '#FF3B4D', fontWeight: 800 }}>
                        STEP 04 // CONFIDENTIAL ATTESTATION
                      </span>
                      <h3 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        margin: '0.2rem 0 0.4rem 0'
                      }}>
                        Nominator Information
                      </h3>
                      <p style={{ color: '#E2E8F0', fontSize: '0.92rem', margin: 0 }}>
                        Nominator identities are confidential and never displayed publicly.
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label className="altitude-label">Your Full Name <span style={{ color: '#FF3B4D' }}>*</span></label>
                        <input
                          type="text"
                          name="nominatorName"
                          value={formData.nominatorName}
                          onChange={handleChange}
                          placeholder="e.g. Dr. Babatunde Johnson"
                          className="altitude-input"
                        />
                        {errors.nominatorName && <div className="altitude-error"><AlertCircle size={12} /> {errors.nominatorName}</div>}
                      </div>

                      <div>
                        <label className="altitude-label">Your Email Address <span style={{ color: '#FF3B4D' }}>*</span></label>
                        <input
                          type="email"
                          name="nominatorEmail"
                          value={formData.nominatorEmail}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="altitude-input"
                        />
                        {errors.nominatorEmail && <div className="altitude-error"><AlertCircle size={12} /> {errors.nominatorEmail}</div>}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                      <div>
                        <label className="altitude-label">Relationship with Nominee <span style={{ color: '#FF3B4D' }}>*</span></label>
                        <select
                          name="nominatorRelationship"
                          value={formData.nominatorRelationship}
                          onChange={handleChange}
                          className="altitude-select"
                        >
                          <option value="Peer / Colleague">Peer / Colleague</option>
                          <option value="Mentor / Supervisor">Mentor / Supervisor</option>
                          <option value="Lecturer / Faculty Lead">Lecturer / Faculty Lead</option>
                          <option value="Team Member / Co-founder">Team Member / Co-founder</option>
                          <option value="Client / User">Client / User</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.nominatorRelationship && <div className="altitude-error"><AlertCircle size={12} /> {errors.nominatorRelationship}</div>}
                      </div>

                      <div>
                        <label className="altitude-label">Your Organisation (Optional)</label>
                        <input
                          type="text"
                          name="nominatorOrg"
                          value={formData.nominatorOrg}
                          onChange={handleChange}
                          placeholder="e.g. OOU Google Developer Group"
                          className="altitude-input"
                        />
                      </div>
                    </div>

                    <div style={{
                      padding: '1rem 1.25rem',
                      background: 'rgba(227, 27, 43, 0.12)',
                      border: '1.5px solid #FF3B4D',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <ShieldCheck size={20} className="altitude-text-red" style={{ flexShrink: 0 }} />
                      <span>
                        <strong>Confidentiality:</strong> Nominator identities are strictly protected under committee protocols.
                      </span>
                    </div>
                  </div>
                )}

                {/* STEP 5: REVIEW & SUBMIT */}
                {currentStep === 5 && (
                  <div>
                    <div style={{ marginBottom: '1.75rem' }}>
                      <span className="altitude-mono" style={{ fontSize: '0.72rem', color: '#FF3B4D', fontWeight: 800 }}>
                        STEP 05 // REVIEW & CONFIRM
                      </span>
                      <h3 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        margin: '0.2rem 0 0.4rem 0'
                      }}>
                        Review Nomination Manifest
                      </h3>
                      <p style={{ color: '#E2E8F0', fontSize: '0.92rem', margin: 0 }}>
                        Confirm details before transmitting to the Altitude Awards jury.
                      </p>
                    </div>

                    {/* Summary Card */}
                    <div style={{
                      background: '#0C0F14',
                      border: '1.5px solid #FFD700',
                      borderRadius: '10px',
                      padding: '1.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.25rem',
                        marginBottom: '1.25rem',
                        paddingBottom: '1.25rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
                      }}>
                        <div>
                          <div className="altitude-mono" style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>CATEGORY</div>
                          <div style={{ color: '#FFD700', fontWeight: 800, fontSize: '0.95rem' }}>{formData.category}</div>
                        </div>
                        <div>
                          <div className="altitude-mono" style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>NOMINEE</div>
                          <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1rem' }}>{formData.nomineeName}</div>
                        </div>
                        <div>
                          <div className="altitude-mono" style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>ROLE & ORG</div>
                          <div style={{ color: '#FFFFFF', fontSize: '0.9rem' }}>{formData.currentRole} at {formData.organization}</div>
                        </div>
                        <div>
                          <div className="altitude-mono" style={{ fontSize: '0.7rem', color: '#CBD5E1' }}>NOMINATOR</div>
                          <div style={{ color: '#FFFFFF', fontSize: '0.9rem' }}>{formData.nominatorName} ({formData.nominatorRelationship})</div>
                        </div>
                      </div>

                      <div>
                        <div className="altitude-mono" style={{ fontSize: '0.7rem', color: '#CBD5E1', marginBottom: '0.25rem' }}>
                          ACHIEVEMENT SUMMARY
                        </div>
                        <p style={{ color: '#E2E8F0', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                          "{formData.achievement}"
                        </p>

                        <div className="altitude-mono" style={{ fontSize: '0.7rem', color: '#FF3B4D', marginBottom: '0.25rem', fontWeight: 800 }}>
                          WHY THEY SHOULD WIN
                        </div>
                        <p style={{ color: '#FFFFFF', fontSize: '0.9rem', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                          "{formData.whyWin}"
                        </p>
                      </div>
                    </div>

                    {/* Attestation Checkbox */}
                    <div style={{
                      padding: '1.25rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1.5px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      marginBottom: '1.25rem'
                    }}>
                      <label style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        color: '#FFFFFF',
                        fontSize: '0.88rem',
                        lineHeight: 1.5
                      }}>
                        <input
                          type="checkbox"
                          name="confirmed"
                          checked={formData.confirmed}
                          onChange={handleChange}
                          style={{ marginTop: '0.2rem', accentColor: '#FF3B4D', width: '18px', height: '18px' }}
                        />
                        <span>
                          <strong>Official Attestation:</strong> I confirm this information is accurate and authorized.
                        </span>
                      </label>
                      {errors.confirmed && <div className="altitude-error" style={{ marginTop: '0.4rem' }}><AlertCircle size={12} /> {errors.confirmed}</div>}
                    </div>

                    <div style={{
                      fontSize: '0.78rem',
                      color: '#CBD5E1',
                      lineHeight: 1.5,
                      marginBottom: '1.5rem'
                    }}>
                      <strong>Privacy Notice:</strong> Details are reviewed by the jury and published upon official approval.
                    </div>

                    {errors.submit && (
                      <div className="altitude-error" style={{ marginBottom: '1.25rem', fontSize: '0.9rem' }}>
                        <AlertCircle size={14} /> {errors.submit}
                      </div>
                    )}
                  </div>
                )}

                {/* Form Controls */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.12)'
                }}>
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={submitting}
                      className="altitude-btn altitude-btn-outline"
                      style={{ fontSize: '0.82rem', padding: '0.75rem 1.4rem' }}
                    >
                      <ArrowLeft size={14} />
                      <span>BACK</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="altitude-btn altitude-btn-primary"
                      style={{ fontSize: '0.82rem', padding: '0.75rem 1.75rem' }}
                    >
                      <span>CONTINUE</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="altitude-btn altitude-btn-primary"
                      style={{ fontSize: '0.88rem', padding: '0.85rem 2rem' }}
                    >
                      {submitting ? (
                        <>
                          <div className="altitude-spinner" />
                          <span>TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>SUBMIT NOMINATION</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
