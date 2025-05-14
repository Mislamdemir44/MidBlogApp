import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePost } from '../../context/PostContext';

interface CommentFormProps {
  postId: string;
  parentCommentId?: string;
  onSubmitSuccess?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  postId, 
  parentCommentId,
  onSubmitSuccess 
}) => {
  const [content, setContent] = useState('');
  const { currentUser } = useAuth();
  const { addComment } = usePost();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || !currentUser) return;
    
    addComment(postId, content, parentCommentId);
    setContent('');
    
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex items-start">
      {currentUser && (
        <img 
          src={currentUser.avatar}
          alt={currentUser.username}
          className="w-8 h-8 rounded-full object-cover mr-3"
        />
      )}
      
      <div className="flex-1 relative">
        <textarea
          placeholder={parentCommentId ? "Write a reply..." : "Add a comment..."}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={2}
        />
        
        <button
          type="submit"
          disabled={!content.trim()}
          className={`absolute bottom-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${
            content.trim() 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } transition-colors duration-200`}
        >
          {parentCommentId ? 'Reply' : 'Post'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;