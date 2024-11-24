import React, { useEffect, useState } from 'react';
import styles from './MoviePage.module.scss';
import { ReactComponent as Favorites} from '../../../assets/svg/Favorites.svg';
import { ReactComponent as Share} from '../../../assets/svg/Share.svg';
import Recommendations from '../../ui/Recommendations/Recommendations';
import formatDate from '../../../utils/format/FormatDate'
import formatNumber from '../../../utils/format/FormatNumber'
import { IMovie } from '../../../models/IMovie';

interface MovieProps {
  data: IMovie;
  className?: string;
}

const MoviePage: React.FC<MovieProps> = ({data, className}) => {
  return (
    <div className={styles.movie}>
      <div className={styles.movie__banner}>
        <div className={styles.movie__banner_poster}>
            <img src={data.poster_image} alt={data.title} className={styles.movie__banner_img}></img>
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
            <p className={styles.movie__genres_text}>{data.genre.split('|').join(' • ')}</p>
            <h1 className={styles.movie__genres_title}>{data.title}</h1>
        </div>
        <div className={styles.movie__ratings}>
            <div className={styles.movie__ratings_info}>{data.ratings}</div>
            <div className={styles.movie__ratings_info}>IMDb {data.ratings}</div>
            <div className={styles.movie__ratings_info}>{data.duration} min</div>
        </div>
        <div className={styles.movie__description}>
            <p className={styles.movie__text}>{data.movie_description}</p>
        </div>
        <div className={styles.movie__data}>
            <div className={styles.movie__data_info}>
                <h3>Year</h3>
                <p>{data.release_date.split('-')[0]}</p>
            </div>
            <div className={styles.movie__data_info}>
                <h3>Released</h3>
                <p>{formatDate(data.release_date, 'DD MMM YYYY')}</p>
            </div>
            <div className={styles.movie__data_info}>
                <h3>BoxOffice</h3>
                <p>${formatNumber(data.budget)}</p>
            </div>
            <div className={styles.movie__data_info}>
                <h3>Country</h3>
                <p>{data.country}</p>
            </div>
            <div className={styles.movie__data_info}>
                <h3>Production</h3>
                <p>{data.production_companies}</p>
            </div>
            <div className={styles.movie__data_info}>
                <h3>Actors</h3>
                <p>{data.actors}</p>
            </div>
            <div className={styles.movie__data_info}>
                <h3>Director</h3>
                <p>{data.director}</p>
            </div>
            <div className={styles.movie__data_info}>
                <h3>Writers</h3>
                <p>{data.writers}</p>
            </div>
        </div>
        <Recommendations genre={data.genre} classname={styles.recommendations} />
      </div>
    </div>   
  );
};

export default MoviePage;

