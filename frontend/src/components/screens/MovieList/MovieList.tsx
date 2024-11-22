import React, { useEffect, useState } from 'react';
import MovieCard from '../../ui/MovieCard/MovieCard';
import Loader from '../../ui/Loader/Loader';
import styles from './MovieList.module.scss';

interface MovieListProps {
  type: string;
}

const MovieList: React.FC<MovieListProps> = ({ type }) => {
  const [movies] = useState([
    {
      id:'1',
      title:'Movie Title',
      imageUrl:"/path/to/image.jpg",
      rating:8.5,
      genres:['Action', 'Drama'],
    },
    {
      id:'2',
      title:'Movie Title',
      imageUrl:"/path/to/image.jpg",
      rating:5.5,
      genres:['Action', 'Drama'],
    },
    {
      id:'3',
      title:'Movie Title',
      imageUrl:"/path/to/image.jpg",
      rating:7.5,
      genres:['Action', 'Drama'],
    },
    {
      id:'4',
      title:'Movie Title',
      imageUrl:"/path/to/image.jpg",
      rating:3.5,
      genres:['Action', 'Drama'],
    },
    {
      id:'5',
      title:'Movie Title',
      imageUrl:"/path/to/image.jpg",
      rating:5,
      genres:['Action', 'Drama'],
    },
    {
      id:'6',
      title:'Movie Title',
      imageUrl:"/path/to/image.jpg",
      rating:9.5,
      genres:['Action', 'Drama'],
    },
    {
      id:'7',
      title:'Movie Title',
      imageUrl:"/path/to/image.jpg",
      rating:6.5,
      genres:['Action', 'Drama'],
    },
    {
      id:'8',
      title:'Movie Title',
      imageUrl:"/path/to/image.jpg",
      rating:5.5,
      genres:['Action', 'Drama'],
    },
    {
      id:'9',
      title:'Movie Title',
      imageUrl:"/path/to/image.jpg",
      rating:8.5,
      genres:['Action', 'Drama'],
    },
    {
      id:'10',
      title:'Movie Title',
      imageUrl:"/path/to/image.jpg",
      rating:4.5,
      genres:['Action', 'Drama'],
    },
    {
      id:'1',
      title:'Movie Title',
      imageUrl:"/path/to/image.jpg",
      rating:8.5,
      genres:['Action', 'Drama'],
    },
  ]);

  return (
    <div className={styles.movies__container}>
      <div className={styles.movies__container_list}>
        {movies.map(movie => (
          <MovieCard key={movie.id} id={movie.id} title={movie.title} genres={movie.genres} imageUrl={movie.imageUrl} rating={movie.rating} />
        ))} 
      </div>
      <Loader/>
    </div>   
  );
};

export default MovieList;
