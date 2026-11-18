import React, { useState, useMemo } from 'react';
import { ALTITUDE_CATEGORIES, CATEGORY_GROUPS } from '../../lib/altitudeService';
import AltitudeNomineeModal from './AltitudeNomineeModal';
import { 
  Search, 
  Filter, 
  Eye, 
  Award, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  UserPlus,
  Code, 
  Palette 
} from 'lucide-react';

export default function AltitudeNominees({ 
  nominees = [], 
  selectedCategoryFilter, 
  onSelectCategoryFilter,
  onNominateClick 
}) {
  const [activeGroup, setActiveGroup] = useState('ALL NOMINEES');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNomineeModal, setActiveNomineeModal] = useState(null);

  // Filter nominees
  const filteredNominees = useMemo(() => {
    return nominees.filter((nominee) => {
      // 1. Group filter
      if (activeGroup !== 'ALL NOMINEES') {
        const catObj = ALTITUDE_CATEGORIES.find(c => c.name === nominee.category);
        if (catObj && catObj.group !== activeGroup) return false;
      }

      // 2. Specific category filter
      if (selectedCategoryFilter && selectedCategoryFilter !== 'ALL') {
        if (nominee.category !== selectedCategoryFilter) return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = (nominee.nominee_name || '').toLowerCase().includes(q);
        const orgMatch = (nominee.organization || '').toLowerCase().includes(q);
        const roleMatch = (nominee.current_role || '').toLowerCase().includes(q);
        const catMatch = (nominee.category || '').toLowerCase().includes(q);
        if (!nameMatch && !orgMatch && !roleMatch && !catMatch) return false;
      }

      return true;
    });
  }, [nominees, activeGroup, selectedCategoryFilter, searchQuery]);

  const getGroupIcon = (group) => {
    if (group === 'TECHNOLOGY & INNOVATION') return <Code size={13} className="altitude-text-red" />;
    if (group === 'CREATIVE EXCELLENCE') return <Palette size={13} className="altitude-text-gold" />;
    return <Award size={13} style={{ color: '#FFFFFF' }} />;
  };

  return (
    <section id="nominees" className="altitude-section" style={{ background: '#08090C', position: 'relative' }}>
      <div className="altitude-container">
        {/* Section Header */}
        <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
          <div className="altitude-subhead" style={{ marginBottom: '0.65rem' }}>
            <Award size={14} className="altitude-text-gold" />
            <span>OFFICIAL REGISTRY // APPROVED HONOREES</span>
          </div>

          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.05,
            margin: '0 0 0.75rem 0'
          }}>
            MEET THE <span style={{ color: '#FF3B4D' }}>NOMINEES.</span>
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: '#E2E8F0',
            lineHeight: 1.5,
            margin: 0
          }}>
            Officially reviewed and approved candidates for the Altitude Awards 2027.
          </p>
        </div>

        {/* Filter & Search Bar - High Contrast */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2.5rem',
          padding: '1.25rem 1.5rem',
          background: '#14171F',
          border: '1.5px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px'
        }}>
          {/* Search & Category Select */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <div style={{ position: 'relative' }}>
              <Search 
                size={16} 
                style={{
                  position: 'absolute',
                  left: '1.25rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94A3B8'
                }} 
              />
              <input
                type="text"
                placeholder="Search nominee by name, role, or org..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="altitude-input"
                style={{ paddingLeft: '3rem', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <select
                value={selectedCategoryFilter || 'ALL'}
                onChange={(e) => onSelectCategoryFilter && onSelectCategoryFilter(e.target.value === 'ALL' ? null : e.target.value)}
                className="altitude-select"
                style={{ fontSize: '0.9rem' }}
              >
                <option value="ALL">All Categories (19 Total)</option>
                <optgroup label="TECHNOLOGY & INNOVATION">
                  {ALTITUDE_CATEGORIES.filter(c => c.group === 'TECHNOLOGY & INNOVATION').map(c => (
                    <option key={c.id} value={c.name}>[{c.code}] {c.name}</option>
                  ))}
                </optgroup>
                <optgroup label="CREATIVE EXCELLENCE">
                  {ALTITUDE_CATEGORIES.filter(c => c.group === 'CREATIVE EXCELLENCE').map(c => (
                    <option key={c.id} value={c.name}>[{c.code}] {c.name}</option>
                  ))}
                </optgroup>
                <optgroup label="SPECIAL RECOGNITION">
                  {ALTITUDE_CATEGORIES.filter(c => c.group === 'SPECIAL RECOGNITION').map(c => (
                    <option key={c.id} value={c.name}>[{c.code}] {c.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Group Pills & Live Count */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {CATEGORY_GROUPS.map((group) => {
                const isActive = activeGroup === group;
                return (
                  <button
                    key={group}
                    onClick={() => setActiveGroup(group)}
                    className={`altitude-pill ${isActive ? 'active' : ''}`}
                    style={{ fontSize: '0.76rem', padding: '0.35rem 0.85rem' }}
                  >
                    {group !== 'ALL NOMINEES' && getGroupIcon(group)}
                    <span>{group}</span>
                  </button>
                );
              })}
            </div>

            <div className="altitude-mono" style={{ fontSize: '0.75rem', color: '#FFFFFF', fontWeight: 800 }}>
              SHOWING <strong style={{ color: '#FFD700' }}>{filteredNominees.length}</strong> APPROVED NOMINEES
            </div>
          </div>
        </div>

        {/* Nominees Grid */}
        {filteredNominees.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {filteredNominees.map((nominee) => {
              return (
                <div 
                  key={nominee.id || nominee.reference_id}
                  id={`nominee-${nominee.id || nominee.reference_id}`}
                  className="altitude-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    padding: 0,
                    border: '1.5px solid rgba(255, 255, 255, 0.2)',
                    background: '#14171F'
                  }}
                >
                  {/* Portrait photo */}
                  <div style={{
                    width: '100%',
                    height: '340px',
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#0D0F14'
                  }}>
                    <img 
                      src={nominee.image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'} 
                      alt={nominee.nominee_name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'contrast(106%)'
                      }}
                    />

                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(8, 9, 12, 0.1) 0%, rgba(8, 9, 12, 0.45) 45%, rgba(8, 9, 12, 0.96) 100%)'
                    }} />

                    {/* Top Tag */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      right: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span className="altitude-tag altitude-tag-red" style={{ fontSize: '0.68rem', boxShadow: '0 4px 12px rgba(0,0,0,0.7)' }}>
                        [{nominee.category_code || 'HONORIS'}] {nominee.category}
                      </span>
                      <span className="altitude-tag" style={{ background: 'rgba(0,0,0,0.8)', border: '1.5px solid rgba(255,255,255,0.3)', fontSize: '0.68rem' }}>
                        NOMINEE
                      </span>
                    </div>

                    {/* Bottom overlay: Name & Role */}
                    <div style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '1.25rem',
                      right: '1.25rem'
                    }}>
                      <h3 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.7rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        margin: 0,
                        lineHeight: 1.2,
                        textShadow: '0 2px 8px rgba(0,0,0,0.9)'
                      }}>
                        {nominee.nominee_name}
                      </h3>
                      <div style={{ fontSize: '0.85rem', color: '#E2E8F0', marginTop: '0.2rem', fontWeight: 600 }}>
                        {nominee.currentRole || nominee.current_role}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                    background: '#14171F'
                  }}>
                    <div>
                      <div className="altitude-mono" style={{ fontSize: '0.72rem', color: '#FFD700', marginBottom: '0.5rem', fontWeight: 700 }}>
                        {nominee.organization} {nominee.department ? `• ${nominee.department}` : ''}
                      </div>

                      <p style={{
                        fontSize: '0.9rem',
                        color: '#E2E8F0',
                        lineHeight: 1.55,
                        marginBottom: '1.5rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        "{nominee.achievement}"
                      </p>
                    </div>

                    {/* Footer: View Profile */}
                    <div style={{
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: '#2ED573', fontFamily: "'Space Mono', monospace", fontWeight: 800 }}>
                        <ShieldCheck size={14} />
                        <span>VERIFIED</span>
                      </div>

                      <button
                        onClick={() => setActiveNomineeModal(nominee)}
                        className="altitude-btn altitude-btn-outline"
                        style={{ fontSize: '0.75rem', padding: '0.55rem 1.1rem' }}
                      >
                        <Eye size={13} />
                        <span>VIEW PROFILE</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State - High Contrast */
          <div style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            background: '#14171F',
            border: '2px dashed rgba(255, 255, 255, 0.25)',
            borderRadius: '14px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
              color: '#FFD700'
            }}>
              <Award size={28} />
            </div>

            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '0.5rem'
            }}>
              No Approved Nominees In This Category Yet
            </h3>

            <p style={{
              maxWidth: '500px',
              margin: '0 auto 1.75rem auto',
              color: '#E2E8F0',
              fontSize: '0.92rem',
              lineHeight: 1.5
            }}>
              Jury deliberations are underway. Approved honorees will appear here.
            </p>

            <button
              onClick={onNominateClick}
              className="altitude-btn altitude-btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.8rem 1.75rem' }}
            >
              <UserPlus size={15} />
              <span>NOMINATE SOMEONE</span>
            </button>
          </div>
        )}
      </div>

      {activeNomineeModal && (
        <AltitudeNomineeModal 
          nominee={activeNomineeModal} 
          onClose={() => setActiveNomineeModal(null)} 
        />
      )}
    </section>
  );
}
