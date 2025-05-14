export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user'
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  role: UserRole;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  categoryId: string;
  userId: string;
  user: User;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  user: User;
  postId: string;
  parentId?: string;
  likes: string[];
  createdAt: string;
  replies?: Comment[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}