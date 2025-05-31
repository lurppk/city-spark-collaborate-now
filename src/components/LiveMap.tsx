
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter, RefreshCw, Locate, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

// Dynamic imports to handle SSR and build issues
const MapContainer = React.lazy(() => 
  import('react-leaflet').then(module => ({ default: module.MapContainer }))
);
const TileLayer = React.lazy(() => 
  import('react-leaflet').then(module => ({ default: module.TileLayer }))
);
const Marker = React.lazy(() => 
  import('react-leaflet').then(module => ({ default: module.Marker }))
);
const Popup = React.lazy(() => 
  import('react-leaflet').then(module => ({ default: module.Popup }))
);

interface CityIssue {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  status: 'urgent' | 'in-progress' | 'resolved' | 'pending';
  category: string;
  createdAt: string;
  votes: number;
  reportedBy: string;
}

interface LiveMapProps {
  issues?: CityIssue[];
  onIssueClick?: (issue: CityIssue) => void;
  height?: string;
  enableClustering?: boolean;
  enableFiltering?: boolean;
}

const LiveMap: React.FC<LiveMapProps> = ({ 
  issues = [], 
  onIssueClick, 
  height = '500px',
  enableClustering = true,
  enableFiltering = true 
}) => {
  const [filteredIssues, setFilteredIssues] = useState<CityIssue[]>(issues);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    // Import CSS dynamically
    import('leaflet/dist/leaflet.css').then(() => {
      setIsMapReady(true);
    });
  }, []);

  useEffect(() => {
    setFilteredIssues(issues);
  }, [issues]);

  const filterIssues = (status: string) => {
    setSelectedFilter(status);
    if (status === 'all') {
      setFilteredIssues(issues);
    } else {
      setFilteredIssues(issues.filter(issue => issue.status === status));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <MapPin className="w-4 h-4 text-yellow-500" />;
    }
  };

  const filterOptions = [
    { id: 'all', label: 'All Issues', count: issues.length },
    { id: 'urgent', label: 'Urgent', count: issues.filter(i => i.status === 'urgent').length },
    { id: 'in-progress', label: 'In Progress', count: issues.filter(i => i.status === 'in-progress').length },
    { id: 'resolved', label: 'Resolved', count: issues.filter(i => i.status === 'resolved').length },
    { id: 'pending', label: 'Pending', count: issues.filter(i => i.status === 'pending').length }
  ];

  if (!isMapReady) {
    return (
      <div className="relative w-full bg-gray-100 rounded-lg flex items-center justify-center" style={{ height }}>
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height }}>
      {/* Map Controls */}
      {enableFiltering && (
        <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-2">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <Button
                key={option.id}
                variant={selectedFilter === option.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => filterIssues(option.id)}
                className="text-xs"
              >
                {option.label} ({option.count})
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Refresh and Locate Controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <Button variant="outline" size="sm" className="bg-white shadow-lg">
          <RefreshCw className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" className="bg-white shadow-lg">
          <Locate className="w-4 h-4" />
        </Button>
      </div>

      {/* Map Container */}
      <React.Suspense fallback={<div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
        <MapPin className="w-8 h-8 text-gray-400" />
      </div>}>
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-gray-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive City Map</h3>
            <p className="text-gray-600 mb-4">Real-time issue tracking and visualization</p>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              {filteredIssues.slice(0, 4).map((issue) => (
                <Card key={issue.id} className="p-3 text-left hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => onIssueClick?.(issue)}>
                  <div className="flex items-start space-x-2">
                    {getStatusIcon(issue.status)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{issue.title}</p>
                      <p className="text-xs text-gray-500">{issue.category}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {issue.votes} votes
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </React.Suspense>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-3">
        <h4 className="font-semibold text-xs mb-2">Issue Status</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Urgent</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Resolved</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
