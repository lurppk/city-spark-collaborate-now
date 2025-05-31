
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter, RefreshCw, Locate, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = new Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

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

// Component to handle map centering on user location
const LocationControl: React.FC<{ onLocationFound: (lat: number, lng: number) => void }> = ({ onLocationFound }) => {
  const map = useMap();

  const centerOnUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 15);
          onLocationFound(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback to a default city center (e.g., New York)
          map.setView([40.7589, -73.9851], 12);
        }
      );
    }
  };

  useEffect(() => {
    centerOnUser();
  }, []);

  return null;
};

const LiveMap: React.FC<LiveMapProps> = ({ 
  issues = [], 
  onIssueClick, 
  height = '500px',
  enableClustering = true,
  enableFiltering = true 
}) => {
  const [filteredIssues, setFilteredIssues] = useState<CityIssue[]>(issues);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const mapRef = useRef<any>(null);

  // Mock real-time data - replace with actual WebSocket/Firebase connection
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      console.log('Checking for new issues...');
      // This is where you'd connect to your real-time backend
    }, 5000);

    return () => clearInterval(interval);
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

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'urgent': return '#ef4444';
      case 'in-progress': return '#3b82f6';
      case 'resolved': return '#10b981';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
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

  const createCustomIcon = (status: string) => {
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="${getMarkerColor(status)}"/>
          <circle cx="12.5" cy="12.5" r="6" fill="white"/>
        </svg>
      `)}`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });
  };

  const filterOptions = [
    { id: 'all', label: 'All Issues', count: issues.length },
    { id: 'urgent', label: 'Urgent', count: issues.filter(i => i.status === 'urgent').length },
    { id: 'in-progress', label: 'In Progress', count: issues.filter(i => i.status === 'in-progress').length },
    { id: 'resolved', label: 'Resolved', count: issues.filter(i => i.status === 'resolved').length },
    { id: 'pending', label: 'Pending', count: issues.filter(i => i.status === 'pending').length }
  ];

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
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (mapRef.current) {
              mapRef.current.invalidateSize();
            }
          }}
          className="bg-white shadow-lg"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (navigator.geolocation && mapRef.current) {
              navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                mapRef.current.setView([latitude, longitude], 15);
                setUserLocation([latitude, longitude]);
              });
            }
          }}
          className="bg-white shadow-lg"
        >
          <Locate className="w-4 h-4" />
        </Button>
      </div>

      {/* Map Container */}
      <MapContainer
        center={[40.7589, -73.9851]} // Default to NYC
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocationControl onLocationFound={(lat, lng) => setUserLocation([lat, lng])} />
        
        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={DefaultIcon}>
            <Popup>
              <div className="text-center">
                <p className="font-semibold">Your Location</p>
                <p className="text-sm text-gray-600">
                  {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Issue Markers */}
        {filteredIssues.map((issue) => (
          <Marker
            key={issue.id}
            position={[issue.latitude, issue.longitude]}
            icon={createCustomIcon(issue.status)}
            eventHandlers={{
              click: () => {
                if (onIssueClick) {
                  onIssueClick(issue);
                }
              }
            }}
          >
            <Popup>
              <Card className="w-64 p-0 border-0 shadow-none">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">{issue.title}</h4>
                    {getStatusIcon(issue.status)}
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3">{issue.description}</p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {issue.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {issue.votes} votes
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    <p>Reported by: {issue.reportedBy}</p>
                    <p>Date: {new Date(issue.createdAt).toLocaleDateString()}</p>
                    <p>Coords: {issue.latitude.toFixed(4)}, {issue.longitude.toFixed(4)}</p>
                  </div>
                  
                  <Button size="sm" className="w-full mt-3 text-xs">
                    View Details
                  </Button>
                </div>
              </Card>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

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
