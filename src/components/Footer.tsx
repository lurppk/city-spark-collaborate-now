
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Phone, Facebook, Users, MessageSquare } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { label: 'Report Issue', href: '#' },
    { label: 'City Map', href: '#' },
    { label: 'Community Votes', href: '#' },
    { label: 'Town Halls', href: '#' },
    { label: 'Contact Us', href: '#' }
  ];

  const departments = [
    { label: 'Public Works', href: '#' },
    { label: 'Parks & Recreation', href: '#' },
    { label: 'Transportation', href: '#' },
    { label: 'Public Safety', href: '#' },
    { label: 'Planning', href: '#' }
  ];

  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">CityConnect</h3>
                <p className="text-sm text-slate-400">Smart City Dashboard</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Empowering citizens to build stronger, smarter communities together.
              Your voice, your city, your future.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                <Users className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-slate-300 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="font-semibold text-white mb-4">Departments</h4>
            <ul className="space-y-3">
              {departments.map((dept, index) => (
                <li key={index}>
                  <a href={dept.href} className="text-slate-300 hover:text-white text-sm transition-colors">
                    {dept.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center text-slate-300 text-sm">
                <MapPin className="w-4 h-4 mr-3 text-slate-400" />
                123 City Hall Plaza<br />
                Your City, State 12345
              </div>
              <div className="flex items-center text-slate-300 text-sm">
                <Phone className="w-4 h-4 mr-3 text-slate-400" />
                (555) 123-4567
              </div>
              <div className="flex items-center text-slate-300 text-sm">
                <Mail className="w-4 h-4 mr-3 text-slate-400" />
                hello@cityconnect.gov
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-700 rounded-lg">
              <h5 className="font-medium text-white mb-2">24/7 Emergency</h5>
              <p className="text-slate-300 text-sm mb-2">For urgent city issues</p>
              <p className="text-white font-mono text-lg">(555) 911-CITY</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2024 CityConnect. Made with ❤️ for our community.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
