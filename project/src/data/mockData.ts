import { User, Post, Comment, Category, UserRole } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: UserRole.ADMIN,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    username: 'moderator',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: UserRole.MODERATOR,
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    username: 'johnsmith',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150', 
    role: UserRole.USER,
    createdAt: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    username: 'sarahjones',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: UserRole.USER,
    createdAt: '2024-01-04T00:00:00Z'
  }
];

// Mock Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Technology',
    description: 'Latest tech news and reviews'
  },
  {
    id: '2',
    name: 'Travel',
    description: 'Explore the world through stories and photos'
  },
  {
    id: '3',
    name: 'Food',
    description: 'Recipes, restaurant reviews, and culinary adventures'
  },
  {
    id: '4',
    name: 'Lifestyle',
    description: 'Health, wellness, and personal growth'
  }
];

// Mock Comments
export const comments: Comment[] = [
  {
    id: '1',
    content: 'Great post! Really enjoyed reading this.',
    userId: '3',
    user: users[2],
    postId: '1',
    likes: ['2', '4'],
    createdAt: '2024-05-10T10:30:00Z',
    replies: []
  },
  {
    id: '2',
    content: 'This is really insightful, thanks for sharing!',
    userId: '4',
    user: users[3],
    postId: '1',
    likes: ['1'],
    createdAt: '2024-05-10T11:15:00Z',
    replies: []
  },
  {
    id: '3',
    content: 'I have a question about this. Can you elaborate?',
    userId: '3',
    user: users[2],
    postId: '2',
    likes: [],
    createdAt: '2024-05-11T09:45:00Z',
    replies: [
      {
        id: '4',
        content: 'Sure! What would you like to know specifically?',
        userId: '1',
        user: users[0],
        postId: '2',
        parentId: '3',
        likes: ['3'],
        createdAt: '2024-05-11T10:20:00Z'
      }
    ]
  }
];

// Mock Posts
export const posts: Post[] = [
  {
    id: '1',
    title: 'The Future of AI',
    content: 'Artificial intelligence is rapidly transforming our world. From self-driving cars to advanced medical diagnostics, AI is revolutionizing industries across the globe.',
    imageUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    categoryId: '1',
    userId: '1',
    user: users[0],
    likes: ['2', '3', '4'],
    comments: [comments[0], comments[1]],
    createdAt: '2024-05-10T09:00:00Z'
  },
  {
    id: '2',
    title: 'Hidden Gems of Japan',
    content: 'Beyond the bustling streets of Tokyo and the serene temples of Kyoto, Japan offers countless lesser-known destinations that are equally captivating.',
    imageUrl: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    categoryId: '2',
    userId: '2',
    user: users[1],
    likes: ['1', '3'],
    comments: [comments[2]],
    createdAt: '2024-05-11T08:30:00Z'
  },
  {
    id: '3',
    title: 'Vegan Recipes for Beginners',
    content: "Embarking on a plant-based journey doesn't have to be complicated. Here are some simple, delicious vegan recipes that anyone can prepare.",
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    categoryId: '3',
    userId: '3',
    user: users[2],
    likes: ['2', '4'],
    comments: [],
    createdAt: '2024-05-12T14:45:00Z'
  },
  {
    id: '4',
    title: 'Mindfulness Practices for Daily Life',
    content: 'Incorporating mindfulness into your daily routine can significantly improve your mental well-being. Learn simple techniques to stay present and grounded.',
    imageUrl: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    categoryId: '4',
    userId: '4',
    user: users[3],
    likes: ['1'],
    comments: [],
    createdAt: '2024-05-13T11:20:00Z'
  }
];