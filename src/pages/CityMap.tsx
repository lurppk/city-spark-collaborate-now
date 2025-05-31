
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter, RefreshCw, AlertTriangle, CheckCircle, Clock, Users, Navigation as NavigationIcon, Search, Layers } from 'lucide-react';

const CityMap = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('standard');
  
  const issueTypes = [
    { id: 'all', label: 'All Issues', count: 42, color: 'bg-slate-100 text-slate-700' },
    { id: 'urgent', label: 'Urgent', count: 8, color: 'bg-red-100 text-red-700' },
    { id: 'in-progress', label: 'In Progress', count: 15, color: 'bg-blue-100 text-blue-700' },
    { id: 'resolved', label: 'Resolved', count: 19, color: 'bg-green-100 text-green-700' }
  ];

  const mapMarkers = [
    { id: 1, lat: 40.7589, lng: -73.9851, type: 'urgent', title: 'Broken streetlight', votes: 12 },
    { id: 2, lat: 40.7614, lng: -73.9776, type: 'in-progress', title: 'Pothole repair', votes: 8 },
    { id: 3, lat: 40.7505, lng: -73.9934, type: 'resolved', title: 'Park cleanup', votes: 24 },
    { id: 4, lat: 40.7549, lng: -73.9840, type: 'in-progress', title: 'New crosswalk', votes: 31 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <MapPin className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Interactive City Map</h1>
          <p className="text-lg text-slate-600">Explore your city in real-time. See issues, track progress, and stay connected.</p>
        </div>

        {/* Map Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Button 
              variant={viewMode === 'standard' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('standard')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Standard
            </Button>
            <Button 
              variant={viewMode === 'satellite' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('satellite')}
            >
              <Layers className="w-4 h-4 mr-2" />
              Satellite
            </Button>
            <Button 
              variant={viewMode === 'ar' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('ar')}
            >
              <NavigationIcon className="w-4 h-4 mr-2" />
              AR View
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search Location
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="p-6 h-96 bg-gradient-to-br from-blue-50 to-green-50 border-slate-200">
              <div className="flex items-center justify-center h-full bg-white rounded-lg border-2 border-dashed border-slate-200 relative">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">Interactive City Map</p>
                  <p className="text-sm text-slate-400">Real-time issue visualization</p>
                </div>
                
                {/* Simulated map markers */}
                <div className="absolute top-4 left-4 bg-red-500 w-3 h-3 rounded-full animate-pulse"></div>
                <div className="absolute top-16 right-8 bg-blue-500 w-3 h-3 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-12 bg-green-500 w-3 h-3 rounded-full"></div>
                <div className="absolute bottom-16 right-4 bg-orange-500 w-3 h-3 rounded-full animate-pulse"></div>
              </div>
            </Card>

            {/* Map Legend */}
            <Card className="p-4 mt-4">
              <h4 className="font-semibold text-slate-800 mb-3">Map Legend</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {issueTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${type.id === 'urgent' ? 'bg-red-500' : type.id === 'in-progress' ? 'bg-blue-500' : type.id === 'resolved' ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                    <span className="text-sm text-slate-600">{type.label}</span>
                    <Badge className={type.color}>{type.count}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Filter Panel */}
            <Card className="p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Filter Issues</h4>
              <div className="space-y-2">
                {issueTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedFilter(type.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                      selectedFilter === type.id 
                        ? 'border-blue-200 bg-blue-50' 
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-medium text-slate-700">{type.label}</span>
                    <Badge className={type.color}>{type.count}</Badge>
                  </button>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white">
                  <MapPin className="w-4 h-4 mr-2" />
                  Report New Issue
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community Discussion
                </Button>
              </div>
            </Card>

            {/* Nearby Issues */}
            <Card className="p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Nearby Issues</h4>
              <div className="space-y-3">
                {mapMarkers.slice(0, 3).map((marker) => (
                  <div key={marker.id} className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(marker.type)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-800 truncate">{marker.title}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-400">0.2 miles away</span>
                          <div className="flex items-center text-xs text-slate-500">
                            <Users className="w-3 h-3 mr-1" />
                            {marker.votes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CityMap;
