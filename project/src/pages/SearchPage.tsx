import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import Header from '../components/layout/Header';
import PostCard from '../components/post/PostCard';
import { usePost } from '../context/PostContext';
import { Post } from '../types';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchPosts } = usePost();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  
  // Extract query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      const results = searchPosts(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [location.search, searchPosts]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
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
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Search Posts</h1>
          
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-lg shadow-sm px-4 py-3">
            <Search size={20} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search for posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
            >
              Search
            </button>
          </form>
        </div>
        
        <div>
          {searchQuery && (
            <h2 className="text-lg font-medium mb-4">
              {searchResults.length === 0 
                ? 'No results found' 
                : `Search results for "${searchQuery}"`}
            </h2>
          )}
          
          {searchResults.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
          
          {searchQuery && searchResults.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">No posts matching your search criteria.</p>
              <p className="text-gray-500 mt-2">Try different keywords or browse all posts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;