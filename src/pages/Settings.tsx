import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Download, Wifi, Volume2, Moon, Sun, Monitor, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { useMode } from '@/contexts/ModeContext';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { mode, setMode } = useMode();
  const [settings, setSettings] = useState({
    // General
    theme: 'dark',
    language: 'en',
    autoPlay: true,
    downloadQuality: 'high',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    contentUpdates: true,
    systemUpdates: true,
    marketingEmails: false,
    
    // Privacy
    profileVisibility: 'public',
    dataCollection: true,
    analytics: true,
    crashReports: true,
    
    // Audio
    volume: 80,
    autoPlayNext: true,
    crossfade: false,
    equalizer: 'off',
    
    // Download
    autoDownload: false,
    downloadOnWifi: true,
    maxStorage: 5,
    clearCache: false,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleModeChange = (newMode: 'read' | 'listen') => {
    setMode(newMode);
  };

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
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Settings</h1>
            <p className="text-text-secondary mt-1">Customize your Theta experience</p>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-surface-mid">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="download">Download</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="mt-6">
            <div className="grid gap-6">
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    General Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                        <SelectTrigger className="bg-surface-mid border-2 border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center gap-2">
                              <Sun className="w-4 h-4" />
                              Light
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center gap-2">
                              <Moon className="w-4 h-4" />
                              Dark
                            </div>
                          </SelectItem>
                          <SelectItem value="system">
                            <div className="flex items-center gap-2">
                              <Monitor className="w-4 h-4" />
                              System
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                        <SelectTrigger className="bg-surface-mid border-2 border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Default Mode</h3>
                    <div className="flex gap-4">
                      <Button
                        variant={mode === 'read' ? 'default' : 'outline'}
                        onClick={() => handleModeChange('read')}
                        className={mode === 'read' ? 'theta-button-primary' : 'border-2 border-theta-purple text-theta-purple hover:bg-theta-purple hover:text-white'}
                      >
                        Reading Mode
                      </Button>
                      <Button
                        variant={mode === 'listen' ? 'default' : 'outline'}
                        onClick={() => handleModeChange('listen')}
                        className={mode === 'listen' ? 'theta-button-primary' : 'border-2 border-theta-purple text-theta-purple hover:bg-theta-purple hover:text-white'}
                      >
                        Listening Mode
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="autoPlay">Auto-play content</Label>
                      <p className="text-sm text-text-secondary">Automatically start playing when opening content</p>
                    </div>
                    <Switch
                      id="autoPlay"
                      checked={settings.autoPlay}
                      onCheckedChange={(checked) => handleSettingChange('autoPlay', checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="downloadQuality">Download Quality</Label>
                    <Select value={settings.downloadQuality} onValueChange={(value) => handleSettingChange('downloadQuality', value)}>
                      <SelectTrigger className="bg-surface-mid border-2 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (faster downloads)</SelectItem>
                        <SelectItem value="medium">Medium (balanced)</SelectItem>
                        <SelectItem value="high">High (best quality)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="mt-6">
            <div className="grid gap-6">
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-text-secondary">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="pushNotifications">Push Notifications</Label>
                        <p className="text-sm text-text-secondary">Receive push notifications on your device</p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="contentUpdates">Content Updates</Label>
                        <p className="text-sm text-text-secondary">New books, audiobooks, and content releases</p>
                      </div>
                      <Switch
                        id="contentUpdates"
                        checked={settings.contentUpdates}
                        onCheckedChange={(checked) => handleSettingChange('contentUpdates', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="systemUpdates">System Updates</Label>
                        <p className="text-sm text-text-secondary">App updates and maintenance notifications</p>
                      </div>
                      <Switch
                        id="systemUpdates"
                        checked={settings.systemUpdates}
                        onCheckedChange={(checked) => handleSettingChange('systemUpdates', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="marketingEmails">Marketing Emails</Label>
                        <p className="text-sm text-text-secondary">Promotional content and special offers</p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={settings.marketingEmails}
                        onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="mt-6">
            <div className="grid gap-6">
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="profileVisibility">Profile Visibility</Label>
                    <Select value={settings.profileVisibility} onValueChange={(value) => handleSettingChange('profileVisibility', value)}>
                      <SelectTrigger className="bg-surface-mid border-2 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Data Collection</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="dataCollection">Usage Data</Label>
                        <p className="text-sm text-text-secondary">Help improve Theta by sharing anonymous usage data</p>
                      </div>
                      <Switch
                        id="dataCollection"
                        checked={settings.dataCollection}
                        onCheckedChange={(checked) => handleSettingChange('dataCollection', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="analytics">Analytics</Label>
                        <p className="text-sm text-text-secondary">Allow analytics to improve your experience</p>
                      </div>
                      <Switch
                        id="analytics"
                        checked={settings.analytics}
                        onCheckedChange={(checked) => handleSettingChange('analytics', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="crashReports">Crash Reports</Label>
                        <p className="text-sm text-text-secondary">Automatically send crash reports to help fix issues</p>
                      </div>
                      <Switch
                        id="crashReports"
                        checked={settings.crashReports}
                        onCheckedChange={(checked) => handleSettingChange('crashReports', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Audio Settings */}
          <TabsContent value="audio" className="mt-6">
            <div className="grid gap-6">
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5" />
                    Audio Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="volume">Master Volume</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="volume"
                          value={[settings.volume]}
                          onValueChange={(value) => handleSettingChange('volume', value[0])}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-foreground w-12">{settings.volume}%</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="autoPlayNext">Auto-play Next</Label>
                        <p className="text-sm text-text-secondary">Automatically play the next item in queue</p>
                      </div>
                      <Switch
                        id="autoPlayNext"
                        checked={settings.autoPlayNext}
                        onCheckedChange={(checked) => handleSettingChange('autoPlayNext', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="crossfade">Crossfade</Label>
                        <p className="text-sm text-text-secondary">Smooth transition between tracks</p>
                      </div>
                      <Switch
                        id="crossfade"
                        checked={settings.crossfade}
                        onCheckedChange={(checked) => handleSettingChange('crossfade', checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="equalizer">Equalizer</Label>
                      <Select value={settings.equalizer} onValueChange={(value) => handleSettingChange('equalizer', value)}>
                        <SelectTrigger className="bg-surface-mid border-2 border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="off">Off</SelectItem>
                          <SelectItem value="spoken">Spoken Word</SelectItem>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Download Settings */}
          <TabsContent value="download" className="mt-6">
            <div className="grid gap-6">
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="autoDownload">Auto-download</Label>
                        <p className="text-sm text-text-secondary">Automatically download new content</p>
                      </div>
                      <Switch
                        id="autoDownload"
                        checked={settings.autoDownload}
                        onCheckedChange={(checked) => handleSettingChange('autoDownload', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="downloadOnWifi">Wi-Fi Only</Label>
                        <p className="text-sm text-text-secondary">Only download when connected to Wi-Fi</p>
                      </div>
                      <Switch
                        id="downloadOnWifi"
                        checked={settings.downloadOnWifi}
                        onCheckedChange={(checked) => handleSettingChange('downloadOnWifi', checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxStorage">Max Storage (GB)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="maxStorage"
                          value={[settings.maxStorage]}
                          onValueChange={(value) => handleSettingChange('maxStorage', value[0])}
                          max={50}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-foreground w-12">{settings.maxStorage}GB</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Storage Management</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label htmlFor="clearCache">Clear Cache</Label>
                          <p className="text-sm text-text-secondary">Clear temporary files and cache</p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => handleSettingChange('clearCache', true)}
                          className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          Clear Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <Button className="theta-button-primary px-8">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
