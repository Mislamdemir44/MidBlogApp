import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, PlusSquare, User as UserIcon, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          M_İ_D
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center max-w-md w-full bg-gray-100 rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search posts..."
            className="ml-2 bg-transparent focus:outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-gray-700 hover:text-black p-2 rounded-md transition duration-200">
            <Home size={24} />
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/create" className="text-gray-700 hover:text-black p-2 rounded-md transition duration-200">
                <PlusSquare size={24} />
              </Link>
              
              <div className="relative group">
                <button className="flex items-center p-1">
                  {currentUser?.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.username} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon size={24} />
                  )}
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    Signed in as <span className="font-medium">{currentUser?.username}</span>
                  </div>
                  <Link 
                    to={`/profile/${currentUser?.id}`} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-gray-800 font-medium hover:bg-gray-100 px-4 py-2 rounded-md">
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-500 text-white font-medium hover:bg-blue-600 px-4 py-2 rounded-md">
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16">
          <div className="p-4">
            {/* Search Bar - Mobile */}
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-6">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search posts..."
                className="ml-2 bg-transparent focus:outline-none w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* Navigation Links - Mobile */}
            <div className="space-y-4">
              <Link 
                to="/" 
                className="flex items-center text-gray-700 hover:text-black p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home size={24} className="mr-3" />
                <span className="text-lg">Home</span>
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/create" 
                    className="flex items-center text-gray-700 hover:text-black p-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <PlusSquare size={24} className="mr-3" />
                    <span className="text-lg">Create Post</span>
                  </Link>
                  
                  <Link 
                    to={`/profile/${currentUser?.id}`} 
                    className="flex items-center text-gray-700 hover:text-black p-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <UserIcon size={24} className="mr-3" />
                    <span className="text-lg">Profile</span>
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-black p-2 w-full"
                  >
                    <LogOut size={24} className="mr-3" />
                    <span className="text-lg">Sign out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block text-center bg-gray-100 hover:bg-gray-200 py-3 rounded-md text-gray-800 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="block text-center bg-blue-500 hover:bg-blue-600 py-3 rounded-md text-white font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;