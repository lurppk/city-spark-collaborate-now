
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LiveMap from '@/components/LiveMap';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Navigation as NavigationIcon, Search, Layers, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for demonstration - replace with real data from your backend
const mockIssues = [
  {
    id: '1',
    title: 'Broken streetlight on Main St',
    description: 'Streetlight has been out for 3 days, creating safety concerns for pedestrians.',
    latitude: 40.7589,
    longitude: -73.9851,
    status: 'urgent' as const,
    category: 'Infrastructure',
    createdAt: '2024-01-15T08:30:00Z',
    votes: 12,
    reportedBy: 'John D.'
  },
  {
    id: '2',
    title: 'Pothole on Oak Street',
    description: 'Large pothole causing damage to vehicles and creating hazard.',
    latitude: 40.7614,
    longitude: -73.9776,
    status: 'in-progress' as const,
    category: 'Roads',
    createdAt: '2024-01-14T14:20:00Z',
    votes: 8,
    reportedBy: 'Sarah M.'
  },
  {
    id: '3',
    title: 'Park cleanup completed',
    description: 'Community cleanup event successfully completed in Central Park area.',
    latitude: 40.7505,
    longitude: -73.9934,
    status: 'resolved' as const,
    category: 'Parks',
    createdAt: '2024-01-13T10:15:00Z',
    votes: 24,
    reportedBy: 'Parks Dept.'
  },
  {
    id: '4',
    title: 'New crosswalk requested',
    description: 'Parents requesting safer crosswalk near elementary school.',
    latitude: 40.7549,
    longitude: -73.9840,
    status: 'pending' as const,
    category: 'Safety',
    createdAt: '2024-01-12T16:45:00Z',
    votes: 31,
    reportedBy: 'Parent Committee'
  },
  {
    id: '5',
    title: 'Graffiti removal needed',
    description: 'Vandalism on community center wall needs attention.',
    latitude: 40.7580,
    longitude: -73.9855,
    status: 'pending' as const,
    category: 'Maintenance',
    createdAt: '2024-01-11T09:30:00Z',
    votes: 7,
    reportedBy: 'Community Center'
  }
];

const CityMap = () => {
  const [viewMode, setViewMode] = useState('standard');
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const navigate = useNavigate();

  const handleIssueClick = (issue: any) => {
    setSelectedIssue(issue);
    console.log('Issue clicked:', issue);
  };

  const issueStats = {
    total: mockIssues.length,
    urgent: mockIssues.filter(i => i.status === 'urgent').length,
    inProgress: mockIssues.filter(i => i.status === 'in-progress').length,
    resolved: mockIssues.filter(i => i.status === 'resolved').length,
    pending: mockIssues.filter(i => i.status === 'pending').length
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Interactive City Map</h1>
          <p className="text-lg text-slate-600">
            Explore your city in real-time. See issues, track progress, and stay connected.
          </p>
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
              Map View
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
              onClick={() => navigate('/report')}
            >
              <NavigationIcon className="w-4 h-4 mr-2" />
              AR Report
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => navigate('/report')}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-slate-800">{issueStats.total}</div>
            <div className="text-sm text-slate-600">Total Issues</div>
          </Card>
          <Card className="p-4 text-center border-red-200 bg-red-50">
            <div className="text-2xl font-bold text-red-600">{issueStats.urgent}</div>
            <div className="text-sm text-red-600">Urgent</div>
          </Card>
          <Card className="p-4 text-center border-blue-200 bg-blue-50">
            <div className="text-2xl font-bold text-blue-600">{issueStats.inProgress}</div>
            <div className="text-sm text-blue-600">In Progress</div>
          </Card>
          <Card className="p-4 text-center border-green-200 bg-green-50">
            <div className="text-2xl font-bold text-green-600">{issueStats.resolved}</div>
            <div className="text-sm text-green-600">Resolved</div>
          </Card>
          <Card className="p-4 text-center border-yellow-200 bg-yellow-50">
            <div className="text-2xl font-bold text-yellow-600">{issueStats.pending}</div>
            <div className="text-sm text-yellow-600">Pending</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Live Map */}
          <div className="lg:col-span-3">
            <Card className="p-0 overflow-hidden">
              <LiveMap
                issues={mockIssues}
                onIssueClick={handleIssueClick}
                height="600px"
                enableClustering={true}
                enableFiltering={true}
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Issue Details */}
            {selectedIssue && (
              <Card className="p-4">
                <h4 className="font-semibold text-slate-800 mb-3">Issue Details</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm">{selectedIssue.title}</h5>
                    <p className="text-xs text-gray-600 mt-1">{selectedIssue.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge 
                      className={
                        selectedIssue.status === 'urgent' ? 'bg-red-100 text-red-700' :
                        selectedIssue.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        selectedIssue.status === 'resolved' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }
                    >
                      {selectedIssue.status.replace('-', ' ')}
                    </Badge>
                    <div className="flex items-center text-xs text-slate-500">
                      <Users className="w-3 h-3 mr-1" />
                      {selectedIssue.votes} votes
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <p>Category: {selectedIssue.category}</p>
                    <p>Reported by: {selectedIssue.reportedBy}</p>
                    <p>Date: {new Date(selectedIssue.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Button size="sm" className="w-full">
                    View Full Details
                  </Button>
                </div>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button 
                  onClick={() => navigate('/report')}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Report New Issue
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/community')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Discussion
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Recent Activity</h4>
              <div className="space-y-3">
                {mockIssues.slice(0, 3).map((issue) => (
                  <div 
                    key={issue.id} 
                    className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <p className="font-medium text-sm text-slate-800 truncate">{issue.title}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                      >
                        {issue.category}
                      </Badge>
                      <div className="flex items-center text-xs text-slate-500">
                        <Users className="w-3 h-3 mr-1" />
                        {issue.votes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Real-time Connection Status */}
        <div className="fixed bottom-4 right-4 z-10">
          <Card className="p-2 bg-green-500 text-white">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Live Updates Active</span>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CityMap;
