import { MediaItem } from '@/contexts/PlayerContext';

// Extended interface for detailed ebook information
export interface EbookDetails extends MediaItem {
  description: string;
  rating: number;
  totalReviews: number;
  totalPages: number;
  genre: string[];
  language: string;
  publishDate: string;
  isbn?: string;
  pdfUrl?: string;
  reviews?: {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

// Mock data for the app
export const mockBooks: MediaItem[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    duration: 3600, // 1 hour
    type: 'ebook',
    progress: 45
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    duration: 7200, // 2 hours
    type: 'ebook',
    progress: 23
  },
  {
    id: '3',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    duration: 5400, // 1.5 hours
    type: 'audiobook',
    progress: 67
  },
  {
    id: '4',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    cover: 'https://images.unsplash.com/photo-1471023492936-306aae14d87b?w=400&h=600&fit=crop',
    duration: 4800, // 1.3 hours
    type: 'ebook',
    progress: 12
  },
  {
    id: '5',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
    duration: 3000, // 50 minutes
    type: 'audiobook'
  }
];

// Detailed ebook information
export const mockEbookDetails: EbookDetails[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    duration: 3600,
    type: 'ebook',
    progress: 45,
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?',
    rating: 4.2,
    totalReviews: 1250,
    totalPages: 304,
    genre: ['Fiction', 'Fantasy', 'Philosophy'],
    language: 'English',
    publishDate: '2020-08-13',
    isbn: '978-0-525-55847-3',
    pdfUrl: '/The_Essential_Collection_for_Young_Readers_-_Ruskin_Bond.pdf',
    reviews: [
      {
        id: 'r1',
        user: 'Sarah M.',
        rating: 5,
        comment: 'A beautifully written exploration of life, choices, and what-ifs. Matt Haig has created something truly special here.',
        date: '2024-01-15'
      },
      {
        id: 'r2',
        user: 'David K.',
        rating: 4,
        comment: 'Thought-provoking and emotional. The concept is brilliant, though it gets a bit repetitive in the middle.',
        date: '2024-01-10'
      },
      {
        id: 'r3',
        user: 'Emma L.',
        rating: 5,
        comment: 'This book changed my perspective on life. Absolutely loved every page.',
        date: '2024-01-08'
      }
    ]
  },
  {
    id: '4',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    cover: 'https://images.unsplash.com/photo-1471023492936-306aae14d87b?w=400&h=600&fit=crop',
    duration: 4800,
    type: 'ebook',
    progress: 12,
    description: 'From a renowned historian comes a groundbreaking narrative of humanity\'s creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be "human."',
    rating: 4.6,
    totalReviews: 2100,
    totalPages: 443,
    genre: ['History', 'Anthropology', 'Science'],
    language: 'English',
    publishDate: '2014-02-10',
    isbn: '978-0-06-231609-7',
    pdfUrl: '/The_Essential_Collection_for_Young_Readers_-_Ruskin_Bond.pdf',
    reviews: [
      {
        id: 'r4',
        user: 'Michael R.',
        rating: 5,
        comment: 'Mind-blowing book that completely changed how I think about human history and our place in the world.',
        date: '2024-01-20'
      },
      {
        id: 'r5',
        user: 'Lisa T.',
        rating: 4,
        comment: 'Fascinating read, though some of the conclusions are controversial. Still highly recommend.',
        date: '2024-01-18'
      }
    ]
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    duration: 7200,
    type: 'ebook',
    progress: 23,
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    rating: 4.8,
    totalReviews: 3400,
    totalPages: 320,
    genre: ['Self-Help', 'Psychology', 'Business'],
    language: 'English',
    publishDate: '2018-10-16',
    isbn: '978-0-7352-1129-2',
    pdfUrl: '/The_Essential_Collection_for_Young_Readers_-_Ruskin_Bond.pdf',
    reviews: [
      {
        id: 'r6',
        user: 'John P.',
        rating: 5,
        comment: 'This book literally changed my life. The 1% rule is so simple yet powerful.',
        date: '2024-01-22'
      },
      {
        id: 'r7',
        user: 'Anna S.',
        rating: 5,
        comment: 'Clear, actionable advice that actually works. I\'ve implemented several strategies from this book.',
        date: '2024-01-19'
      }
    ]
  },
  {
    id: 'rb1',
    title: 'The Essential Collection for Young Readers',
    author: 'Ruskin Bond',
    cover: '/book banner.jpg',
    duration: 5400, // 1.5 hours
    type: 'ebook',
    progress: 0,
    description: 'A timeless collection of Ruskin Bond\'s most beloved stories for young readers. This essential anthology brings together his finest tales of friendship, adventure, and the simple joys of life in the mountains. From the charming adventures of Rusty to the heartwarming stories of children discovering the magic of nature, this collection is a perfect introduction to one of India\'s most cherished storytellers.',
    rating: 4.9,
    totalReviews: 850,
    totalPages: 149,
    genre: ['Children\'s Literature', 'Fiction', 'Adventure'],
    language: 'English',
    publishDate: '2020-03-15',
    isbn: '978-81-291-4567-8',
    pdfUrl: '/The_Essential_Collection_for_Young_Readers_-_Ruskin_Bond.pdf',
    reviews: [
      {
        id: 'rb1',
        user: 'Priya S.',
        rating: 5,
        comment: 'My children absolutely love these stories! Ruskin Bond has a magical way of bringing the mountains to life.',
        date: '2024-01-20'
      },
      {
        id: 'rb2',
        user: 'Rahul K.',
        rating: 5,
        comment: 'A perfect collection for young readers. The stories are timeless and beautifully written.',
        date: '2024-01-18'
      },
      {
        id: 'rb3',
        user: 'Meera P.',
        rating: 4,
        comment: 'Wonderful stories that capture the essence of childhood and nature. Highly recommended for kids and adults alike.',
        date: '2024-01-15'
      }
    ]
  },
  {
    id: 'rb1-audio',
    title: 'The Essential Collection for Young Readers (Audiobook)',
    author: 'Ruskin Bond',
    cover: '/book banner.jpg',
    duration: 5400, // 1.5 hours
    type: 'audiobook',
    progress: 0,
    description: 'A timeless collection of Ruskin Bond\'s most beloved stories for young readers. This essential anthology brings together his finest tales of friendship, adventure, and the simple joys of life in the mountains. From the charming adventures of Rusty to the heartwarming stories of children discovering the magic of nature, this collection is a perfect introduction to one of India\'s most cherished storytellers.',
    rating: 4.9,
    totalReviews: 850,
    totalPages: 149,
    genre: ['Children\'s Literature', 'Fiction', 'Adventure'],
    language: 'English',
    publishDate: '2020-03-15',
    isbn: '978-81-291-4567-8',
    audioUrl: '/Ruskin%20Bond%20Essentizls%20to%20Life/RuskinBondTheEssentialCollectionforYoungReaders_ep6.mp3',
    reviews: [
      {
        id: 'rb1-audio-1',
        user: 'Priya S.',
        rating: 5,
        comment: 'The audiobook version is amazing! Perfect for bedtime stories and long car rides.',
        date: '2024-01-20'
      },
      {
        id: 'rb1-audio-2',
        user: 'Rahul K.',
        rating: 5,
        comment: 'Narrated beautifully. The voice brings Ruskin Bond\'s stories to life in a whole new way.',
        date: '2024-01-18'
      }
    ]
  },
  {
    id: 'rb1-audio',
    title: 'The Essential Collection for Young Readers (Audiobook)',
    author: 'Ruskin Bond',
    cover: '/book banner.jpg',
    duration: 5400, // 1.5 hours
    type: 'audiobook',
    progress: 0,
    description: 'A timeless collection of Ruskin Bond\'s most beloved stories for young readers. This essential anthology brings together his finest tales of friendship, adventure, and the simple joys of life in the mountains. From the charming adventures of Rusty to the heartwarming stories of children discovering the magic of nature, this collection is a perfect introduction to one of India\'s most cherished storytellers.',
    rating: 4.9,
    totalReviews: 850,
    totalPages: 149,
    genre: ['Children\'s Literature', 'Fiction', 'Adventure'],
    language: 'English',
    publishDate: '2020-03-15',
    isbn: '978-81-291-4567-8',
    audioUrl: '/Ruskin%20Bond%20Essentizls%20to%20Life/RuskinBondTheEssentialCollectionforYoungReaders_ep6.mp3',
    reviews: [
      {
        id: 'rb1-audio-1',
        user: 'Priya S.',
        rating: 5,
        comment: 'The audiobook version is amazing! Perfect for bedtime stories and long car rides.',
        date: '2024-01-20'
      },
      {
        id: 'rb1-audio-2',
        user: 'Rahul K.',
        rating: 5,
        comment: 'Narrated beautifully. The voice brings Ruskin Bond\'s stories to life in a whole new way.',
        date: '2024-01-18'
      }
    ]
  }
];

