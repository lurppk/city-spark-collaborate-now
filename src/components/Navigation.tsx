
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, User, MapPin, BarChart3, Users, MessageSquare } from 'lucide-react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { icon: MapPin, label: 'City Map', path: '/map', count: null },
    { icon: MessageSquare, label: 'Report Issue', path: '/report', count: null },
    { icon: Users, label: 'Community', path: '/community', count: 3 },
    { icon: BarChart3, label: 'Dashboard', path: '/admin', count: null },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-blue-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">CityConnect</h1>
              <p className="text-xs text-slate-500">Smart City Dashboard</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.label} to={item.path}>
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 transition-colors ${
                    isActivePath(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.count && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                      {item.count}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
            
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-100">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link key={item.label} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className={`flex items-center justify-start space-x-3 w-full ${
                      isActivePath(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.count && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs ml-auto">
                        {item.count}
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 text-white w-full mt-4">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
