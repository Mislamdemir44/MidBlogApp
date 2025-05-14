import React from 'react';
import { usePost } from '../../context/PostContext';
import PostCard from '../post/PostCard';

const FeedList: React.FC = () => {
  const { posts, selectedCategory } = usePost();
  
  // Filter posts based on selected category
  const filteredPosts = selectedCategory
    ? posts.filter(post => post.categoryId === selectedCategory)
    : posts;
  
  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No posts found in this category.</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto py-6">
      {filteredPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FeedList;