export const mockPodcasts: MediaItem[] = [
  {
    id: 'p1',
    title: 'The Daily',
    author: 'The New York Times',
    cover: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=600&fit=crop',
    duration: 1800, // 30 minutes
    type: 'podcast'
  },
  {
    id: 'p2',
    title: 'How I Built This',
    author: 'NPR',
    cover: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=600&fit=crop',
    duration: 2400, // 40 minutes
    type: 'podcast'
  },
  {
    id: 'p3',
    title: 'TED Talks Daily',
    author: 'TED',
    cover: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
    duration: 1200, // 20 minutes
    type: 'podcast'
  },
  {
    id: 'p4',
    title: 'Serial',
    author: 'Serial Productions',
    cover: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=600&fit=crop',
    duration: 3000, // 50 minutes
    type: 'podcast'
  }
];

export const mockEducationalContent: MediaItem[] = [
  {
    id: 'e1',
    title: 'Introduction to Physics',
    author: 'Khan Academy',
    cover: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=600&fit=crop',
    duration: 2700, // 45 minutes
    type: 'audiobook'
  },
  {
    id: 'e2',
    title: 'Mathematics Fundamentals',
    author: 'MIT OpenCourseWare',
    cover: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=600&fit=crop',
    duration: 3600, // 1 hour
    type: 'ebook'
  },
  {
    id: 'e3',
    title: 'World History Overview',
    author: 'CrashCourse',
    cover: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=400&h=600&fit=crop',
    duration: 2100, // 35 minutes
    type: 'audiobook'
  },
  {
    id: 'e4',
    title: 'Biology Essentials',
    author: 'National Geographic',
    cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
    duration: 3300, // 55 minutes
    type: 'ebook'
  }
];

