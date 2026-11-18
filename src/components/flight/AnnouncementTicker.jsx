import React from 'react';

export default function AnnouncementTicker() {
  return (
    <div className="flight-ticker-bar" aria-label="Flight announcement ticker">
      <div className="flight-ticker-inner">
        {[1, 2, 3].map((idx) => (
          <div key={idx} className="flight-ticker-item">
            <span className="flight-status-dot" />
            <span style={{ fontWeight: 800 }}>OOU FUTURETECH AIRLINES — FLIGHT FT2027 NOW ACCEPTING PASSENGERS</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span>DEPARTURE DATE: TO BE ANNOUNCED</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ color: 'var(--color-airline-red)', fontWeight: 800 }}>THEME: AFRICA'S NEXT EXPORT: TALENT</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span>GATE FT2027</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ fontWeight: 700 }}>STATUS: BOARDING OPEN</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ color: '#FFD700', fontWeight: 800 }}>🏆 THE ALTITUDE AWARDS 2027: NOMINATIONS NOW OPEN</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
