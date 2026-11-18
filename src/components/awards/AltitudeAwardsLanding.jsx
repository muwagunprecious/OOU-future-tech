import React, { useState, useEffect } from 'react';
import AltitudeNavbar from './AltitudeNavbar';
import AltitudeHero from './AltitudeHero';
import AltitudeAbout from './AltitudeAbout';
import AltitudeWall from './AltitudeWall';
import AltitudeCategories from './AltitudeCategories';
import AltitudeNominationForm from './AltitudeNominationForm';
import AltitudeNominees from './AltitudeNominees';
import AltitudeFinalCTA from './AltitudeFinalCTA';
import AltitudeFooter from './AltitudeFooter';
import { fetchPublishedNominees, fetchFeaturedNominees } from '../../lib/altitudeService';
import '../../styles/altitude.css';

export default function AltitudeAwardsLanding({ onBackToConference }) {
  const [nominees, setNominees] = useState([]);
  const [featuredNominees, setFeaturedNominees] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(null);
  const [nominateCategory, setNominateCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load published and featured nominees on mount
  const loadNominees = async () => {
    setLoading(true);
    try {
      const [pub, feat] = await Promise.all([
        fetchPublishedNominees(),
        fetchFeaturedNominees()
      ]);
      setNominees(pub);
      setFeaturedNominees(feat);
    } catch (err) {
      console.warn('Error loading published Altitude nominees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNominees();
  }, []);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategoryFilter(categoryName);
    scrollToSection('nominees');
  };

  const handleCategoryNominate = (categoryName) => {
    setNominateCategory(categoryName);
    scrollToSection('nominate');
  };

  return (
    <div className="altitude-root">
      {/* Top Navigation */}
      <AltitudeNavbar 
        onNominateClick={() => scrollToSection('nominate')}
        onBackToConference={onBackToConference}
      />

      {/* Hero Section */}
      <AltitudeHero 
        onNominateClick={() => scrollToSection('nominate')}
        onExploreNomineesClick={() => scrollToSection('nominees')}
      />

      {/* About Section */}
      <AltitudeAbout 
        onNominateClick={() => scrollToSection('nominate')}
      />

      {/* The Altitude Wall */}
      <AltitudeWall 
        featuredNominees={featuredNominees}
        onExploreAll={() => scrollToSection('nominees')}
      />

      {/* Categories Section */}
      <AltitudeCategories 
        onSelectCategory={handleCategorySelect}
        onNominateCategory={handleCategoryNominate}
        approvedNominees={nominees}
      />

      {/* Nomination Form */}
      <AltitudeNominationForm 
        preselectedCategory={nominateCategory}
        onNominationSuccess={loadNominees}
        onExploreClick={() => scrollToSection('nominees')}
      />

      {/* Explore Nominees Section */}
      <AltitudeNominees 
        nominees={nominees}
        selectedCategoryFilter={selectedCategoryFilter}
        onSelectCategoryFilter={setSelectedCategoryFilter}
        onNominateClick={() => scrollToSection('nominate')}
      />

      {/* Final Call to Action */}
      <AltitudeFinalCTA 
        onNominateClick={() => scrollToSection('nominate')}
        onExploreCategoriesClick={() => scrollToSection('categories')}
      />

      {/* Institutional Footer */}
      <AltitudeFooter 
        onBackToConference={onBackToConference}
      />
    </div>
  );
}
