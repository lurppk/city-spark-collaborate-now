
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Users, AlertTriangle, CheckCircle, Clock, TrendingUp, MapPin, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [timeRange, setTimeRange] = useState('30d');

  const departments = [
    { id: 'all', name: 'All Departments', issues: 127, resolved: 89, pending: 38 },
    { id: 'public-works', name: 'Public Works', issues: 45, resolved: 32, pending: 13 },
    { id: 'transportation', name: 'Transportation', issues: 38, resolved: 28, pending: 10 },
    { id: 'parks', name: 'Parks & Recreation', issues: 29, resolved: 21, pending: 8 },
    { id: 'safety', name: 'Public Safety', issues: 15, resolved: 8, pending: 7 }
  ];

  const kpiData = [
    { label: 'Total Issues', value: '127', change: '+8%', trend: 'up', color: 'text-blue-600' },
    { label: 'Resolved This Month', value: '89', change: '+15%', trend: 'up', color: 'text-green-600' },
    { label: 'Avg Response Time', value: '2.3 days', change: '-12%', trend: 'down', color: 'text-orange-600' },
    { label: 'Citizen Satisfaction', value: '94%', change: '+3%', trend: 'up', color: 'text-purple-600' }
  ];

  const recentIssues = [
    {
      id: 1,
      title: 'Broken streetlight on Main St',
      department: 'Public Works',
      priority: 'high',
      status: 'in-progress',
      assignee: 'John Smith',
      created: '2 hours ago',
      location: 'Main St & 5th Ave'
    },
    {
      id: 2,
      title: 'Pothole repair needed',
      department: 'Transportation',
      priority: 'medium',
      status: 'assigned',
      assignee: 'Sarah Johnson',
      created: '4 hours ago',
      location: 'Oak Street'
    },
    {
      id: 3,
      title: 'Park bench vandalism',
      department: 'Parks & Recreation',
      priority: 'low',
      status: 'pending',
      assignee: 'Unassigned',
      created: '1 day ago',
      location: 'Central Park'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-slate-100 text-slate-700';
      case 'assigned': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
            <p className="text-lg text-slate-600">Monitor city operations and manage department workflows</p>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-600">{kpi.label}</p>
                <div className={`flex items-center text-xs ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp className={`w-3 h-3 mr-1 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                  {kpi.change}
                </div>
              </div>
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Department Overview */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-800">Department Performance</h3>
                <select 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-4">
                {departments.slice(1).map((dept) => (
                  <div key={dept.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-800">{dept.name}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-700">{dept.issues} total</Badge>
                        <Badge className="bg-green-100 text-green-700">{dept.resolved} resolved</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Resolution Rate</span>
                        <span>{Math.round((dept.resolved / dept.issues) * 100)}%</span>
                      </div>
                      <Progress value={(dept.resolved / dept.issues) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Issues */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-800">Recent Issues</h3>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentIssues.map((issue) => (
                  <div key={issue.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-800 mb-1">{issue.title}</h4>
                        <p className="text-sm text-slate-600 mb-2">{issue.location}</p>
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <span>{issue.department}</span>
                          <span>•</span>
                          <span>Assigned to: {issue.assignee}</span>
                          <span>•</span>
                          <span>{issue.created}</span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                        <Badge className={getStatusColor(issue.status)}>{issue.status}</Badge>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm">Assign</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-6">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                Quick Stats
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                    <span className="text-sm text-slate-600">High Priority</span>
                  </div>
                  <span className="font-semibold text-red-600">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm text-slate-600">In Progress</span>
                  </div>
                  <span className="font-semibold text-orange-600">38</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-slate-600">Resolved Today</span>
                  </div>
                  <span className="font-semibold text-green-600">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm text-slate-600">Active Staff</span>
                  </div>
                  <span className="font-semibold text-blue-600">47</span>
                </div>
              </div>
            </Card>

            {/* System Alerts */}
            <Card className="p-6">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                System Alerts
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-medium text-red-800">Server Load High</p>
                  <p className="text-xs text-red-600">CPU usage at 85%</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">Backup Pending</p>
                  <p className="text-xs text-yellow-600">Last backup: 2 days ago</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Update Available</p>
                  <p className="text-xs text-blue-600">System version 2.1.3</p>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h4 className="font-semibold text-slate-800 mb-4">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Staff
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
