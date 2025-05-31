
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ARCamera from '@/components/ARCamera';
import AFrameAR from '@/components/AFrameAR';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Camera, MapPin, Upload, Mic, Video, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

const ReportIssue = () => {
  const [reportMethod, setReportMethod] = useState('ar');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showARCamera, setShowARCamera] = useState(false);
  const [showAFrameAR, setShowAFrameAR] = useState(false);
  const [capturedData, setCapturedData] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: ''
  });

  const categories = [
    { id: 'infrastructure', label: 'Infrastructure', icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
    { id: 'roads', label: 'Roads & Traffic', icon: MapPin, color: 'bg-orange-50 text-orange-600' },
    { id: 'parks', label: 'Parks & Recreation', icon: CheckCircle, color: 'bg-green-50 text-green-600' },
    { id: 'safety', label: 'Public Safety', icon: Clock, color: 'bg-blue-50 text-blue-600' }
  ];

  const handleARCapture = (data: any) => {
    console.log('AR Capture Data:', data);
    setCapturedData(data);
    setShowARCamera(false);
    setShowAFrameAR(false);
    
    // Auto-fill form with AI-detected data
    if (data.category && data.category !== category) {
      setCategory(data.category);
    }
    
    // Auto-fill location if available
    if (data.location) {
      setFormData(prev => ({
        ...prev,
        location: `${data.location.lat.toFixed(6)}, ${data.location.lng.toFixed(6)}`
      }));
    }
  };

  const startARCamera = () => {
    if (!category) {
      alert('Please select a category first');
      return;
    }
    setShowARCamera(true);
  };

  const startAFrameAR = () => {
    if (!category) {
      alert('Please select a category first');
      return;
    }
    setShowAFrameAR(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      alert('Please select a category');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API submission
    const submissionData = {
      ...formData,
      category,
      reportMethod,
      capturedData,
      timestamp: new Date().toISOString()
    };
    
    console.log('Submitting report:', submissionData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Issue reported successfully! You will receive updates on your report.');
      
      // Reset form
      setFormData({ title: '', location: '', description: '' });
      setCapturedData(null);
      setCategory('');
    }, 2000);
  };

  // Show AR Camera
  if (showARCamera) {
    return (
      <ARCamera
        onCapture={handleARCapture}
        onClose={() => setShowARCamera(false)}
        selectedCategory={category}
      />
    );
  }

  // Show A-Frame AR
  if (showAFrameAR) {
    return (
      <AFrameAR
        onClose={() => setShowAFrameAR(false)}
        category={category}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Report an Issue</h1>
          <p className="text-lg text-slate-600">Help make our city better. Report issues quickly with AR or traditional forms.</p>
        </div>

        {/* Reporting Method Selection */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Choose Reporting Method</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <button
              onClick={() => setReportMethod('ar')}
              className={`p-6 rounded-lg border-2 transition-all ${
                reportMethod === 'ar' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Camera className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-slate-800 mb-2">AR Camera</h4>
              <p className="text-sm text-slate-600">Point, capture, and report with augmented reality</p>
              <Badge className="bg-green-100 text-green-700 mt-2">AI Powered</Badge>
            </button>
            
            <button
              onClick={() => setReportMethod('aframe')}
              className={`p-6 rounded-lg border-2 transition-all ${
                reportMethod === 'aframe' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-slate-800 mb-2">Advanced AR</h4>
              <p className="text-sm text-slate-600">Full 3D AR experience with markers</p>
              <Badge className="bg-purple-100 text-purple-700 mt-2">A-Frame</Badge>
            </button>
            
            <button
              onClick={() => setReportMethod('photo')}
              className={`p-6 rounded-lg border-2 transition-all ${
                reportMethod === 'photo' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Upload className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-slate-800 mb-2">Photo Upload</h4>
              <p className="text-sm text-slate-600">Upload photos and describe the issue</p>
            </button>
            
            <button
              onClick={() => setReportMethod('voice')}
              className={`p-6 rounded-lg border-2 transition-all ${
                reportMethod === 'voice' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Mic className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-slate-800 mb-2">Voice Report</h4>
              <p className="text-sm text-slate-600">Speak your report for quick submission</p>
            </button>
          </div>
        </Card>

        {/* Report Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Issue Category</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    category === cat.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center`}>
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-slate-800">{cat.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* AR Capture Sections */}
          {reportMethod === 'ar' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">AR Smart Capture</h3>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 mb-4">Use AI-powered AR to automatically detect and classify issues</p>
                <Button 
                  type="button" 
                  onClick={startARCamera}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Start AR Capture
                </Button>
              </div>
            </Card>
          )}

          {reportMethod === 'aframe' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Advanced AR Experience</h3>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-slate-500 mb-4">Full 3D AR with marker tracking and spatial annotations</p>
                <Button 
                  type="button" 
                  onClick={startAFrameAR}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Launch A-Frame AR
                </Button>
              </div>
            </Card>
          )}

          {/* Show captured data */}
          {capturedData && (
            <Card className="p-6 bg-green-50">
              <h3 className="text-lg font-semibold text-green-800 mb-3">✅ AR Capture Successful</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Detected Category:</strong> {capturedData.category}
                </div>
                {capturedData.confidence && (
                  <div>
                    <strong>AI Confidence:</strong> {capturedData.confidence}%
                  </div>
                )}
                {capturedData.location && (
                  <div>
                    <strong>GPS Location:</strong> {capturedData.location.lat.toFixed(6)}, {capturedData.location.lng.toFixed(6)}
                  </div>
                )}
                <div>
                  <strong>Image:</strong> Captured ✓
                </div>
              </div>
            </Card>
          )}

          {/* Issue Details */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Issue Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Issue Title</label>
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief description of the issue"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <div className="flex space-x-2">
                  <Input 
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Street address or landmark"
                    required
                  />
                  <Button type="button" variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    Use Current Location
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  placeholder="Provide detailed information about the issue"
                  required
                />
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              type="submit" 
              disabled={isSubmitting || !category}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 text-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReportIssue;
