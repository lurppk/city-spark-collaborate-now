
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, MessageSquare, Users, Trophy, Calendar, ArrowRight, Heart, Star, ChevronDown } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('votes');
  const [expandedVote, setExpandedVote] = useState<number | null>(null);

  const activeVotes = [
    {
      id: 1,
      title: 'New Bike Lane on Riverside Drive',
      description: 'Proposed 2.5-mile protected bike lane connecting downtown to the university. This would improve safety for cyclists and reduce traffic congestion.',
      votes: { yes: 847, no: 156 },
      totalVotes: 1003,
      timeLeft: '5 days',
      category: 'Transportation',
      details: 'The proposed bike lane would include protected barriers, dedicated traffic signals, and connections to existing bike paths.',
      impact: 'Expected to reduce car traffic by 15% and improve cyclist safety by 60%'
    },
    {
      id: 2,
      title: 'Extended Library Hours',
      description: 'Keep Central Library open until 10 PM on weekdays to better serve working families and students.',
      votes: { yes: 692, no: 234 },
      totalVotes: 926,
      timeLeft: '12 days',
      category: 'Community Services',
      details: 'Extended hours would require additional staffing and security measures.',
      impact: 'Would serve an estimated 200+ additional visitors per day'
    },
    {
      id: 3,
      title: 'Dog Park Expansion',
      description: 'Add separate areas for small and large dogs in Greenwood Park, including agility equipment.',
      votes: { yes: 1205, no: 89 },
      totalVotes: 1294,
      timeLeft: '2 days',
      category: 'Parks & Recreation',
      details: 'Expansion would double the current dog park size and add water fountains and waste stations.',
      impact: 'Would accommodate 3x more dogs and reduce overcrowding'
    }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Traffic Light Timing on Main Street',
      author: 'Sarah Chen',
      replies: 24,
      lastActivity: '2 hours ago',
      category: 'Transportation',
      preview: 'Has anyone else noticed the timing seems off during rush hour?'
    },
    {
      id: 2,
      title: 'Community Garden Initiative',
      author: 'Marcus Rodriguez',
      replies: 18,
      lastActivity: '4 hours ago',
      category: 'Environment',
      preview: 'Looking to start a community garden in the downtown area...'
    },
    {
      id: 3,
      title: 'School Zone Speed Cameras',
      author: 'Dr. Amanda Park',
      replies: 31,
      lastActivity: '1 day ago',
      category: 'Safety',
      preview: 'Proposal to add speed cameras near elementary schools for child safety'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Town Hall Meeting',
      date: 'Nov 15, 7:00 PM',
      location: 'City Council Chambers',
      attendees: 45,
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Community Cleanup',
      date: 'Nov 18, 9:00 AM',
      location: 'Riverside Park',
      attendees: 78,
      type: 'volunteer'
    },
    {
      id: 3,
      title: 'Budget Workshop',
      date: 'Nov 22, 6:30 PM',
      location: 'Virtual Meeting',
      attendees: 23,
      type: 'workshop'
    }
  ];

  const calculatePercentage = (yes: number, total: number) => (yes / total) * 100;

  const toggleVoteExpansion = (voteId: number) => {
    setExpandedVote(expandedVote === voteId ? null : voteId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Community Hub</h1>
          <p className="text-lg text-slate-600">Connect, discuss, and shape your city's future together</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-slate-200">
            <button
              onClick={() => setActiveTab('votes')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'votes' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <ThumbsUp className="w-4 h-4 inline mr-2" />
              Active Votes
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'discussions' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Discussions
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'events' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Events
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'votes' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Active Votes</h2>
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    Propose Initiative
                  </Button>
                </div>

                {activeVotes.map((vote) => (
                  <Card key={vote.id} className="p-6 border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-800">{vote.title}</h3>
                          <Badge variant="outline" className="text-xs">{vote.category}</Badge>
                        </div>
                        <p className="text-slate-600 text-sm mb-4">{vote.description}</p>
                        
                        {expandedVote === vote.id && (
                          <div className="mb-4 p-4 bg-slate-50 rounded-lg">
                            <h4 className="font-medium text-slate-800 mb-2">Details:</h4>
                            <p className="text-sm text-slate-600 mb-3">{vote.details}</p>
                            <h4 className="font-medium text-slate-800 mb-2">Expected Impact:</h4>
                            <p className="text-sm text-slate-600">{vote.impact}</p>
                          </div>
                        )}
                      </div>
                      <div className="text-right text-sm text-slate-500">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {vote.timeLeft} left
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-green-700">Yes ({vote.votes.yes})</span>
                          <span className="text-sm text-slate-500">{calculatePercentage(vote.votes.yes, vote.totalVotes).toFixed(1)}%</span>
                        </div>
                        <Progress value={calculatePercentage(vote.votes.yes, vote.totalVotes)} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-red-700">No ({vote.votes.no})</span>
                          <span className="text-sm text-slate-500">{calculatePercentage(vote.votes.no, vote.totalVotes).toFixed(1)}%</span>
                        </div>
                        <Progress value={calculatePercentage(vote.votes.no, vote.totalVotes)} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-sm text-slate-500">
                            <Users className="w-4 h-4 mr-1" />
                            {vote.totalVotes.toLocaleString()} votes
                          </div>
                          <button
                            onClick={() => toggleVoteExpansion(vote.id)}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                          >
                            {expandedVote === vote.id ? 'Show Less' : 'Show Details'}
                            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${expandedVote === vote.id ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            Vote No
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Vote Yes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'discussions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Community Discussions</h2>
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Start Discussion
                  </Button>
                </div>

                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-800 hover:text-blue-600">{discussion.title}</h3>
                          <Badge variant="outline" className="text-xs">{discussion.category}</Badge>
                        </div>
                        <p className="text-slate-600 text-sm mb-3">{discussion.preview}</p>
                        <div className="flex items-center text-sm text-slate-500 space-x-4">
                          <span>By {discussion.author}</span>
                          <span>{discussion.replies} replies</span>
                          <span>{discussion.lastActivity}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Upcoming Events</h2>
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </div>

                {events.map((event) => (
                  <Card key={event.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{event.title}</h3>
                        <div className="space-y-1 text-sm text-slate-600 mb-4">
                          <p><Calendar className="w-4 h-4 inline mr-2" />{event.date}</p>
                          <p><Users className="w-4 h-4 inline mr-2" />{event.location}</p>
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                          <Users className="w-4 h-4 mr-1" />
                          {event.attendees} attending
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Join Event
                        </Button>
                        <Button size="sm" variant="outline">
                          Share
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card className="p-6">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-orange-600" />
                Community Stats
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Active Citizens</span>
                  <span className="font-semibold">3,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Issues Resolved</span>
                  <span className="font-semibold text-green-600">1,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Votes Cast</span>
                  <span className="font-semibold text-blue-600">12,543</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">This Month</span>
                  <span className="font-semibold text-orange-600">+342</span>
                </div>
              </div>
            </Card>

            {/* Top Contributors */}
            <Card className="p-6">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-600" />
                Community Heroes
              </h4>
              <div className="space-y-3">
                {[
                  { name: 'Sarah Chen', points: 245, badge: 'Problem Solver', avatar: '👩‍💻' },
                  { name: 'Marcus Rodriguez', points: 198, badge: 'Voice of Change', avatar: '👨‍🎓' },
                  { name: 'Dr. Amanda Park', points: 167, badge: 'Community Builder', avatar: '👩‍⚕️' }
                ].map((hero, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{hero.avatar}</span>
                      <div>
                        <p className="font-medium text-slate-800">{hero.name}</p>
                        <p className="text-xs text-slate-500">{hero.badge}</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700">{hero.points} pts</Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h4 className="font-semibold text-slate-800 mb-4">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Propose Initiative
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Discussion
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Create Event
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

export default Community;
