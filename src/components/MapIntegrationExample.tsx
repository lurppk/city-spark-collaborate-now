
import React, { useState, useEffect } from 'react';
import LiveMap from './LiveMap';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Example of how to integrate with Firebase Firestore for real-time updates
const MapIntegrationExample = () => {
  const [issues, setIssues] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Example: Connect to Firebase Firestore for real-time updates
    // Replace this with your actual backend connection
    
    // Mock real-time connection
    const mockConnection = () => {
      setIsConnected(true);
      
      // Simulate real-time updates every 10 seconds
      const interval = setInterval(() => {
        console.log('Checking for new issues from backend...');
        // This is where you'd use Firebase onSnapshot or WebSocket listeners
        
        /*
        Example Firebase Firestore integration:
        
        import { collection, onSnapshot } from 'firebase/firestore';
        import { db } from './firebase-config';
        
        const unsubscribe = onSnapshot(
          collection(db, 'city-issues'),
          (snapshot) => {
            const updatedIssues = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setIssues(updatedIssues);
            console.log('Real-time update received:', updatedIssues.length, 'issues');
          },
          (error) => {
            console.error('Error listening to real-time updates:', error);
            setIsConnected(false);
          }
        );
        
        return () => unsubscribe();
        */
      }, 10000);
      
      return () => clearInterval(interval);
    };

    const cleanup = mockConnection();
    return cleanup;
  }, []);

  const handleIssueClick = (issue: any) => {
    console.log('Issue selected:', issue);
    // Handle issue click - could open modal, navigate to detail page, etc.
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Live City Map Integration</h3>
        <p className="text-gray-600 text-sm mb-4">
          This example shows how to integrate the LiveMap component with real-time data sources.
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center space-x-2 ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-sm">
              {isConnected ? 'Connected to live backend' : 'Disconnected from backend'}
            </span>
          </div>
          
          <Button 
            size="sm" 
            onClick={() => window.location.reload()}
          >
            Refresh Connection
          </Button>
        </div>

        <div className="bg-gray-100 p-3 rounded text-sm">
          <p className="font-medium mb-2">To connect to your backend:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Replace mock data with your API endpoints</li>
            <li>Use Firebase onSnapshot for real-time Firestore updates</li>
            <li>Implement WebSocket connections for custom backends</li>
            <li>Add error handling and retry logic</li>
            <li>Include loading states and offline indicators</li>
          </ul>
        </div>
      </Card>

      <LiveMap
        issues={issues}
        onIssueClick={handleIssueClick}
        height="500px"
        enableClustering={true}
        enableFiltering={true}
      />
      
      <Card className="p-4 bg-blue-50">
        <h4 className="font-semibold text-blue-800 mb-2">Backend Integration Code Examples:</h4>
        <div className="space-y-3 text-sm">
          <div>
            <h5 className="font-medium">Firebase Firestore:</h5>
            <code className="block bg-white p-2 rounded text-xs overflow-x-auto">
              {`
import { collection, onSnapshot } from 'firebase/firestore';

const unsubscribe = onSnapshot(
  collection(db, 'city-issues'),
  (snapshot) => {
    const issues = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setIssues(issues);
  }
);
              `.trim()}
            </code>
          </div>
          
          <div>
            <h5 className="font-medium">WebSocket Connection:</h5>
            <code className="block bg-white p-2 rounded text-xs overflow-x-auto">
              {`
const ws = new WebSocket('wss://your-api.com/issues');
ws.onmessage = (event) => {
  const newIssue = JSON.parse(event.data);
  setIssues(prev => [...prev, newIssue]);
};
              `.trim()}
            </code>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MapIntegrationExample;
