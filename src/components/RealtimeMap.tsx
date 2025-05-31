
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter, RefreshCw, AlertTriangle, CheckCircle, Clock, Users } from 'lucide-react';

const RealtimeMap = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const issueTypes = [
    { id: 'all', label: 'All Issues', count: 42, color: 'bg-slate-100 text-slate-700' },
    { id: 'urgent', label: 'Urgent', count: 8, color: 'bg-red-100 text-red-700' },
    { id: 'in-progress', label: 'In Progress', count: 15, color: 'bg-blue-100 text-blue-700' },
    { id: 'resolved', label: 'Resolved', count: 19, color: 'bg-green-100 text-green-700' }
  ];

  const recentIssues = [
    {
      id: 1,
      title: 'Broken streetlight on Main St',
      location: 'Main St & 5th Ave',
      status: 'urgent',
      time: '2 min ago',
      votes: 12,
      type: 'Infrastructure'
    },
    {
      id: 2,
      title: 'Pothole needs repair',
      location: 'Oak Street',
      status: 'in-progress',
      time: '15 min ago',
      votes: 8,
      type: 'Roads'
    },
    {
      id: 3,
      title: 'Park cleanup completed',
      location: 'Central Park',
      status: 'resolved',
      time: '1 hour ago',
      votes: 24,
      type: 'Parks'
    },
    {
      id: 4,
      title: 'New crosswalk requested',
      location: 'School District',
      status: 'in-progress',
      time: '2 hours ago',
      votes: 31,
      type: 'Safety'
    }
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
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Live City Pulse</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Watch your city come alive with real-time updates from every neighborhood.
            See what's happening, what's being fixed, and how you can help.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area (Placeholder) */}
          <div className="lg:col-span-2">
            <Card className="p-6 h-96 bg-gradient-to-br from-blue-50 to-green-50 border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-800">Interactive City Map</h3>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" className="text-slate-600">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline" size="sm" className="text-slate-600">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
              
              {/* Map visualization placeholder */}
              <div className="flex items-center justify-center h-64 bg-white rounded-lg border-2 border-dashed border-slate-200">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">Interactive AR Map</p>
                  <p className="text-sm text-slate-400">Real-time issue visualization coming soon</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Activity Panel */}
          <div className="space-y-6">
            {/* Filter Tabs */}
            <Card className="p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Filter by Status</h4>
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

            {/* Recent Activity */}
            <Card className="p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Recent Activity</h4>
              <div className="space-y-3">
                {recentIssues.map((issue) => (
                  <div key={issue.id} className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(issue.status)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-800 truncate">{issue.title}</p>
                        <p className="text-xs text-slate-500">{issue.location}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-400">{issue.time}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">{issue.type}</Badge>
                            <div className="flex items-center text-xs text-slate-500">
                              <Users className="w-3 h-3 mr-1" />
                              {issue.votes}
                            </div>
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
    </div>
  );
};

export default RealtimeMap;
