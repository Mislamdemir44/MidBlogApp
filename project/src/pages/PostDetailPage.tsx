import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Share2, Calendar, Tag } from 'lucide-react';
import Header from '../components/layout/Header';
import CommentForm from '../components/post/CommentForm';
import CommentList from '../components/post/CommentList';
import { usePost } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';

const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { getPostById, likePost, unlikePost, categories } = usePost();
  const { isAuthenticated, currentUser } = useAuth();
  const [post, setPost] = useState(postId ? getPostById(postId) : undefined);

  useEffect(() => {
    if (postId) {
      const foundPost = getPostById(postId);
      setPost(foundPost);
      
      if (!foundPost) {
        navigate('/');
      }
    }
  }, [postId, getPostById, navigate]);

  if (!post) {
    return null;
  }

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
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-3xl mx-auto py-8 px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Back</span>
        </button>
        
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Post Image */}
          {post.imageUrl && (
            <div className="relative h-72 sm:h-96">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
              <Link to={`/profile/${post.user.id}`} className="flex items-center group">
                <img 
                  src={post.user.avatar}
                  alt={post.user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <span className="font-medium group-hover:underline">{post.user.username}</span>
                </div>
              </Link>
              
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={16} className="mr-1" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
            
            {/* Post Title & Category */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{post.title}</h1>
            <div className="flex items-center mb-6">
              <Tag size={16} className="text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">{getCategoryName(post.categoryId)}</span>
            </div>
            
            {/* Post Content */}
            <div className="prose max-w-none mb-6">
              <p className="whitespace-pre-line">{post.content}</p>
            </div>
            
            {/* Post Actions */}
            <div className="flex items-center py-4 border-t border-b border-gray-100">
              <button 
                onClick={handleLikeToggle}
                className={`flex items-center mr-6 ${isAuthenticated ? 'hover:text-red-500' : ''} ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
                disabled={!isAuthenticated}
              >
                <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                <span className="ml-1">{post.likes.length}</span>
              </button>
              
              <button 
                onClick={() => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center mr-6 text-gray-600 hover:text-blue-500"
              >
                <MessageCircle size={20} />
                <span className="ml-1">{post.comments.length}</span>
              </button>
              
              <button className="flex items-center text-gray-600 hover:text-green-500">
                <Share2 size={20} />
              </button>
            </div>
          </div>
          
          {/* Comments Section */}
          <div id="comments-section" className="p-6 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            
            {isAuthenticated ? (
              <div className="mb-6">
                <CommentForm postId={post.id} />
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-6">
                <Link to="/login" className="text-blue-500 hover:underline">Sign in</Link> to leave a comment
              </p>
            )}
            
            <CommentList comments={post.comments} postId={post.id} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetailPage;