import React, { useState, useMemo } from 'react';
import { ALTITUDE_CATEGORIES, CATEGORY_GROUPS } from '../../lib/altitudeService';
import { ArrowRight, Sparkles, Code, Palette, Award, Search, CheckCircle2 } from 'lucide-react';

export default function AltitudeCategories({ onSelectCategory, onNominateCategory, approvedNominees = [] }) {
  const [activeGroup, setActiveGroup] = useState('ALL NOMINEES');
  const [searchQuery, setSearchQuery] = useState('');

  // Count approved nominees per category
  const countsByCategory = useMemo(() => {
    const map = {};
    approvedNominees.forEach(n => {
      const cat = n.category;
      map[cat] = (map[cat] || 0) + 1;
    });
    return map;
  }, [approvedNominees]);

  // Filter categories
  const filteredCategories = useMemo(() => {
    return ALTITUDE_CATEGORIES.filter(c => {
      if (activeGroup !== 'ALL NOMINEES' && c.group !== activeGroup) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchDesc = c.shortDesc.toLowerCase().includes(q);
        const matchCode = c.code.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCode) return false;
      }
      return true;
    });
  }, [activeGroup, searchQuery]);

  const getGroupIcon = (group) => {
    if (group === 'TECHNOLOGY & INNOVATION') return <Code size={13} className="altitude-text-red" />;
    if (group === 'CREATIVE EXCELLENCE') return <Palette size={13} className="altitude-text-gold" />;
    return <Award size={13} style={{ color: '#FFFFFF' }} />;
  };

  return (
    <section id="categories" className="altitude-section" style={{ position: 'relative', background: '#08090C' }}>
      <div className="altitude-container">
        {/* Header */}
        <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
          <div className="altitude-subhead" style={{ marginBottom: '0.65rem' }}>
            <Award size={14} className="altitude-text-red" />
            <span>HONORS REGISTER // 19 OFFICIAL CATEGORIES</span>
          </div>

          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            lineHeight: 1.05,
            margin: '0 0 0.75rem 0'
          }}>
            AWARD <span style={{ color: '#FF3B4D' }}>CATEGORIES.</span>
          </h2>

          <p style={{
            fontSize: '1.05rem',
            color: '#E2E8F0',
            lineHeight: 1.5,
            margin: 0
          }}>
            19 distinct honors across Technology, Creative Excellence, and Special Recognition.
          </p>
        </div>

        {/* Filter Bar with Search and Group Pills */}
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
          {/* Category Search */}
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
              placeholder="Search category by name or code (e.g. AI, Developer, Animator, TECH-01)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="altitude-input"
              style={{ paddingLeft: '3rem', fontSize: '0.9rem' }}
            />
          </div>

          {/* Group Tabs & Active Count */}
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
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontSize: '0.76rem',
                      padding: '0.4rem 0.85rem'
                    }}
                  >
                    {group !== 'ALL NOMINEES' && getGroupIcon(group)}
                    <span>{group}</span>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '10px',
                      background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                      fontSize: '0.68rem',
                      fontWeight: 800
                    }}>
                      {group === 'ALL NOMINEES' 
                        ? ALTITUDE_CATEGORIES.length 
                        : ALTITUDE_CATEGORIES.filter(c => c.group === group).length}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="altitude-mono" style={{ fontSize: '0.72rem', color: '#FFFFFF', fontWeight: 800 }}>
              SHOWING <span style={{ color: '#FFD700' }}>{filteredCategories.length}</span> OF 19
            </div>
          </div>
        </div>

        {/* Categories Grid - High Contrast, One-Liners */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredCategories.map((cat) => {
            const count = countsByCategory[cat.name] || 0;
            const isTech = cat.group === 'TECHNOLOGY & INNOVATION';
            const isCreative = cat.group === 'CREATIVE EXCELLENCE';

            return (
              <div 
                key={cat.id}
                className="altitude-card"
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#14171F',
                  border: '1.5px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <div>
                  {/* Top Bar: Code & Count */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <span className="altitude-mono" style={{
                      fontSize: '0.8rem',
                      color: isTech ? '#FF3B4D' : isCreative ? '#FFD700' : '#FFFFFF',
                      fontWeight: 800
                    }}>
                      [{cat.code}]
                    </span>

                    <span style={{
                      fontSize: '0.72rem',
                      fontFamily: "'Space Mono', monospace",
                      fontWeight: 800,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                      background: count > 0 ? 'rgba(46, 213, 115, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                      border: `1.5px solid ${count > 0 ? '#2ED573' : 'rgba(255, 255, 255, 0.2)'}`,
                      color: count > 0 ? '#2ED573' : '#E2E8F0',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: count > 0 ? '#2ED573' : '#94A3B8'
                      }} />
                      {count} {count === 1 ? 'APPROVED' : 'APPROVED'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: '0.5rem',
                    lineHeight: 1.2
                  }}>
                    {cat.name}
                  </h3>

                  {/* Single-Line Description */}
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#E2E8F0',
                    lineHeight: 1.5,
                    marginBottom: '1rem'
                  }}>
                    {cat.shortDesc}
                  </p>

                  {/* Single-Line Jury Criteria */}
                  <div style={{
                    padding: '0.75rem 1rem',
                    background: '#0C0F14',
                    borderLeft: `3px solid ${isTech ? '#FF3B4D' : isCreative ? '#FFD700' : '#FFFFFF'}`,
                    borderRadius: '0 6px 6px 0',
                    marginBottom: '1.5rem'
                  }}>
                    <div className="altitude-mono" style={{ fontSize: '0.68rem', color: '#FFD700', fontWeight: 800, marginBottom: '0.2rem' }}>
                      JURY CRITERIA
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#FFFFFF', lineHeight: 1.4, fontWeight: 500 }}>
                      {cat.criteria}
                    </div>
                  </div>
                </div>

                {/* Actions: Explore Nominees & Nominate */}
                <div style={{
                  display: 'flex',
                  gap: '0.65rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <button
                    onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                    className="altitude-btn altitude-btn-outline"
                    style={{ flex: 1, fontSize: '0.75rem', padding: '0.6rem 0.8rem', justifyContent: 'center' }}
                  >
                    <span>EXPLORE NOMINEES</span>
                  </button>

                  <button
                    onClick={() => onNominateCategory && onNominateCategory(cat.name)}
                    className="altitude-btn altitude-btn-primary"
                    style={{ fontSize: '0.75rem', padding: '0.6rem 1rem', justifyContent: 'center' }}
                  >
                    <span>NOMINATE</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
