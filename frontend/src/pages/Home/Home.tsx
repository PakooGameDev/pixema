import React from 'react';
import MovieList from '../../components/screens/MovieList/MovieList';
import ContentSection from '../../components/layout/ContentSection/ContentSection';
import { observer } from 'mobx-react-lite';

const Home: React.FC = () => {
  return (
    <ContentSection 
      defaultTab="homes" 
      ContentComponent={<MovieList url="homes" />} 
    />
  );
};

export default observer(Home);