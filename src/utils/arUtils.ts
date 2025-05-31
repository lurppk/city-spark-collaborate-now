
export interface ARCapabilities {
  hasCamera: boolean;
  hasGeolocation: boolean;
  isHTTPS: boolean;
  isMobile: boolean;
  supportsWebRTC: boolean;
}

export const checkARCapabilities = async (): Promise<ARCapabilities> => {
  const capabilities: ARCapabilities = {
    hasCamera: false,
    hasGeolocation: false,
    isHTTPS: location.protocol === 'https:' || location.hostname === 'localhost',
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    supportsWebRTC: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
  };

  // Check camera access
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    capabilities.hasCamera = true;
    stream.getTracks().forEach(track => track.stop()); // Clean up
  } catch (error) {
    console.warn('Camera access not available:', error);
  }

  // Check geolocation
  capabilities.hasGeolocation = 'geolocation' in navigator;

  return capabilities;
};

export const requestPermissions = async (): Promise<{
  camera: PermissionState | 'granted';
  geolocation: PermissionState | 'granted';
}> => {
  const permissions = {
    camera: 'denied' as PermissionState | 'granted',
    geolocation: 'denied' as PermissionState | 'granted'
  };

  // Request camera permission
  try {
    if (navigator.permissions) {
      const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
      permissions.camera = cameraPermission.state;
    } else {
      // Fallback: try to access camera directly
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      permissions.camera = 'granted';
      stream.getTracks().forEach(track => track.stop());
    }
  } catch (error) {
    console.warn('Camera permission denied:', error);
  }

  // Request geolocation permission
  try {
    if (navigator.permissions) {
      const geoPermission = await navigator.permissions.query({ name: 'geolocation' });
      permissions.geolocation = geoPermission.state;
    } else {
      // Fallback: try to get position
      navigator.geolocation.getCurrentPosition(
        () => { permissions.geolocation = 'granted'; },
        () => { permissions.geolocation = 'denied'; }
      );
    }
  } catch (error) {
    console.warn('Geolocation permission denied:', error);
  }

  return permissions;
};

export const formatGPSCoordinates = (lat: number, lng: number): string => {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';
  
  return `${Math.abs(lat).toFixed(6)}°${latDir}, ${Math.abs(lng).toFixed(6)}°${lngDir}`;
};

export const calculateDistance = (
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
};

// Mock AI detection function - replace with actual TensorFlow.js implementation
export const mockAIDetection = (imageData: string): Promise<{
  category: string;
  confidence: number;
  boundingBox?: { x: number; y: number; width: number; height: number };
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categories = [
        { name: 'pothole', confidence: 0.85 },
        { name: 'broken_streetlight', confidence: 0.78 },
        { name: 'graffiti', confidence: 0.72 },
        { name: 'trash', confidence: 0.81 },
        { name: 'damaged_sign', confidence: 0.69 }
      ];
      
      const detected = categories[Math.floor(Math.random() * categories.length)];
      
      resolve({
        category: detected.name,
        confidence: detected.confidence,
        boundingBox: {
          x: Math.random() * 200 + 100,
          y: Math.random() * 200 + 100,
          width: Math.random() * 100 + 50,
          height: Math.random() * 100 + 50
        }
      });
    }, 1000);
  });
};
