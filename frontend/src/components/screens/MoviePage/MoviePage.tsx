import React from 'react';
import styles from './MoviePage.module.scss';
import { ReactComponent as Favorites} from '../../../assets/svg/Favorites.svg';
import { ReactComponent as Share} from '../../../assets/svg/Share.svg';
import Recommendations from '../../ui/Recommendations/Recommendations';
import formatDate from '../../../utils/format/FormatDate'
import formatNumber from '../../../utils/format/FormatNumber'

const movies = [
  {
    id: '1',
    title: 'Фильм 1',
    genres: ['Драма', 'Приключения'],
    imageUrl: 'url_to_image_1',
    rating: 8.5,
  },
  {
    id: '2',
    title: 'Фильм 2',
    genres: ['Комедия', 'Семейный'],
    imageUrl: 'url_to_image_2',
    rating: 7.2,
  },
  {
    id: '3',
    title: 'Фильм 3',
    genres: ['Экшен', 'Триллер'],
    imageUrl: 'url_to_image_3',
    rating: 9.0,
  },
  {
    id: '4',
    title: 'Фильм 1',
    genres: ['Драма', 'Приключения'],
    imageUrl: 'url_to_image_1',
    rating: 8.5,
  },
  {
    id: '5',
    title: 'Фильм 2',
    genres: ['Комедия', 'Семейный'],
    imageUrl: 'url_to_image_2',
    rating: 7.2,
  },
  {
    id: '6',
    title: 'Фильм 3',
    genres: ['Экшен', 'Триллер'],
    imageUrl: 'url_to_image_3',
    rating: 9.0,
  },
  {
    id: '7',
    title: 'Фильм 1',
    genres: ['Драма', 'Приключения'],
    imageUrl: 'url_to_image_1',
    rating: 8.5,
  },
  {
    id: '8',
    title: 'Фильм 2',
    genres: ['Комедия', 'Семейный'],
    imageUrl: 'url_to_image_2',
    rating: 7.2,
  },
  {
    id: '9',
    title: 'Фильм 3',
    genres: ['Экшен', 'Триллер'],
    imageUrl: 'url_to_image_3',
    rating: 9.0,
  },
];

interface MovieData {
    title: string;
    description: string;
    genres: string[];
    imageUrl: string;
    rating: number;
    duration: number;
    release:string;
    currency: number;
    production:string;
    actors:string;
    director:string;
    writers:string;
    country:string;
}

interface MovieCardProps {
  movieData:MovieData
}

const MoviePage: React.FC<MovieCardProps> = ({ movieData }) => {
  return (
    <div className={styles.movie}>
      <div className={styles.movie__banner}>
        <div className={styles.movie__banner_poster}>
            <img src={movieData.imageUrl} alt={movieData.title} className={styles.movie__banner_img}></img>
        </div>
        <div className={styles.movie__banner_buttons}>
            <button className={styles.movie__banner_btn}>
                <Favorites className={styles.movie__banner_icon}/>
            </button>
            <button className={styles.movie__banner_btn}>
                <Share className={styles.movie__banner_icon}/>
            </button>
        </div>
      </div>
      <div className={styles.movie__content}>
        <div className={styles.movie__genres}>    
            <p className={styles.movie__genres_text}>{movieData.genres.join(' • ')}</p>
            <h1 className={styles.movie__genres_title}>{movieData.title}</h1>
        </div>
        <div className={styles.movie__ratings}>
            <div className={styles.movie__ratings_info}>{movieData.rating}</div>
            <div className={styles.movie__ratings_info}>IMDb {movieData.rating}</div>
            <div className={styles.movie__ratings_info}>{movieData.duration} min</div>
        </div>
        <div className={styles.movie__description}>
            <p className={styles.movie__text}>{movieData.description}</p>
        </div>
        <div className={styles.movie__data}>
            <div className={styles.movie__data_info}>
                <h3>Year</h3>
                <p>{movieData.release.split('.')[2]}</p>
            </div>
            <div className={styles.movie__data_info}>
                <h3>Released</h3>
                <p>{formatDate(movieData.release, 'DD MMM YYYY')}</p>
            </div>
            <div className={styles.movie__data_info}>
                <h3>BoxOffice</h3>
                <p>${formatNumber(movieData.currency)}</p>
            </div>
            <div className={styles.movie__data_info}>
                <h3>Country</h3>
                <p>{movieData.country}</p>
            </div>
            <div className={styles.movie__data_info}>
                <h3>Production</h3>
                <p>{movieData.production}</p>
            </div>
            <div className={styles.movie__data_info}>
                <h3>Actors</h3>
                <p>{movieData.actors}</p>
            </div>
            <div className={styles.movie__data_info}>
                <h3>Director</h3>
                <p>{movieData.director}</p>
            </div>
            <div className={styles.movie__data_info}>
                <h3>Writers</h3>
                <p>{movieData.writers}</p>
            </div>
        </div>
        <Recommendations classname={styles.recommendations} movies={movies} />
      </div>
    </div>   
  );
};

export default MoviePage;

