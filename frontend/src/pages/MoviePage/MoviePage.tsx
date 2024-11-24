import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MoviePageScreen from '../../components/screens/MoviePage/MoviePage';
import ContentSection from '../../components/layout/ContentSection/ContentSection';
import { observer } from 'mobx-react-lite';
import { IMovie } from '../../models/IMovie';
import MovieService from '../../services/MovieService';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovie>({
    id: -1,
    title: '',
    movie_description: '',
    release_date: '',
    budget: -1,
    country: '',
    production_companies: '',
    actors: '',
    director: '',
    writers: '',
    ratings: -1,
    duration: -1,
    genre: 'Comedy',
    poster_image: '',
  });

  useEffect(() => {
    if (id) { // Проверяем, что id существует

      getMovie(id);
    } else {
      console.error('Movie ID is undefined'); // Обработка случая, когда id отсутствует
    }
  }, [id]); // Добавляем id в зависимости, чтобы useEffect срабатывал при изменении id

  async function getMovie(id: string) {
    try {
      const response = await MovieService.fetchMovieById(id);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  }

  return (
    <ContentSection 
      defaultTab="homes" 
      ContentComponent={
        <MoviePageScreen 
            key={id}
            data={movie}
        />
      } 
    />
  );
};

export default observer(MoviePage);
