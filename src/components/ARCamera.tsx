
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, X, Target, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

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
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [detectedIssue, setDetectedIssue] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);

  useEffect(() => {
    initializeCamera();
    getCurrentLocation();
    
    // Mock AI detection simulation
    const detectionInterval = setInterval(() => {
      mockIssueDetection();
    }, 2000);

    return () => {
      stopCamera();
      clearInterval(detectionInterval);
    };
  }, []);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera access is required for AR features. Please enable camera permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
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
        },
        (error) => {
          console.error('Location access denied:', error);
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
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (ctx) {
      // Draw the video frame
      ctx.drawImage(video, 0, 0);
      
      // Add AR overlay elements
      drawAROverlay(ctx, canvas.width, canvas.height);
      
      // Convert to base64
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      
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
    ctx.lineWidth = 2;
    const centerX = width / 2;
    const centerY = height / 2;
    const size = 50;
    
    // Crosshair
    ctx.beginPath();
    ctx.moveTo(centerX - size, centerY);
    ctx.lineTo(centerX + size, centerY);
    ctx.moveTo(centerX, centerY - size);
    ctx.lineTo(centerX, centerY + size);
    ctx.stroke();
    
    // Corner brackets
    const bracketSize = 20;
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
      ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
      ctx.fillRect(centerX - 100, centerY + size + 20, 200, 40);
      
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        `${detectedIssue.replace('_', ' ').toUpperCase()} (${Math.round(confidence * 100)}%)`,
        centerX,
        centerY + size + 40
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

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* AR Camera View */}
      <div className="flex-1 relative overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />
        
        {/* AR Overlay */}
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
        </div>
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
            disabled={!isStreaming}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
          >
            <Camera className="w-5 h-5 mr-2" />
            Capture Issue
          </Button>
          
          <div className="w-20 text-center">
            <div className="text-white text-xs">
              {detectedIssue ? 'AI Detected' : 'Scanning...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARCamera;
