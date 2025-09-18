import React from 'react';
import RailRow from '@/components/media/RailRow';
import SponsoredTile from '@/components/media/SponsoredTile';
import { mockBooks, mockPodcasts, mockEducationalContent } from '@/data/mockData';

const Home: React.FC = () => {
  return (
    <main className="pb-24 min-h-screen">
      {/* Hero/Sponsored section */}
      <section className="px-6 py-8">
        <SponsoredTile
          title="Start With Ruskin Bond"
          description="Discover timeless stories from India's beloved author. Start your literary journey today with his most popular works."
          backgroundImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
          backgroundColor="#FCD34D"
          ctaText="Explore Collection"
          ctaUrl="#"
        />
      </section>

      {/* Content rails */}
      <div className="space-y-8">
        <RailRow 
          title="Start off your day" 
          items={mockBooks.slice(0, 6)}
          showProgress={true}
        />
        
        <RailRow 
          title="Popular reading lists" 
          items={[...mockBooks.slice(2, 5), ...mockPodcasts.slice(0, 3)]}
        />
        
        <RailRow 
          title="Trending Educational" 
          items={mockEducationalContent}
        />
        
        <RailRow 
          title="Recently accessed" 
          items={[...mockPodcasts, ...mockBooks.slice(1, 3)]}
          showProgress={true}
        />
        
        <RailRow 
          title="Made for you" 
          items={[...mockBooks.slice(0, 2), ...mockPodcasts.slice(1, 4), ...mockEducationalContent.slice(0, 2)]}
        />
      </div>
    </main>
  );
};

export default Home;