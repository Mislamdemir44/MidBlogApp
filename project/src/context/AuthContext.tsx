import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string) => Promise<boolean>;
  isAdmin: () => boolean;
  isModerator: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing user session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('mid_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call with mock data
    try {
      // In a real app, this would be an API call to validate credentials
      const user = users.find(u => u.username === username);
      
      // Simple mock authentication (in a real app, you'd verify password here)
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('mid_user', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('mid_user');
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    // Simulate user registration
    try {
      // Check if username already exists
      if (users.some(u => u.username === username)) {
        return false;
      }
      
      // In a real app, this would create a new user in the database
      const newUser: User = {
        id: String(users.length + 1),
        username,
        avatar: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=150',
        role: UserRole.USER,
        createdAt: new Date().toISOString()
      };
      
      // Add to mock users (in a real app, this would be saved to the database)
      users.push(newUser);
      
      // Automatically log in after registration
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('mid_user', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const isAdmin = () => {
    return currentUser?.role === UserRole.ADMIN;
  };

  const isModerator = () => {
    return currentUser?.role === UserRole.MODERATOR || currentUser?.role === UserRole.ADMIN;
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated, 
      login, 
      logout, 
      register,
      isAdmin,
      isModerator
    }}>
      {children}
    </AuthContext.Provider>
  );
};