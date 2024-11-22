import React from 'react';
import MovieList from '../../components/screens/MovieList/MovieList';
import ContentSection from '../../components/layout/ContentSection/ContentSection';

const Home: React.FC = () => {
  return (
    <ContentSection 
      defaultTab="homes" 
      ContentComponent={<MovieList type="homes" />} 
    />
  );
};

export default Home;