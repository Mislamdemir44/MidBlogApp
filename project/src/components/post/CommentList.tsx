import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Reply, MoreHorizontal } from 'lucide-react';
import { Comment } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { usePost } from '../../context/PostContext';
import CommentForm from './CommentForm';

interface CommentListProps {
  comments: Comment[];
  postId: string;
}

const CommentItem: React.FC<{ 
  comment: Comment; 
  postId: string;
  isReply?: boolean;
}> = ({ comment, postId, isReply = false }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { isAuthenticated, currentUser, isAdmin, isModerator } = useAuth();
  const { likeComment, unlikeComment } = usePost();
  
  const isLiked = currentUser ? comment.likes.includes(currentUser.id) : false;
  
  const handleLikeToggle = () => {
    if (!isAuthenticated || !currentUser) return;
    
    if (isLiked) {
      unlikeComment(postId, comment.id);
    } else {
      likeComment(postId, comment.id);
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

  return (
    <div className={`${isReply ? 'ml-8 mt-3' : 'mt-4'} ${isReply ? 'border-l-2 border-gray-200 pl-3' : ''}`}>
      <div className="flex">
        <Link to={`/profile/${comment.user.id}`} className="shrink-0">
          <img 
            src={comment.user.avatar}
            alt={comment.user.username}
            className="w-8 h-8 rounded-full object-cover"
          />
        </Link>
        
        <div className="ml-3 flex-1">
          <div className="bg-gray-100 rounded-xl px-3 py-2">
            <div className="flex items-center justify-between">
              <Link to={`/profile/${comment.user.id}`} className="font-medium text-sm hover:underline">
                {comment.user.username}
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-1 text-gray-500 hover:text-gray-700 rounded-full"
                >
                  <MoreHorizontal size={16} />
                </button>
                
                {showOptions && (
                  <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 z-10">
                    {(isAdmin() || isModerator() || (currentUser && currentUser.id === comment.user.id)) && (
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={() => setShowOptions(false)}
                      >
                        Delete Comment
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-800 mt-1">{comment.content}</p>
          </div>
          
          <div className="flex items-center mt-1 text-xs">
            <span className="text-gray-500">{formatDate(comment.createdAt)}</span>
            
            <button 
              onClick={handleLikeToggle}
              className={`ml-4 flex items-center ${isAuthenticated ? 'hover:text-red-500' : ''} ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
              disabled={!isAuthenticated}
            >
              <Heart size={14} className={isLiked ? 'fill-current' : ''} />
              <span className="ml-1">{comment.likes.length > 0 ? comment.likes.length : ''}</span>
            </button>
            
            {isAuthenticated && !isReply && (
              <button 
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="ml-4 flex items-center text-gray-500 hover:text-blue-500"
              >
                <Reply size={14} />
                <span className="ml-1">Reply</span>
              </button>
            )}
          </div>
          
          {showReplyForm && (
            <div className="mt-2">
              <CommentForm postId={postId} parentCommentId={comment.id} onSubmitSuccess={() => setShowReplyForm(false)} />
            </div>
          )}
          
          {/* Render replies if any */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              {comment.replies.map(reply => (
                <CommentItem 
                  key={reply.id} 
                  comment={reply} 
                  postId={postId} 
                  isReply={true} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentList: React.FC<CommentListProps> = ({ comments, postId }) => {
  if (comments.length === 0) {
    return <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>;
  }
  
  return (
    <div>
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} postId={postId} />
      ))}
    </div>
  );
};

export default CommentList;