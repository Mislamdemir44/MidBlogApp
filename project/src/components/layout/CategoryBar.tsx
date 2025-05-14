import React from 'react';
import { usePost } from '../../context/PostContext';

const CategoryBar: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = usePost();
  
  return (
    <div className="border-b border-gray-200 bg-white sticky top-[61px] z-20">
      <div className="container mx-auto px-4 overflow-x-auto">
        <div className="flex space-x-4 py-3 whitespace-nowrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition duration-200 ${
              selectedCategory === null
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Posts
          </button>
          
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;