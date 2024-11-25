import React from 'react';
import MovieList from '../../components/screens/MovieList/MovieList';
import ContentSection from '../../components/layout/ContentSection/ContentSection';
import { observer } from 'mobx-react-lite';


const Trends: React.FC = () => {
  return (
    <ContentSection 
      defaultTab="trends" 
      ContentComponent={<MovieList url="trends" />} 
    />
  );
};

export default observer(Trends);