
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Download } from 'lucide-react';

interface AFrameARProps {
  onClose: () => void;
  category: string;
}

const AFrameAR: React.FC<AFrameARProps> = ({ onClose, category }) => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically load A-Frame and AR.js scripts
    const loadAFrameScripts = async () => {
      // A-Frame
      if (!document.querySelector('script[src*="aframe"]')) {
        const aframeScript = document.createElement('script');
        aframeScript.src = 'https://cdn.jsdelivr.net/npm/aframe@1.4.0/dist/aframe-master.min.js';
        document.head.appendChild(aframeScript);
        
        await new Promise(resolve => {
          aframeScript.onload = resolve;
        });
      }
      
      // AR.js
      if (!document.querySelector('script[src*="ar.js"]')) {
        const arScript = document.createElement('script');
        arScript.src = 'https://cdn.jsdelivr.net/npm/ar.js@2.2.2/aframe/build/aframe-ar.min.js';
        document.head.appendChild(arScript);
        
        await new Promise(resolve => {
          arScript.onload = resolve;
        });
      }
      
      // Initialize AR scene after scripts load
      setTimeout(initializeARScene, 1000);
    };

    loadAFrameScripts();

    return () => {
      // Cleanup
      if (sceneRef.current) {
        sceneRef.current.innerHTML = '';
      }
    };
  }, []);

  const initializeARScene = () => {
    if (!sceneRef.current) return;

    const sceneHTML = `
      <a-scene
        vr-mode-ui="enabled: false"
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        renderer="logarithmicDepthBuffer: true;"
        embedded
        style="height: 100%; width: 100%;"
      >
        <!-- Asset management -->
        <a-assets>
          <a-mixin id="text-style" 
                   text="font: kelsonsans; align: center; color: #ff4444; shader: msdf"
                   geometry="primitive: plane; width: 2; height: 0.5"
                   material="color: white; opacity: 0.8">
          </a-mixin>
        </a-assets>

        <!-- AR Marker -->
        <a-marker preset="hiro" raycaster="objects: .clickable" emitevents="true" cursor="fuse: false; rayOrigin: mouse">
          <!-- 3D Content for marker-based AR -->
          <a-box 
            position="0 0.5 0" 
            rotation="0 45 0" 
            color="#ff6b6b"
            animation="property: rotation; to: 0 405 0; loop: true; dur: 3000">
          </a-box>
          
          <a-text 
            position="0 1.5 0" 
            text="value: ${category.toUpperCase()} DETECTED; color: #ffffff; align: center"
            background="color: #ff4444; opacity: 0.8"
            geometry="primitive: plane; width: 3; height: 0.6">
          </a-text>
          
          <a-cylinder 
            position="1 0.75 0" 
            radius="0.3" 
            height="1.5" 
            color="#4ecdc4"
            animation="property: position; to: 1 1.25 0; dir: alternate; dur: 1000; loop: true">
          </a-cylinder>
        </a-marker>

        <!-- Location-based AR elements (for GPS-based AR) -->
        <a-text 
          position="0 2 -3" 
          text="value: Point camera at issue location; color: #00ff00; align: center"
          background="color: rgba(0,0,0,0.5)"
          visible="true">
        </a-text>

        <!-- AR Camera -->
        <a-entity camera look-controls wasd-controls position="0 1.6 0"></a-entity>
      </a-scene>
    `;

    sceneRef.current.innerHTML = sceneHTML;
  };

  const takeScreenshot = () => {
    const scene = document.querySelector('a-scene');
    if (scene) {
      (scene as any).components.screenshot.capture('perspective');
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* A-Frame AR Scene Container */}
      <div ref={sceneRef} className="w-full h-full">
        {/* Loading indicator while A-Frame loads */}
        <div className="flex items-center justify-center h-full">
          <Card className="p-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Loading AR Experience...</p>
            <p className="text-xs text-gray-400 mt-2">
              Please allow camera access and point at a marker or issue location
            </p>
          </Card>
        </div>
      </div>
      
      {/* AR Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-white border-white hover:bg-white/20"
          >
            <X className="w-4 h-4 mr-2" />
            Close AR
          </Button>
          
          <div className="text-center">
            <p className="text-white text-sm font-medium">AR Mode Active</p>
            <p className="text-gray-300 text-xs">Point at issue location</p>
          </div>
          
          <Button
            onClick={takeScreenshot}
            className="bg-red-600 hover:bg-red-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Capture
          </Button>
        </div>
      </div>
      
      {/* AR Instructions */}
      <div className="absolute top-4 left-4 right-4">
        <Card className="bg-black/70 text-white p-3">
          <h3 className="font-semibold text-sm mb-2">AR Instructions</h3>
          <ul className="text-xs space-y-1">
            <li>• Point camera at the issue location</li>
            <li>• Look for AR markers to place 3D annotations</li>
            <li>• Tap "Capture" when the issue is highlighted</li>
            <li>• Move device slowly for better tracking</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default AFrameAR;
