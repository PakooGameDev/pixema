import React from 'react';
import {  useParams } from 'react-router-dom';
import MoviePageScreen from '../../components/screens/MoviePage/MoviePage';
import ContentSection from '../../components/layout/ContentSection/ContentSection';
import { observer } from 'mobx-react-lite';


const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <ContentSection 
      defaultTab="homes" 
      ContentComponent={
        <MoviePageScreen 
            key={id}
            id={id || ''}
        />
      } 
    />
  );
};

export default observer(MoviePage);
