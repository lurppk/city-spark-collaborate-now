
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, MessageSquare, Users, Zap, ArrowRight, Heart } from 'lucide-react';

const HeroSection = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Real-Time City Map',
      description: 'See what\'s happening in your neighborhood right now',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: MessageSquare,
      title: 'Report with AR',
      description: 'Point, capture, and report issues instantly with AR',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Users,
      title: 'Community Voice',
      description: 'Vote on city initiatives and make your voice heard',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      icon: Zap,
      title: 'Instant Updates',
      description: 'Get notified when your reports are addressed',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white rounded-full px-4 py-2 text-sm text-blue-600 border border-blue-200 mb-6">
            <Heart className="w-4 h-4 mr-2 text-red-500" />
            Built with love for our community
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Your City,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> Connected</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of citizens working together to make our city smarter, safer, and more beautiful. 
            Report issues, vote on initiatives, and see real change happen in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/report">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg">
                Start Making a Difference
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/map">
              <Button variant="outline" size="lg" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
                Explore City Map
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              1,247 issues resolved this month
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              98% citizen satisfaction rate
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
              24/7 community support
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-100">
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
