import React, { useEffect,useState } from 'react';
import styles from './MovieWidget.module.scss';
import Recommendations from '../../features/Recommendations/Recommendations';
import { IMovie } from '../../shared/api/models/IMovie';
import MovieService  from '../../entities/Movie/Api/MovieService';
import {MovieBanner, MovieDetails} from '../index';
import {LoadingScreen} from '../../shared/ui/index';

interface MovieProps {
  id: string;
  className?: string;
}

const MovieWidget: React.FC<MovieProps> = ({id, className}) => {
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
      <MovieBanner posterImage={data.poster_image} isFavorite={favorite} onToggleFavorite={handleFavorite} onShare={handleShare}/>  
      <div className={styles.movie__content}>
        <MovieDetails data={data}/>
        <Recommendations genre={data.genre} />
      </div>
    </div>   
  );
};

export default MovieWidget;

