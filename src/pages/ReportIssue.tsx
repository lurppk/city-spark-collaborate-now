
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, MapPin, Upload, Mic, Video, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const ReportIssue = () => {
  const [reportMethod, setReportMethod] = useState('ar');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'infrastructure', label: 'Infrastructure', icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
    { id: 'roads', label: 'Roads & Traffic', icon: MapPin, color: 'bg-orange-50 text-orange-600' },
    { id: 'parks', label: 'Parks & Recreation', icon: CheckCircle, color: 'bg-green-50 text-green-600' },
    { id: 'safety', label: 'Public Safety', icon: Clock, color: 'bg-blue-50 text-blue-600' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Issue reported successfully! You will receive updates on your report.');
    }, 2000);
  };

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
          <div className="grid md:grid-cols-3 gap-4">
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
              <Badge className="bg-green-100 text-green-700 mt-2">Recommended</Badge>
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

          {/* Issue Details */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Issue Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Issue Title</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the issue"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <textarea 
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Provide detailed information about the issue"
                  required
                ></textarea>
              </div>
            </div>
          </Card>

          {/* Media Upload */}
          {reportMethod === 'ar' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">AR Capture</h3>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 mb-4">AR camera interface will appear here</p>
                <Button type="button" className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                  <Video className="w-4 h-4 mr-2" />
                  Start AR Capture
                </Button>
              </div>
            </Card>
          )}

          {reportMethod === 'photo' && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Upload Photos</h3>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 mb-4">Drag and drop photos or click to browse</p>
                <Button type="button" variant="outline">
                  Choose Files
                </Button>
              </div>
            </Card>
          )}

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
