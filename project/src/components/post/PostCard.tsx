import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Post } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { usePost } from '../../context/PostContext';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const { isAuthenticated, currentUser, isAdmin, isModerator } = useAuth();
  const { likePost, unlikePost } = usePost();
  const [showOptions, setShowOptions] = useState(false);
  
  const isLiked = currentUser ? post.likes.includes(currentUser.id) : false;
  
  const handleLikeToggle = () => {
    if (!isAuthenticated || !currentUser) return;
    
    if (isLiked) {
      unlikePost(post.id);
    } else {
      likePost(post.id);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get category name
  const getCategoryName = () => {
    const categoryId = post.categoryId;
    const { categories } = usePost();
    return categories.find(cat => cat.id === categoryId)?.name || '';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md overflow-hidden mb-6 transition-shadow duration-300 hover:shadow-md">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <Link to={`/profile/${post.user.id}`} className="flex items-center group">
          <img 
            src={post.user.avatar}
            alt={post.user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <span className="font-medium group-hover:underline">{post.user.username}</span>
            <div className="flex items-center text-xs text-gray-500">
              <span>{formatDate(post.createdAt)}</span>
              <span className="mx-1">•</span>
              <span>{getCategoryName()}</span>
            </div>
          </div>
        </Link>
        
        <div className="relative">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <MoreHorizontal size={20} className="text-gray-600" />
          </button>
          
          {showOptions && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <Link 
                to={`/post/${post.id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowOptions(false)}
              >
                View Post
              </Link>
              
              {(isAdmin() || isModerator() || (currentUser && currentUser.id === post.user.id)) && (
                <Link 
                  to={`/edit-post/${post.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowOptions(false)}
                >
                  Edit Post
                </Link>
              )}
              
              {(isAdmin() || (currentUser && currentUser.id === post.user.id)) && (
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => setShowOptions(false)}
                >
                  Delete Post
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Post Title */}
      <div className="px-4 pb-2">
        <Link to={`/post/${post.id}`}>
          <h2 className="text-xl font-semibold hover:text-blue-600 transition-colors duration-200">
            {post.title}
          </h2>
        </Link>
      </div>
      
      {/* Post Image (if any) */}
      {post.imageUrl && (
        <div className="relative aspect-video">
          <Link to={`/post/${post.id}`}>
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      )}
      
      {/* Post Content Preview */}
      <div className="p-4">
        <p className="text-gray-800 line-clamp-3">{post.content}</p>
        {post.content.length > 200 && (
          <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline text-sm mt-2 inline-block">
            Read more
          </Link>
        )}
      </div>
      
      {/* Post Actions */}
      <div className="flex items-center px-4 py-2 border-t border-gray-100">
        <button 
          onClick={handleLikeToggle}
          className={`flex items-center mr-6 ${isAuthenticated ? 'hover:text-red-500' : ''} ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
          disabled={!isAuthenticated}
        >
          <Heart size={20} className={isLiked ? 'fill-current' : ''} />
          <span className="ml-1 text-sm">{post.likes.length}</span>
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center mr-6 text-gray-600 hover:text-blue-500"
        >
          <MessageCircle size={20} />
          <span className="ml-1 text-sm">{post.comments.length}</span>
        </button>
        
        <button className="flex items-center text-gray-600 hover:text-green-500">
          <Share2 size={20} />
        </button>
      </div>
      
      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100 p-4">
          {isAuthenticated ? (
            <CommentForm postId={post.id} />
          ) : (
            <p className="text-sm text-gray-500 mb-3">
              <Link to="/login" className="text-blue-500 hover:underline">Sign in</Link> to leave a comment
            </p>
          )}
          
          <CommentList comments={post.comments} postId={post.id} />
        </div>
      )}
    </div>
  );
};

export default PostCard;