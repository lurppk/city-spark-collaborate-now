import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, MessageSquare, Users, Trophy, Calendar, ArrowRight } from 'lucide-react';

const CommunityEngagement = () => {
  const activeVotes = [
    {
      id: 1,
      title: 'New Bike Lane on Riverside Drive',
      description: 'Proposed 2.5-mile protected bike lane connecting downtown to the university',
      votes: { yes: 847, no: 156 },
      totalVotes: 1003,
      timeLeft: '5 days',
      category: 'Transportation'
    },
    {
      id: 2,
      title: 'Extended Library Hours',
      description: 'Keep Central Library open until 10 PM on weekdays',
      votes: { yes: 692, no: 234 },
      totalVotes: 926,
      timeLeft: '12 days',
      category: 'Community Services'
    },
    {
      id: 3,
      title: 'Dog Park Expansion',
      description: 'Add separate areas for small and large dogs in Greenwood Park',
      votes: { yes: 1205, no: 89 },
      totalVotes: 1294,
      timeLeft: '2 days',
      category: 'Parks & Recreation'
    }
  ];

  const communityStats = [
    { label: 'Active Citizens', value: '3,247', icon: Users, color: 'text-blue-600' },
    { label: 'Issues Resolved', value: '1,847', icon: Trophy, color: 'text-green-600' },
    { label: 'Votes Cast', value: '12,543', icon: ThumbsUp, color: 'text-orange-600' },
    { label: 'Town Halls', value: '24', icon: Calendar, color: 'text-purple-600' }
  ];

  const calculatePercentage = (yes: number, total: number) => (yes / total) * 100;

  return (
    <div className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Your Voice Matters</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Democracy in action. Vote on city initiatives, see real-time results, 
            and watch how your community shapes the future together.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => (
            <Card key={index} className="p-6 text-center border-slate-200 hover:shadow-md transition-shadow">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Votes */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-800">Active Votes</h3>
              <Link to="/community">
                <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  View All Proposals
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {activeVotes.map((vote) => (
              <Card key={vote.id} className="p-6 border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-slate-800">{vote.title}</h4>
                      <Badge variant="outline" className="text-xs">{vote.category}</Badge>
                    </div>
                    <p className="text-slate-600 text-sm mb-4">{vote.description}</p>
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
                    <div className="flex items-center text-sm text-slate-500">
                      <Users className="w-4 h-4 mr-1" />
                      {vote.totalVotes.toLocaleString()} votes
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

          {/* Community Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="p-6">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Upcoming Events
              </h4>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium text-slate-800">Town Hall Meeting</p>
                  <p className="text-sm text-slate-600">Nov 15, 7:00 PM</p>
                  <p className="text-xs text-slate-500">City Council Chambers</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-slate-800">Community Cleanup</p>
                  <p className="text-sm text-slate-600">Nov 18, 9:00 AM</p>
                  <p className="text-xs text-slate-500">Riverside Park</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <p className="font-medium text-slate-800">Budget Workshop</p>
                  <p className="text-sm text-slate-600">Nov 22, 6:30 PM</p>
                  <p className="text-xs text-slate-500">Virtual Meeting</p>
                </div>
              </div>
            </Card>

            {/* Top Contributors */}
            <Card className="p-6">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-orange-600" />
                Community Heroes
              </h4>
              <div className="space-y-3">
                {[
                  { name: 'Sarah Chen', points: 245, badge: 'Problem Solver' },
                  { name: 'Marcus Rodriguez', points: 198, badge: 'Voice of Change' },
                  { name: 'Dr. Amanda Park', points: 167, badge: 'Community Builder' }
                ].map((hero, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">{hero.name}</p>
                      <p className="text-xs text-slate-500">{hero.badge}</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700">{hero.points} pts</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityEngagement;
