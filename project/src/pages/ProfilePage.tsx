import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User as UserIcon } from 'lucide-react';
import Header from '../components/layout/Header';
import PostCard from '../components/post/PostCard';
import { useAuth } from '../context/AuthContext';
import { usePost } from '../context/PostContext';
import { User, UserRole } from '../types';
import { users } from '../data/mockData';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { currentUser, isAdmin } = useAuth();
  const { posts } = usePost();
  
  const [profileUser, setProfileUser] = useState<User | undefined>(undefined);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  
  // Find the user and their posts
  useEffect(() => {
    if (userId) {
      const user = users.find(u => u.id === userId);
      setProfileUser(user);
      
      if (user) {
        const filteredPosts = posts.filter(post => post.userId === userId);
        setUserPosts(filteredPosts);
      } else {
        navigate('/');
      }
    }
  }, [userId, posts, navigate]);
  
  if (!profileUser) {
    return null;
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">Admin</span>;
      case UserRole.MODERATOR:
        return <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Moderator</span>;
      default:
        return null;
    }
  };
  
  const isOwnProfile = currentUser && currentUser.id === profileUser.id;
  
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
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32"></div>
          
          <div className="p-6 relative">
            {/* Profile Picture */}
            <div className="absolute -top-12 left-6 border-4 border-white rounded-full overflow-hidden">
              <img 
                src={profileUser.avatar} 
                alt={profileUser.username}
                className="w-24 h-24 object-cover"
              />
            </div>
            
            <div className="ml-32 flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold">{profileUser.username}</h1>
                  <div className="ml-2">
                    {getRoleBadge(profileUser.role)}
                  </div>
                </div>
                
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  <span>Joined on {formatDate(profileUser.createdAt)}</span>
                </div>
              </div>
              
              {isOwnProfile && (
                <Link
                  to="/settings"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200"
                >
                  Edit Profile
                </Link>
              )}
              
              {isAdmin() && !isOwnProfile && profileUser.role !== UserRole.ADMIN && (
                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-200">
                  {profileUser.role === UserRole.MODERATOR ? 'Remove Moderator' : 'Make Moderator'}
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Posts by {profileUser.username}</h2>
          
          {userPosts.length > 0 ? (
            userPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <UserIcon size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">
                {isOwnProfile ? "You haven't" : `${profileUser.username} hasn't`} posted anything yet.
              </p>
              {isOwnProfile && (
                <Link
                  to="/create"
                  className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
                >
                  Create your first post
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;