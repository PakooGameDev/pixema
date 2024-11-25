import React, { useEffect,useState } from 'react';
import styles from './MoviePage.module.scss';
import { ReactComponent as Favorites} from '../../../assets/svg/Favorites.svg';
import { ReactComponent as Share} from '../../../assets/svg/Share.svg';
import Recommendations from '../../ui/Recommendations/Recommendations';
import formatDate from '../../../utils/format/FormatDate'
import formatNumber from '../../../utils/format/FormatNumber'
import { IMovie } from '../../../models/IMovie';
import MovieService  from '../../../services/MovieService';
import LoadingScreen from '../loadingScreen/LoadingScreen';

interface MovieProps {
  id: string;
  className?: string;
}

const MoviePage: React.FC<MovieProps> = ({id, className}) => {
    const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки
    const [favorite, setFavorite] = useState<boolean>(false); // Состояние загрузки
    const [data, setData] = useState<IMovie>({
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

    function handleFavorite() {
        MovieService.toggleFavorite(data.id) 
        setFavorite(!favorite)
    }

    function handleShare() {
        const shareUrl = `https://vk.com/share.php?url=http://localhost:3000/movie/${data.id}`;
        window.open(shareUrl, '_blank');     
    }

    useEffect(() => {
        if (id) {
            fetchPage(id);
        } else {
        console.error('Movie ID is undefined'); 
        }
    }, [id]); 
    
    async function fetchPage(id: string | number) {
        setLoading(true); 
        try {
          const response = await MovieService.fetchMovieById(id);
          setFavorite(response.data.exists)
          setData(response.data.movie);
        } catch (error) {
          console.error('Error fetching movie:', error);
        } finally {
          setLoading(false);
        }
      }

      if (loading) {
        return <LoadingScreen/>; 
      }

  return (
    <div className={styles.movie}>
      <div className={styles.movie__banner}>
        <div className={styles.movie__banner_poster}>
            <img src={data.poster_image} alt={data.title} className={styles.movie__banner_image}></img>
        </div>
        <div className={styles.movie__banner_buttons}>
            <button className={styles.movie__banner_btn} onClick={handleFavorite}>
                {favorite ? <Favorites className={` ${styles.movie__banner_icon} ${styles.favorite}`}/> : <Favorites className={styles.movie__banner_icon}/>}
            </button>
            <button className={styles.movie__banner_btn} onClick={handleShare}>
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

