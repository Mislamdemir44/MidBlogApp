import React from 'react';
import Header from '../components/layout/Header';
import CategoryBar from '../components/layout/CategoryBar';
import FeedList from '../components/home/FeedList';
import { PostProvider } from '../context/PostContext';

const HomePage: React.FC = () => {
  return (
    <PostProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <CategoryBar />
        <main className="container mx-auto px-4">
          <FeedList />
        </main>
      </div>
    </PostProvider>
  );
};

export default HomePage;