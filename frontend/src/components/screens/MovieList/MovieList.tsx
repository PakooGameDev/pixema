import React, { useEffect, useState } from 'react';
import MovieCard from '../../ui/MovieCard/MovieCard';
import Loader from '../../ui/Loader/Loader';
import styles from './MovieList.module.scss';
import { IMovie } from '../../../models/IMovie';
import MovieService from '../../../services/MovieService';

interface MovieListProps {
  type: string;
}

const MovieList: React.FC<MovieListProps> = ({ type }) => {
 
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    getMovies()
  }, []);

  async function getMovies(){
    try {
      const response = await MovieService.fetchMovies();
      setMovies(response.data); 
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  return (
    <div className={styles.movies__container}>
      <div className={styles.movies__container_list}>
        {movies.map(movie => (
          <MovieCard key={movie.id} data={movie}/>
        ))} 
      </div>
      <Loader/>
    </div>   
  );
};

export default MovieList;
