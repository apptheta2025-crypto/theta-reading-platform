import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowLeft, BookOpen, Clock, Users, Calendar, Globe, Hash, Play, Download, Heart, Share2, MessageSquare } from 'lucide-react';
import { mockEbookDetails } from '@/data/mockData';
import { cn } from '@/lib/utils';

const EbookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  
  const ebook = mockEbookDetails.find(book => book.id === id);
  
  if (!ebook) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Book Not Found</h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleStartReading = () => {
    navigate(`/reader/${ebook.id}`);
  };

  return (
    <div className="px-6 py-6 pb-24">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-white hover:text-gray-300 hover:bg-[#404040] px-4 py-2 rounded-full text-sm font-inter font-medium transition-all duration-200 border border-[#404040]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Book Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Book Cover */}
          <div className="flex-shrink-0">
            <div className="relative overflow-hidden rounded-lg" style={{ width: '280px', height: '420px' }}>
              <img
                src={ebook.cover}
                alt={`${ebook.title} cover`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Book Info */}
          <div className="flex-1 space-y-6">
            {/* Title and Author */}
            <div>
              <h1 className="font-gilroy font-black text-white mb-2" style={{ fontSize: '48px' }}>
                {ebook.title}
              </h1>
              <p className="text-xl text-gray-300 mb-4">by {ebook.author}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(ebook.rating)}
                </div>
                <span className="text-lg font-semibold text-white">{ebook.rating}</span>
                <span className="text-gray-400">
                  ({ebook.totalReviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {ebook.genre.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white border border-white/20"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartReading}
                className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-3 rounded-full text-base transition-all duration-200"
                style={{ height: '48px' }}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Reading
              </Button>
              
              <Button
                variant="outline"
                className="border-[#404040] text-white hover:bg-[#404040] hover:text-white px-8 py-3 rounded-full text-base transition-all duration-200"
                style={{ height: '48px' }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download EPUB
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={cn(
                    "text-white hover:text-red-400 hover:bg-red-400/10 px-3 py-3 rounded-full",
                    isLiked && "text-red-400"
                  )}
                >
                  <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-gray-300 hover:bg-white/10 px-3 py-3 rounded-full"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Book Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{ebook.totalPages}</div>
                <div className="text-sm text-gray-400">Pages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{Math.floor(ebook.duration / 3600)}h {Math.floor((ebook.duration % 3600) / 60)}m</div>
                <div className="text-sm text-gray-400">Read Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{ebook.language}</div>
                <div className="text-sm text-gray-400">Language</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{new Date(ebook.publishDate).getFullYear()}</div>
                <div className="text-sm text-gray-400">Published</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-8">
        <h2 className="font-gilroy font-black text-white mb-4" style={{ fontSize: '32px' }}>
          About This Book
        </h2>
        <div className="bg-[#282828] rounded-2xl p-6">
          <p className="text-gray-300 leading-relaxed text-lg">{ebook.description}</p>
        </div>
      </div>

      {/* Additional Details */}
      <div className="mb-8">
        <h2 className="font-gilroy font-black text-white mb-4" style={{ fontSize: '32px' }}>
          Book Details
        </h2>
        <div className="bg-[#282828] rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Pages</p>
                <p className="font-semibold text-white text-lg">{ebook.totalPages}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Language</p>
                <p className="font-semibold text-white text-lg">{ebook.language}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Published</p>
                <p className="font-semibold text-white text-lg">{formatDate(ebook.publishDate)}</p>
              </div>
            </div>
            
            {ebook.isbn && (
              <div className="flex items-center gap-3">
                <Hash className="w-6 h-6 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">ISBN</p>
                  <p className="font-semibold text-white text-lg">{ebook.isbn}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {ebook.reviews && ebook.reviews.length > 0 && (
        <div className="mb-8">
          <h2 className="font-gilroy font-black text-white mb-4" style={{ fontSize: '32px' }}>
            Reviews ({ebook.totalReviews})
          </h2>
          <div className="bg-[#282828] rounded-2xl p-6">
            <div className="space-y-6">
              {ebook.reviews.map((review, index) => (
                <div key={review.id}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-white text-lg">{review.user}</span>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{formatDate(review.date)}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                  {index < ebook.reviews!.length - 1 && (
                    <div className="border-t border-gray-600 mt-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EbookDetail;
