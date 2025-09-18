import React, { useState } from 'react';
import { User, Settings, Heart, Download, Clock, Edit, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MediaCard from '@/components/media/MediaCard';
import { mockBooks, mockPodcasts } from '@/data/mockData';
import { useMode } from '@/contexts/ModeContext';

const Profile: React.FC = () => {
  const { isStudentMode, toggleStudentMode } = useMode();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Reader',
    email: 'alex@example.com',
    joinDate: 'January 2024',
    plan: 'Free'
  });

  const stats = {
    booksRead: 24,
    hoursListened: 156,
    streakDays: 7,
    achievements: 5
  };

  const recentItems = [...mockBooks.slice(0, 3), ...mockPodcasts.slice(0, 2)];
  const likedItems = mockBooks.slice(1, 4);

  return (
    <main className="pb-24 min-h-screen">
      <div className="px-6 py-8 max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Avatar and basic info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-32 h-32 bg-brand-primary rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-white">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            {/* Plan badge */}
            <Badge variant="outline" className="mb-4">
              <Crown className="w-3 h-3 mr-1" />
              {profile.plan} Plan
            </Badge>
            
            <Button variant="outline" className="gap-2">
              <Crown className="w-4 h-4" />
              Upgrade to Premium
            </Button>
          </div>

          {/* Profile details */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="p-2"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-text-secondary mb-2">{profile.email}</p>
            <p className="text-text-secondary mb-6">Member since {profile.joinDate}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-brand-primary mb-1">
                    {stats.booksRead}
                  </div>
                  <div className="text-sm text-text-secondary">Books Read</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-brand-primary mb-1">
                    {stats.hoursListened}
                  </div>
                  <div className="text-sm text-text-secondary">Hours Listened</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-brand-primary mb-1">
                    {stats.streakDays}
                  </div>
                  <div className="text-sm text-text-secondary">Day Streak</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-brand-primary mb-1">
                    {stats.achievements}
                  </div>
                  <div className="text-sm text-text-secondary">Achievements</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList className="bg-surface-mid">
            <TabsTrigger value="recent" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
              Recent Activity
            </TabsTrigger>
            <TabsTrigger value="liked" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
              Liked Items
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Recent Activity */}
          <TabsContent value="recent" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {recentItems.map((item) => (
                  <MediaCard key={item.id} item={item} size="sm" showProgress />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Liked Items */}
          <TabsContent value="liked" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Liked Items
              </h2>
              {likedItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {likedItems.map((item) => (
                    <MediaCard key={item.id} item={item} size="sm" />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-surface-mid rounded-lg">
                  <Heart className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No liked items yet</h3>
                  <p className="text-text-secondary">
                    Like content to see it here
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => setIsEditing(false)}>
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p><strong>Name:</strong> {profile.name}</p>
                      <p><strong>Email:</strong> {profile.email}</p>
                      <p><strong>Plan:</strong> {profile.plan}</p>
                      <p><strong>Member since:</strong> {profile.joinDate}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Student Mode</h4>
                      <p className="text-sm text-text-secondary">
                        Show only K-12 educational content
                      </p>
                    </div>
                    <Button
                      variant={isStudentMode ? "default" : "outline"}
                      size="sm"
                      onClick={toggleStudentMode}
                    >
                      {isStudentMode ? 'ON' : 'OFF'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Auto-play</h4>
                      <p className="text-sm text-text-secondary">
                        Automatically play next item in queue
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      ON
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Download Quality</h4>
                      <p className="text-sm text-text-secondary">
                        Quality for offline downloads
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      High
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Profile;