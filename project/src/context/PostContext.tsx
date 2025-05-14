import React, { createContext, useContext, useState, useEffect } from 'react';
import { Post, Comment, Category } from '../types';
import { posts as mockPosts, categories as mockCategories } from '../data/mockData';
import { useAuth } from './AuthContext';

interface PostContextType {
  posts: Post[];
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
  createPost: (post: Omit<Post, 'id' | 'user' | 'likes' | 'comments' | 'createdAt'>) => void;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  addComment: (postId: string, content: string, parentCommentId?: string) => void;
  likeComment: (postId: string, commentId: string) => void;
  unlikeComment: (postId: string, commentId: string) => void;
  getPostById: (postId: string) => Post | undefined;
  getPostsByCategory: (categoryId: string) => Post[];
  searchPosts: (query: string) => Post[];
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { currentUser } = useAuth();

  // Load data from localStorage if available
  useEffect(() => {
    const storedPosts = localStorage.getItem('mid_posts');
    const storedCategories = localStorage.getItem('mid_categories');
    
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      localStorage.setItem('mid_posts', JSON.stringify(mockPosts));
    }
    
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      localStorage.setItem('mid_categories', JSON.stringify(mockCategories));
    }
  }, []);

  // Save posts to localStorage when they change
  useEffect(() => {
    localStorage.setItem('mid_posts', JSON.stringify(posts));
  }, [posts]);

  // Create a new post
  const createPost = (postData: Omit<Post, 'id' | 'user' | 'likes' | 'comments' | 'createdAt'>) => {
    if (!currentUser) return;
    
    const newPost: Post = {
      id: String(Date.now()),
      ...postData,
      user: currentUser,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    };
    
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  // Like a post
  const likePost = (postId: string) => {
    if (!currentUser) return;
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId && !post.likes.includes(currentUser.id)) {
          return {
            ...post,
            likes: [...post.likes, currentUser.id]
          };
        }
        return post;
      })
    );
  };

  // Unlike a post
  const unlikePost = (postId: string) => {
    if (!currentUser) return;
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.likes.filter(id => id !== currentUser.id)
          };
        }
        return post;
      })
    );
  };

  // Add a comment to a post
  const addComment = (postId: string, content: string, parentCommentId?: string) => {
    if (!currentUser) return;
    
    const newComment: Comment = {
      id: String(Date.now()),
      content,
      userId: currentUser.id,
      user: currentUser,
      postId,
      parentId: parentCommentId,
      likes: [],
      createdAt: new Date().toISOString()
    };
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          // If it's a reply to another comment
          if (parentCommentId) {
            return {
              ...post,
              comments: post.comments.map(comment => {
                if (comment.id === parentCommentId) {
                  return {
                    ...comment,
                    replies: [...(comment.replies || []), newComment]
                  };
                }
                return comment;
              })
            };
          }
          
          // If it's a top-level comment
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
  };

  // Like a comment
  const likeComment = (postId: string, commentId: string) => {
    if (!currentUser) return;
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment => {
              // If it's the target comment
              if (comment.id === commentId && !comment.likes.includes(currentUser.id)) {
                return {
                  ...comment,
                  likes: [...comment.likes, currentUser.id]
                };
              }
              
              // If it might be in the replies
              if (comment.replies) {
                return {
                  ...comment,
                  replies: comment.replies.map(reply => {
                    if (reply.id === commentId && !reply.likes.includes(currentUser.id)) {
                      return {
                        ...reply,
                        likes: [...reply.likes, currentUser.id]
                      };
                    }
                    return reply;
                  })
                };
              }
              
              return comment;
            })
          };
        }
        return post;
      })
    );
  };

  // Unlike a comment
  const unlikeComment = (postId: string, commentId: string) => {
    if (!currentUser) return;
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment => {
              // If it's the target comment
              if (comment.id === commentId) {
                return {
                  ...comment,
                  likes: comment.likes.filter(id => id !== currentUser.id)
                };
              }
              
              // If it might be in the replies
              if (comment.replies) {
                return {
                  ...comment,
                  replies: comment.replies.map(reply => {
                    if (reply.id === commentId) {
                      return {
                        ...reply,
                        likes: reply.likes.filter(id => id !== currentUser.id)
                      };
                    }
                    return reply;
                  })
                };
              }
              
              return comment;
            })
          };
        }
        return post;
      })
    );
  };

  // Get a post by ID
  const getPostById = (postId: string) => {
    return posts.find(post => post.id === postId);
  };

  // Get posts by category
  const getPostsByCategory = (categoryId: string) => {
    return posts.filter(post => post.categoryId === categoryId);
  };

  // Search posts by title or content
  const searchPosts = (query: string) => {
    if (!query.trim()) return posts;
    
    const lowerCaseQuery = query.toLowerCase();
    return posts.filter(
      post => 
        post.title.toLowerCase().includes(lowerCaseQuery) || 
        post.content.toLowerCase().includes(lowerCaseQuery)
    );
  };

  return (
    <PostContext.Provider value={{
      posts,
      categories,
      selectedCategory,
      setSelectedCategory,
      createPost,
      likePost,
      unlikePost,
      addComment,
      likeComment,
      unlikeComment,
      getPostById,
      getPostsByCategory,
      searchPosts
    }}>
      {children}
    </PostContext.Provider>
  );
};