import React, { useState } from 'react';
import { Plus, Play, Share, MoreHorizontal, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import MediaCard from '@/components/media/MediaCard';
import { mockBooks, mockPodcasts } from '@/data/mockData';

const mockPlaylists = [
  {
    id: 'p1',
    name: 'Morning Motivation',
    description: 'Start your day right with inspiring content',
    items: [...mockBooks.slice(0, 3), ...mockPodcasts.slice(0, 2)],
    cover: mockBooks[0].cover,
    isPublic: true
  },
  {
    id: 'p2',
    name: 'Business & Finance',
    description: 'Essential reading for entrepreneurs',
    items: [mockBooks[1], mockBooks[2], mockPodcasts[1]],
    cover: mockBooks[1].cover,
    isPublic: false
  },
  {
    id: 'p3',
    name: 'Evening Wind Down',
    description: 'Relaxing stories for bedtime',
    items: mockBooks.slice(3, 5),
    cover: mockBooks[3].cover,
    isPublic: true
  }
];

const Playlists: React.FC = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(mockPlaylists[0]);

  const handleShare = (playlist: typeof mockPlaylists[0]) => {
    // Mock share functionality
    navigator.clipboard?.writeText(`Check out my playlist: ${playlist.name}`);
  };

  return (
    <main className="pb-24 min-h-screen">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Your Playlists</h1>
          <Button className="bg-brand-primary hover:bg-brand-glow gap-2">
            <Plus className="w-4 h-4" />
            Create Playlist
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Playlists sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">All Playlists</h2>
            
            {mockPlaylists.map((playlist) => (
              <Card 
                key={playlist.id}
                className={`cursor-pointer transition-all duration-200 hover:bg-surface-mid ${
                  selectedPlaylist.id === playlist.id ? 'ring-2 ring-brand-primary' : ''
                }`}
                onClick={() => setSelectedPlaylist(playlist)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={playlist.cover}
                      alt={`${playlist.name} cover`}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {playlist.name}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {playlist.items.length} items
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {playlist.isPublic && (
                        <Share className="w-4 h-4 text-text-secondary" />
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleShare(playlist)}>
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected playlist content */}
          <div className="lg:col-span-8">
            {selectedPlaylist ? (
              <div className="space-y-6">
                {/* Playlist header */}
                <div className="flex items-start gap-6">
                  <img 
                    src={selectedPlaylist.cover}
                    alt={`${selectedPlaylist.name} cover`}
                    className="w-32 h-32 rounded-lg object-cover shadow-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {selectedPlaylist.name}
                    </h2>
                    <p className="text-text-secondary mb-4">
                      {selectedPlaylist.description}
                    </p>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm text-text-secondary">
                        {selectedPlaylist.items.length} items
                      </span>
                      <span className="text-sm text-text-secondary">
                        {selectedPlaylist.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button className="bg-brand-primary hover:bg-brand-glow gap-2">
                        <Play className="w-4 h-4" />
                        Play All
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleShare(selectedPlaylist)}
                        className="gap-2"
                      >
                        <Share className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Playlist items */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Items</h3>
                  
                  {selectedPlaylist.items.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {selectedPlaylist.items.map((item) => (
                        <MediaCard key={item.id} item={item} size="sm" />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-surface-mid rounded-lg">
                      <Music className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-50" />
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        Empty Playlist
                      </h4>
                      <p className="text-text-secondary mb-4">
                        Add some content to get started
                      </p>
                      <Button variant="outline">
                        Browse Content
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Select a Playlist
                </h3>
                <p className="text-text-secondary">
                  Choose a playlist from the sidebar to view its contents
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Playlists;