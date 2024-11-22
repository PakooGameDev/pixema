import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  id: string;
  title: string;
  genres: string[];
  imageUrl: string;
  rating: number;
  className?:string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, genres,className, imageUrl, rating }) => {
  return (
    <Link to={`/movie/${id}`} className={`${styles.card} ${className}`}> 
      <div className={styles.card__banner}>
        <img src={imageUrl} alt={title} className={styles.card__image} />
      </div>
      <div className={styles.card__info}>
        <h3 className={styles.card__info_title}>{title}</h3>
        <p className={styles.card__info_genres}>{genres.join(' • ')}</p>
      </div>
      <div className={styles.card__rating}>{rating}</div>
    </Link>
  );
};

export default MovieCard;