export const mockStudentContent: MediaItem[] = [
  {
    id: 's1',
    title: 'Grade 5 Math Adventures',
    author: 'Elementary Education',
    cover: 'https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?w=400&h=600&fit=crop',
    duration: 1800, // 30 minutes
    type: 'audiobook'
  },
  {
    id: 's2',
    title: 'Science for Kids',
    author: 'Young Scientists',
    cover: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=600&fit=crop',
    duration: 1500, // 25 minutes
    type: 'ebook'
  },
  {
    id: 's3',
    title: 'Reading Comprehension Grade 8',
    author: 'Middle School Press',
    cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    duration: 2400, // 40 minutes
    type: 'audiobook'
  },
  {
    id: 's4',
    title: 'High School Chemistry',
    author: 'Academic Publishers',
    cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=600&fit=crop',
    duration: 3000, // 50 minutes
    type: 'ebook'
  }
];

export const mockPopularLists = [
  {
    id: 'list1',
    title: 'Best of 2024',
    description: 'Most popular books this year',
    items: mockBooks.slice(0, 3),
    cover: mockBooks[0].cover
  },
  {
    id: 'list2',
    title: 'Business Essentials',
    description: 'Must-read business books',
    items: [mockBooks[1], mockBooks[2]],
    cover: mockBooks[1].cover
  }
];

// Combine all content for search and filtering
export const allContent = [
  ...mockBooks,
  ...mockPodcasts,
  ...mockEducationalContent,
  ...mockStudentContent
];