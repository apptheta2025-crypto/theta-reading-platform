import React, { useState } from 'react';
import { User, Mail, Calendar, Shield, CreditCard, Download, BookOpen, Headphones, Crown, Edit3, Camera, Trash2, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: profile?.display_name || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    website: profile?.website || '',
  });

  const handleSave = () => {
    // Here you would typically save the profile changes
    console.log('Saving profile:', editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      displayName: profile?.display_name || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      website: profile?.website || '',
    });
    setIsEditing(false);
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const stats = {
    totalBooks: 47,
    totalAudiobooks: 23,
    totalPlaylists: 8,
    totalHours: 156,
    joinedDate: 'January 2024',
    lastActive: '2 hours ago',
  };

  const recentActivity = [
    { type: 'read', title: 'The Malgudi Days', author: 'R.K. Narayan', time: '2 hours ago' },
    { type: 'listened', title: 'The Essential Collection', author: 'Ruskin Bond', time: '1 day ago' },
    { type: 'created', title: 'My Favorites Playlist', time: '3 days ago' },
    { type: 'downloaded', title: 'The Guide', author: 'R.K. Narayan', time: '1 week ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-surface-mid rounded-lg"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="p-3 bg-theta-purple rounded-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Account</h1>
            <p className="text-text-secondary mt-1">Manage your account and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-surface-mid">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <div className="grid gap-6">
              {/* Profile Header */}
              <Card className="border-2 border-border">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profile?.avatar_url || ''} alt={profile?.display_name || 'Profile'} />
                        <AvatarFallback className="bg-theta-purple text-white text-2xl font-semibold">
                          {getInitials(profile?.display_name || user?.email)}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-theta-purple hover:bg-theta-purple/90"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-heading font-bold text-foreground">
                          {profile?.display_name || 'User'}
                        </h2>
                        <Badge variant="secondary" className="bg-theta-purple/10 text-theta-purple">
                          Premium
                        </Badge>
                      </div>
                      <p className="text-text-secondary mb-4">{user?.email}</p>
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Joined {stats.joinedDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          Last active {stats.lastActive}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                        className="border-2 border-theta-purple text-theta-purple hover:bg-theta-purple hover:text-white"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Details */}
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                          id="displayName"
                          value={editForm.displayName}
                          onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                          className="bg-surface-mid border-2 border-border focus:border-theta-purple"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editForm.location}
                          onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                          className="bg-surface-mid border-2 border-border focus:border-theta-purple"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          value={editForm.bio}
                          onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                          className="w-full h-24 px-3 py-2 bg-surface-mid border-2 border-border rounded-md focus:border-theta-purple focus:outline-none resize-none"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={editForm.website}
                          onChange={(e) => setEditForm(prev => ({ ...prev, website: e.target.value }))}
                          className="bg-surface-mid border-2 border-border focus:border-theta-purple"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                      <div className="flex gap-2 md:col-span-2">
                        <Button onClick={handleSave} className="theta-button-primary">
                          Save Changes
                        </Button>
                        <Button onClick={handleCancel} variant="outline">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-text-secondary">Display Name</Label>
                        <p className="text-foreground mt-1">{profile?.display_name || 'Not set'}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-text-secondary">Location</Label>
                        <p className="text-foreground mt-1">{profile?.location || 'Not set'}</p>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-text-secondary">Bio</Label>
                        <p className="text-foreground mt-1">{profile?.bio || 'No bio available'}</p>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-text-secondary">Website</Label>
                        <p className="text-foreground mt-1">{profile?.website || 'Not set'}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="mt-6">
            <div className="grid gap-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-2 border-border">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="w-8 h-8 text-theta-purple mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{stats.totalBooks}</p>
                    <p className="text-sm text-text-secondary">Books Read</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-border">
                  <CardContent className="p-6 text-center">
                    <Headphones className="w-8 h-8 text-theta-purple mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{stats.totalAudiobooks}</p>
                    <p className="text-sm text-text-secondary">Audiobooks</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-border">
                  <CardContent className="p-6 text-center">
                    <Download className="w-8 h-8 text-theta-purple mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{stats.totalPlaylists}</p>
                    <p className="text-sm text-text-secondary">Playlists</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-border">
                  <CardContent className="p-6 text-center">
                    <Clock className="w-8 h-8 text-theta-purple mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{stats.totalHours}h</p>
                    <p className="text-sm text-text-secondary">Total Hours</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-mid transition-colors">
                        <div className="p-2 bg-theta-purple/10 rounded-lg">
                          {activity.type === 'read' && <BookOpen className="w-4 h-4 text-theta-purple" />}
                          {activity.type === 'listened' && <Headphones className="w-4 h-4 text-theta-purple" />}
                          {activity.type === 'created' && <Download className="w-4 h-4 text-theta-purple" />}
                          {activity.type === 'downloaded' && <Download className="w-4 h-4 text-theta-purple" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{activity.title}</p>
                          {activity.author && (
                            <p className="text-sm text-text-secondary">{activity.author}</p>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="mt-6">
            <div className="grid gap-6">
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-theta-purple" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Theta Premium</h3>
                      <p className="text-text-secondary">Unlimited access to all content</p>
                      <p className="text-sm text-text-secondary mt-1">Next billing: March 15, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">$9.99/month</p>
                      <Button variant="outline" className="mt-2 border-2 border-theta-purple text-theta-purple hover:bg-theta-purple hover:text-white">
                        Manage Subscription
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-surface-mid rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">February 2024</p>
                        <p className="text-sm text-text-secondary">Theta Premium</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">$9.99</p>
                        <p className="text-sm text-green-600">Paid</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-surface-mid rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">January 2024</p>
                        <p className="text-sm text-text-secondary">Theta Premium</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">$9.99</p>
                        <p className="text-sm text-green-600">Paid</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="mt-6">
            <div className="grid gap-6">
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">Change Password</h3>
                        <p className="text-sm text-text-secondary">Update your account password</p>
                      </div>
                      <Button variant="outline" className="border-2 border-theta-purple text-theta-purple hover:bg-theta-purple hover:text-white">
                        Change
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">Two-Factor Authentication</h3>
                        <p className="text-sm text-text-secondary">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" className="border-2 border-theta-purple text-theta-purple hover:bg-theta-purple hover:text-white">
                        Enable
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">Login Sessions</h3>
                        <p className="text-sm text-text-secondary">Manage your active sessions</p>
                      </div>
                      <Button variant="outline" className="border-2 border-theta-purple text-theta-purple hover:bg-theta-purple hover:text-white">
                        View Sessions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Trash2 className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">Delete Account</h3>
                        <p className="text-sm text-text-secondary">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;
