
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, X, Target, MapPin, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

interface ARCameraProps {
  onCapture: (data: {
    image: string;
    location: { lat: number; lng: number } | null;
    category: string;
    confidence?: number;
  }) => void;
  onClose: () => void;
  selectedCategory: string;
}

const ARCamera: React.FC<ARCameraProps> = ({ onCapture, onClose, selectedCategory }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [detectedIssue, setDetectedIssue] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);

  useEffect(() => {
    initializeCamera();
    getCurrentLocation();
    
    // Mock AI detection simulation
    const detectionInterval = setInterval(() => {
      if (isStreaming) {
        mockIssueDetection();
      }
    }, 3000);

    return () => {
      stopCamera();
      clearInterval(detectionInterval);
    };
  }, [isStreaming]);

  const initializeCamera = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by this browser.');
      }

      console.log('Requesting camera access...');
      
      const constraints = {
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      console.log('Camera access granted:', stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded');
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => {
                console.log('Video playing successfully');
                setIsStreaming(true);
                setIsLoading(false);
              })
              .catch((playError) => {
                console.error('Error playing video:', playError);
                setError('Failed to start camera preview');
                setIsLoading(false);
              });
          }
        };

        videoRef.current.onerror = (videoError) => {
          console.error('Video error:', videoError);
          setError('Camera stream error');
          setIsLoading(false);
        };
      }
    } catch (error: any) {
      console.error('Camera initialization error:', error);
      let errorMessage = 'Camera access denied. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please allow camera permissions and try again.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera found on this device.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'Camera not supported by this browser.';
      } else {
        errorMessage += error.message || 'Unknown camera error.';
      }
      
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => {
        console.log('Stopping camera track:', track);
        track.stop();
      });
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          console.log('Location obtained:', position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Location access denied:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    }
  };

  // Mock AI detection - replace with actual TensorFlow.js implementation
  const mockIssueDetection = () => {
    const issues = ['pothole', 'broken_streetlight', 'graffiti', 'trash', 'damaged_sign'];
    const randomIssue = issues[Math.floor(Math.random() * issues.length)];
    const randomConfidence = Math.random() * 0.4 + 0.6; // 60-100% confidence
    
    setDetectedIssue(randomIssue);
    setConfidence(randomConfidence);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) {
      console.error('Cannot capture: video not ready');
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size to match video
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    console.log('Capturing photo with dimensions:', canvas.width, canvas.height);

    if (ctx) {
      // Draw the video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Add AR overlay elements
      drawAROverlay(ctx, canvas.width, canvas.height);
      
      // Convert to base64
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      
      console.log('Photo captured successfully');
      
      onCapture({
        image: imageData,
        location,
        category: detectedIssue || selectedCategory,
        confidence: Math.round(confidence * 100)
      });
    }
  };

  const drawAROverlay = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw targeting reticle
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 3;
    const centerX = width / 2;
    const centerY = height / 2;
    const size = Math.min(width, height) * 0.1; // Responsive size
    
    // Crosshair
    ctx.beginPath();
    ctx.moveTo(centerX - size, centerY);
    ctx.lineTo(centerX + size, centerY);
    ctx.moveTo(centerX, centerY - size);
    ctx.lineTo(centerX, centerY + size);
    ctx.stroke();
    
    // Corner brackets
    const bracketSize = size * 0.4;
    ctx.beginPath();
    // Top-left
    ctx.moveTo(centerX - size, centerY - size + bracketSize);
    ctx.lineTo(centerX - size, centerY - size);
    ctx.lineTo(centerX - size + bracketSize, centerY - size);
    // Top-right
    ctx.moveTo(centerX + size - bracketSize, centerY - size);
    ctx.lineTo(centerX + size, centerY - size);
    ctx.lineTo(centerX + size, centerY - size + bracketSize);
    // Bottom-left
    ctx.moveTo(centerX - size, centerY + size - bracketSize);
    ctx.lineTo(centerX - size, centerY + size);
    ctx.lineTo(centerX - size + bracketSize, centerY + size);
    // Bottom-right
    ctx.moveTo(centerX + size - bracketSize, centerY + size);
    ctx.lineTo(centerX + size, centerY + size);
    ctx.lineTo(centerX + size, centerY + size - bracketSize);
    ctx.stroke();

    // Detection label if available
    if (detectedIssue && confidence > 0.7) {
      const labelWidth = Math.min(width * 0.6, 300);
      const labelHeight = 50;
      const labelX = centerX - labelWidth / 2;
      const labelY = centerY + size + 30;
      
      ctx.fillStyle = 'rgba(0, 255, 0, 0.9)';
      ctx.fillRect(labelX, labelY, labelWidth, labelHeight);
      
      ctx.fillStyle = 'white';
      ctx.font = `${Math.min(width / 80, 16)}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText(
        `${detectedIssue.replace('_', ' ').toUpperCase()} (${Math.round(confidence * 100)}%)`,
        centerX,
        labelY + labelHeight / 2 + 5
      );
    }
  };

  const getIssueIcon = (issue: string) => {
    switch (issue) {
      case 'pothole':
      case 'broken_streetlight':
        return <AlertTriangle className="w-4 h-4" />;
      case 'graffiti':
      case 'damaged_sign':
        return <Target className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <Card className="max-w-md mx-4 p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Camera Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <Button onClick={initializeCamera} className="w-full">
              <Camera className="w-4 h-4 mr-2" />
              Retry Camera
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            <p>Tips:</p>
            <ul className="list-disc list-inside text-left">
              <li>Allow camera permissions</li>
              <li>Use HTTPS (required for camera)</li>
              <li>Check if camera is being used by another app</li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* AR Camera View */}
      <div className="flex-1 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
            <Card className="p-6 text-center bg-black/80 text-white border-gray-600">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p className="text-sm">Initializing camera...</p>
              <p className="text-xs text-gray-400 mt-2">Please allow camera access</p>
            </Card>
          </div>
        )}
        
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
          autoPlay
          style={{
            transform: 'scaleX(-1)', // Mirror video for better UX
          }}
        />
        
        {/* AR Overlay */}
        {isStreaming && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Targeting UI */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Target className="w-16 h-16 text-green-400 animate-pulse" />
              </div>
            </div>
            
            {/* Detection Results */}
            {detectedIssue && confidence > 0.7 && (
              <div className="absolute top-20 left-4 right-4">
                <Card className="bg-green-500/90 text-white p-3">
                  <div className="flex items-center space-x-2">
                    {getIssueIcon(detectedIssue)}
                    <span className="font-semibold">
                      {detectedIssue.replace('_', ' ').toUpperCase()}
                    </span>
                    <Badge className="bg-white text-green-500 ml-auto">
                      {Math.round(confidence * 100)}% confident
                    </Badge>
                  </div>
                </Card>
              </div>
            )}
            
            {/* Location Info */}
            {location && (
              <div className="absolute top-4 left-4">
                <Card className="bg-black/70 text-white p-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{location.lat.toFixed(6)}, {location.lng.toFixed(6)}</span>
                  </div>
                </Card>
              </div>
            )}
            
            {/* Instructions */}
            <div className="absolute bottom-20 left-4 right-4">
              <Card className="bg-black/70 text-white p-3">
                <p className="text-sm text-center">
                  Point camera at the issue and tap capture when ready
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
      
      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Controls */}
      <div className="bg-black/90 p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-white border-white hover:bg-white/20"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          
          <Button
            onClick={capturePhoto}
            disabled={!isStreaming || isLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 disabled:opacity-50"
          >
            <Camera className="w-5 h-5 mr-2" />
            {isLoading ? 'Loading...' : 'Capture Issue'}
          </Button>
          
          <div className="w-20 text-center">
            <div className="text-white text-xs">
              {detectedIssue ? 'AI Detected' : isStreaming ? 'Scanning...' : 'Loading...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARCamera;
