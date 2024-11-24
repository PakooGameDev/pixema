import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './MovieCard.module.scss';
import { IMovie } from '../../../models/IMovie';

interface MovieProps {
  data: IMovie;
  className?: string;
}

const MovieCard: React.FC<MovieProps> = ({data, className}) => {
  return (
    <Link to={`/movie/${data.id}`} className={`${styles.card} ${className}`}> 
      <div className={styles.card__banner}>
        <img src={data.poster_image} alt={data.title} className={styles.card__image} />
      </div>
      <div className={styles.card__info}>
        <h3 className={styles.card__info_title}>{data.title}</h3>
        <p className={styles.card__info_genres}>{data.genre.split(',').join(' • ')}</p>
      </div>
      <div className={styles.card__rating}>{data.ratings}</div>
    </Link>
  );
};

export default MovieCard;



