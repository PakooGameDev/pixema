import React from 'react';
import MovieList from '../../components/screens/MovieList/MovieList';
import ContentSection from '../../components/layout/ContentSection/ContentSection';

const Trends: React.FC = () => {
  return (
    <ContentSection 
      defaultTab="trends" 
      ContentComponent={<MovieList type="trends" />} 
    />
  );
};

export default Trends;