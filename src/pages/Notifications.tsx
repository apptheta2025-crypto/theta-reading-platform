import React, { useState } from 'react';
import { Bell, Check, X, Filter, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'update';
  time: string;
  read: boolean;
  category: 'system' | 'content' | 'social' | 'promotion';
}

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New audiobook added',
      message: 'The Essential Collection for Young Readers by Ruskin Bond is now available in your library.',
      type: 'update',
      time: '2 hours ago',
      read: false,
      category: 'content'
    },
    {
      id: 2,
      title: 'Download complete',
      message: 'Your download of "The Malgudi Days" has finished successfully.',
      type: 'success',
      time: '4 hours ago',
      read: false,
      category: 'system'
    },
    {
      id: 3,
      title: 'Premium trial ending',
      message: 'Your premium trial ends in 3 days. Upgrade now to continue enjoying unlimited access.',
      type: 'warning',
      time: '1 day ago',
      read: true,
      category: 'promotion'
    },
    {
      id: 4,
      title: 'New playlist created',
      message: 'You successfully created a new playlist "My Favorites".',
      type: 'info',
      time: '2 days ago',
      read: true,
      category: 'system'
    },
    {
      id: 5,
      title: 'System maintenance',
      message: 'We will be performing scheduled maintenance on Sunday from 2-4 AM. Some features may be temporarily unavailable.',
      type: 'info',
      time: '3 days ago',
      read: true,
      category: 'system'
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'update': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || notif.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
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
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Notifications</h1>
              <p className="text-text-secondary mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button 
              onClick={markAllAsRead}
              variant="outline"
              className="border-2 border-theta-purple text-theta-purple hover:bg-theta-purple hover:text-white"
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <Input
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-surface-mid border-2 border-border focus:border-theta-purple"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-48 bg-surface-mid border-2 border-border">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All notifications</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="update">Update</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-surface-mid">
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="content">Content ({notifications.filter(n => n.category === 'content').length})</TabsTrigger>
            <TabsTrigger value="system">System ({notifications.filter(n => n.category === 'system').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={cn(
                    "border-2 transition-all duration-200 hover:shadow-lg",
                    notification.read 
                      ? "bg-surface-mid border-border" 
                      : "bg-surface-elevated border-theta-purple shadow-md"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge 
                            variant="secondary" 
                            className={cn("text-xs font-medium", getTypeColor(notification.type))}
                          >
                            {notification.type}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-theta-purple rounded-full"></div>
                          )}
                        </div>
                        <h3 className="font-semibold text-foreground text-lg mb-2">
                          {notification.title}
                        </h3>
                        <p className="text-text-secondary mb-3">
                          {notification.message}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {notification.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                            className="text-theta-purple hover:bg-theta-purple/10"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-500 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredNotifications.length === 0 && (
                <Card className="border-2 border-border">
                  <CardContent className="p-12 text-center">
                    <Bell className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No notifications found</h3>
                    <p className="text-text-secondary">
                      {searchQuery || filterType !== 'all' 
                        ? 'Try adjusting your search or filter criteria.'
                        : 'You\'re all caught up! New notifications will appear here.'
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="unread" className="mt-6">
            <div className="space-y-4">
              {filteredNotifications.filter(n => !n.read).map((notification) => (
                <Card 
                  key={notification.id} 
                  className="bg-surface-elevated border-2 border-theta-purple shadow-md transition-all duration-200 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge 
                            variant="secondary" 
                            className={cn("text-xs font-medium", getTypeColor(notification.type))}
                          >
                            {notification.type}
                          </Badge>
                          <div className="w-2 h-2 bg-theta-purple rounded-full"></div>
                        </div>
                        <h3 className="font-semibold text-foreground text-lg mb-2">
                          {notification.title}
                        </h3>
                        <p className="text-text-secondary mb-3">
                          {notification.message}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {notification.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                          className="text-theta-purple hover:bg-theta-purple/10"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-500 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredNotifications.filter(n => !n.read).length === 0 && (
                <Card className="border-2 border-border">
                  <CardContent className="p-12 text-center">
                    <Bell className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No unread notifications</h3>
                    <p className="text-text-secondary">You're all caught up!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            <div className="space-y-4">
              {filteredNotifications.filter(n => n.category === 'content').map((notification) => (
                <Card 
                  key={notification.id} 
                  className={cn(
                    "border-2 transition-all duration-200 hover:shadow-lg",
                    notification.read 
                      ? "bg-surface-mid border-border" 
                      : "bg-surface-elevated border-theta-purple shadow-md"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge 
                            variant="secondary" 
                            className={cn("text-xs font-medium", getTypeColor(notification.type))}
                          >
                            {notification.type}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-theta-purple rounded-full"></div>
                          )}
                        </div>
                        <h3 className="font-semibold text-foreground text-lg mb-2">
                          {notification.title}
                        </h3>
                        <p className="text-text-secondary mb-3">
                          {notification.message}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {notification.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                            className="text-theta-purple hover:bg-theta-purple/10"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-500 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="system" className="mt-6">
            <div className="space-y-4">
              {filteredNotifications.filter(n => n.category === 'system').map((notification) => (
                <Card 
                  key={notification.id} 
                  className={cn(
                    "border-2 transition-all duration-200 hover:shadow-lg",
                    notification.read 
                      ? "bg-surface-mid border-border" 
                      : "bg-surface-elevated border-theta-purple shadow-md"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge 
                            variant="secondary" 
                            className={cn("text-xs font-medium", getTypeColor(notification.type))}
                          >
                            {notification.type}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-theta-purple rounded-full"></div>
                          )}
                        </div>
                        <h3 className="font-semibold text-foreground text-lg mb-2">
                          {notification.title}
                        </h3>
                        <p className="text-text-secondary mb-3">
                          {notification.message}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {notification.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                            className="text-theta-purple hover:bg-theta-purple/10"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-500 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Notifications;
