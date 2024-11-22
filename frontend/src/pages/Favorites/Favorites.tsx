import React from 'react';
import MovieList from '../../components/screens/MovieList/MovieList';
import ContentSection from '../../components/layout/ContentSection/ContentSection';

const Favorites: React.FC = () => {
  return (
    <ContentSection 
      defaultTab="favorites" 
      ContentComponent={<MovieList type="favorites" />} 
    />
  );
};

export default Favorites;