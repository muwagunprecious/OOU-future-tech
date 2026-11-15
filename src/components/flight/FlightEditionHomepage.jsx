import React from 'react';
import AnnouncementTicker from './AnnouncementTicker';
import FlightNavbar from './FlightNavbar';
import FlightHero from './FlightHero';
import AboutFlight from './AboutFlight';
import TheDestination from './TheDestination';
import DepartureBoard from './DepartureBoard';
import BoardingPassSection from './BoardingPassSection';
import FlightCrew from './FlightCrew';
import FlightItinerary from './FlightItinerary';
import FlightTeam from './FlightTeam';
import TravelPartners from './TravelPartners';
import FlightArchives2026 from './FlightArchives2026';
import FlightExperienceFAQ from './FlightExperienceFAQ';
import FinalCTA from './FinalCTA';
import FlightFooter from './FlightFooter';

export default function FlightEditionHomepage({
  onRegister,
  onViewChange,
  currentView,
  dynamicSpeakers,
  dynamicPartners,
  dynamicTeam,
  speakersMode,
  comingSoonText,
  onAdmin
}) {
  return (
    <div className="flight-edition">
      {/* 1. Top Announcement Ticker */}
      <AnnouncementTicker />

      {/* 2. Flight Navigation */}
      <FlightNavbar
        onRegister={onRegister}
        onViewChange={onViewChange}
        currentView={currentView}
      />

      {/* 3. Hero: The Flight is Boarding */}
      <FlightHero onRegister={onRegister} />

      {/* 4. About the Flight: Conference Story */}
      <AboutFlight />

      {/* 5. The Destination: Africa's Next Export: Talent */}
      <TheDestination />

      {/* 6. Airport Departure Board: Flight Information Tracks */}
      <DepartureBoard />

      {/* 7. Boarding Pass Registration Section */}
      <BoardingPassSection onRegister={onRegister} />

      {/* 8. Flight Crew: Speakers Section */}
      <FlightCrew
        dynamicSpeakers={dynamicSpeakers}
        speakersMode={speakersMode}
        comingSoonText={comingSoonText}
      />

      {/* 9. Flight Itinerary: Event Schedule */}
      <FlightItinerary />

      {/* 10. Ground Crew: Organizing Team Section */}
      <FlightTeam dynamicTeam={dynamicTeam} />

      {/* 11. Travel Partners & Sponsors */}
      <TravelPartners dynamicPartners={dynamicPartners} />

      {/* 12. Proof of Ascent: 2026 Event Archives */}
      <FlightArchives2026 />

      {/* 13. In-Flight Protocols & FAQs */}
      <FlightExperienceFAQ />

      {/* 14. Final Call to Action */}
      <FinalCTA onRegister={onRegister} />

      {/* 15. Airline Panel Footer */}
      <FlightFooter
        onViewChange={onViewChange}
        onAdmin={onAdmin}
      />
    </div>
  );
}
