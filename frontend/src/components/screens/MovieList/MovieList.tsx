import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import MovieCard from '../../ui/MovieCard/MovieCard';
import Loader from '../../ui/Loader/Loader';
import styles from './MovieList.module.scss';
import { movieStore } from '../../../store/MovieStore'; // Импортируйте ваше хранилище

interface MovieListProps {
  type: string;
}

const MovieList: React.FC<MovieListProps> = observer(({ type }) => {
  useEffect(() => {
    // Получаем фильмы при монтировании компонента
    movieStore.fetchMovies();
  }, []);

  // Вызываем фильтрацию, если фильтры изменяются
  useEffect(() => {
    if (movieStore.filters.title || movieStore.filters.genre || movieStore.filters.country) {
      movieStore.filterMovies();
    }
  }, [movieStore.filters]);

  return (
    <div className={styles.movies__container}>
      {movieStore.loading ? (
        <Loader />
      ) : (
        <div className={styles.movies__container_list}>
          {movieStore.movies.map(movie => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      )}
    </div>
  );
});

export default MovieList;
