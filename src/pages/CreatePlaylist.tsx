import React, { useState } from 'react';
import { Plus, Search, Music, Book, Headphones, ArrowLeft, Save, X, Play, Heart, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { allContent } from '@/data/mockData';
import { cn } from '@/lib/utils';

const CreatePlaylist: React.FC = () => {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [playlistType, setPlaylistType] = useState<'playlist' | 'reading-list'>('playlist');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('browse');

  const playlistTypes = [
    {
      id: 'playlist',
      name: 'Audio Playlist',
      description: 'Create a playlist of audiobooks and podcasts',
      icon: Music,
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      id: 'reading-list',
      name: 'Reading List',
      description: 'Create a reading list of ebooks and articles',
      icon: Book,
      color: 'bg-green-500/20 text-green-400'
    }
  ];

  const filteredContent = allContent.filter(item => {
    const matchesType = playlistType === 'playlist' 
      ? ['audiobook', 'podcast'].includes(item.type)
      : ['ebook'].includes(item.type);
    
    const matchesSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  const selectedItemsData = allContent.filter(item => selectedItems.includes(item.id));

  const handleToggleItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSavePlaylist = () => {
    if (!playlistName.trim()) return;
    
    // Here you would typically save to your backend
    console.log('Saving playlist:', {
      name: playlistName,
      description: playlistDescription,
      type: playlistType,
      items: selectedItemsData
    });
    
    // Reset form
    setPlaylistName('');
    setPlaylistDescription('');
    setSelectedItems([]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audiobook':
      case 'podcast':
        return <Headphones className="w-4 h-4" />;
      case 'ebook':
        return <Book className="w-4 h-4" />;
      default:
        return <Music className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'audiobook':
        return 'bg-blue-500/20 text-blue-400';
      case 'podcast':
        return 'bg-purple-500/20 text-purple-400';
      case 'ebook':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <main className="relative min-h-screen">
      {/* Header */}
      <div className="glass-panel p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-glow rounded-2xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Create New</h1>
              <p className="text-text-secondary">Build your perfect collection</p>
            </div>
          </div>
        </div>

        {/* Playlist Type Selection */}
        <div className="flex gap-4 mb-6">
          {playlistTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.id}
                className={cn(
                  "glass-tile border-white/10 cursor-pointer transition-all duration-300 flex-1",
                  playlistType === type.id 
                    ? "border-accent-primary/50 bg-accent-primary/10" 
                    : "hover:bg-white/10"
                )}
                onClick={() => setPlaylistType(type.id as 'playlist' | 'reading-list')}
              >
                <CardContent className="p-6 text-center">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3", type.color)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{type.name}</h3>
                  <p className="text-sm text-text-secondary">{type.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Playlist Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {playlistType === 'playlist' ? 'Playlist' : 'Reading List'} Name
            </label>
            <Input
              placeholder={`Enter ${playlistType === 'playlist' ? 'playlist' : 'reading list'} name...`}
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="glass-input bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description (Optional)
            </label>
            <Textarea
              placeholder="Add a description..."
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e.target.value)}
              className="glass-input bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl min-h-[40px]"
            />
          </div>
        </div>
      </div>

      <div className="px-6 space-y-8">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="glass-panel p-2">
            <TabsList className="bg-transparent w-full justify-start">
              <TabsTrigger 
                value="browse" 
                className="tab-trigger data-[state=active]:bg-accent-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-primary/25 px-6 py-3 rounded-xl transition-all duration-300"
              >
                Browse Library
              </TabsTrigger>
              <TabsTrigger 
                value="selected" 
                className="tab-trigger data-[state=active]:bg-accent-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent-primary/25 px-6 py-3 rounded-xl transition-all duration-300"
              >
                Selected Items ({selectedItems.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Browse Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Search */}
            <div className="glass-panel p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <Input
                  type="search"
                  placeholder={`Search ${playlistType === 'playlist' ? 'audiobooks and podcasts' : 'ebooks'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-foreground placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContent.map((item, index) => (
                <Card
                  key={item.id}
                  className={cn(
                    "glass-tile cursor-pointer transition-all duration-300",
                    selectedItems.includes(item.id) 
                      ? "border-accent-primary/50 bg-accent-primary/10 scale-105" 
                      : "hover:bg-white/10 hover:scale-105"
                  )}
                  onClick={() => handleToggleItem(item.id)}
                >
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={item.cover}
                        alt={`${item.title} cover`}
                        className="w-full aspect-square object-cover rounded-2xl"
                      />
                      <div className="absolute top-2 right-2">
                        {selectedItems.includes(item.id) ? (
                          <div className="w-8 h-8 bg-accent-primary rounded-full flex items-center justify-center">
                            <X className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Plus className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground text-sm line-clamp-2">{item.title}</h3>
                      <p className="text-xs text-text-secondary line-clamp-1">{item.author}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={cn("text-xs", getTypeColor(item.type))}>
                          {getTypeIcon(item.type)}
                          <span className="ml-1">{item.type}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Selected Items Tab */}
          <TabsContent value="selected" className="space-y-6">
            {selectedItemsData.length > 0 ? (
              <div className="space-y-4">
                {selectedItemsData.map((item, index) => (
                  <Card key={item.id} className="glass-tile border-white/10 bg-white/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.cover}
                          alt={`${item.title} cover`}
                          className="w-16 h-16 rounded-2xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                          <p className="text-sm text-text-secondary truncate">{item.author}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={cn("text-xs", getTypeColor(item.type))}>
                              {getTypeIcon(item.type)}
                              <span className="ml-1">{item.type}</span>
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleItem(item.id)}
                            className="text-text-secondary hover:text-foreground"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="glass-panel text-center py-16">
                <div className="w-24 h-24 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Plus className="w-12 h-12 text-accent-primary/60" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No items selected</h3>
                <p className="text-text-secondary">
                  Browse the library and add items to your {playlistType === 'playlist' ? 'playlist' : 'reading list'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {playlistName || `Untitled ${playlistType === 'playlist' ? 'Playlist' : 'Reading List'}`}
              </h3>
              <p className="text-text-secondary">
                {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
            <Button
              onClick={handleSavePlaylist}
              disabled={!playlistName.trim() || selectedItems.length === 0}
              className="bg-accent-primary hover:bg-accent-glow text-white px-8 py-3 rounded-2xl font-semibold shadow-lg shadow-accent-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5 mr-2" />
              Save {playlistType === 'playlist' ? 'Playlist' : 'Reading List'}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreatePlaylist;
