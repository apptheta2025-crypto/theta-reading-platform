import { MediaItem } from '@/contexts/PlayerContext';

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
    type: 'audiobook',
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