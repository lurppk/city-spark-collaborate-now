
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import RealtimeMap from '@/components/RealtimeMap';
import CommunityEngagement from '@/components/CommunityEngagement';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <RealtimeMap />
      <CommunityEngagement />
      <Footer />
    </div>
  );
};

export default Index;
