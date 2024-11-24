import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import MovieCard from '../../ui/MovieCard/MovieCard';
import Loader from '../../ui/Loader/Loader';
import styles from './MovieList.module.scss';
import { movieStore } from '../../../store/MovieStore';

interface MovieListProps {
  type: string;
}

const MovieList: React.FC<MovieListProps> = observer(({ type }) => {
  useEffect(() => {
    if (type === 'trends') {
      movieStore.fetchTrendingMovies(); 
    } else if (type === 'homes') {
      movieStore.fetchMovies(); 
    } else if (type === 'favorites') {
      movieStore.fetchFavoritesMovies();
    }
  }, [type]);


  useEffect(() => {
    if (movieStore.filters.title || movieStore.filters.genre || movieStore.filters.country) {
      movieStore.filterMovies();
    }
  }, []);  // необходимо рендерить обычные фильмы, если поисковые запросы пусты или переходим в другие вкладки


  const filteredMovies = movieStore.movies.filter(movie =>
    movie.title.toLowerCase().includes(movieStore.searchTerm.toLowerCase())
  );

  return (
    <div className={styles.movies__container}>
      {movieStore.loading ? (
        <Loader />
      ) : (
        <div className={styles.movies__container_list}>
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      )}
    </div>
  );
});

export default MovieList;
