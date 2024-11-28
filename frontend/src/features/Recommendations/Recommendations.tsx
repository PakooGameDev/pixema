// src/components/Recommendations.tsx
import React, { useEffect, useState } from 'react';
import MovieCard from '../../entities/Movie/UI/MovieCard/MovieCard';
import MovieService from '../../entities/Movie/Api/MovieService';
import useSlider from '../../shared/lib/hooks/useSlider';
import { Slider } from '../../shared/ui/index';
import { IMovie } from '../../shared/api/models/IMovie';
import styles from './Recommendations.module.scss';

interface RecommendationSliderProps {
  genre: string;
}

const Recommendations: React.FC<RecommendationSliderProps> = ({ genre }) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const { currentIndex, slidesToShow, nextSlide, prevSlide } = useSlider(movies, 4);

  useEffect(() => {
    if (genre) { 
      fetchRecommendations(genre);
    } else {
      console.error('Genre does not exist'); 
    }
  }, [genre]); 

  async function fetchRecommendations(genre: string) {
    try {
      const response = await MovieService.fetchRecommendations(genre);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  }

  return (
      <Slider
        title='Recommendations'
        items={movies.map((movie) => (
          <MovieCard className={styles.recommendations__card} key={movie.id} data={movie} />
        ))}
        slidesToShow={slidesToShow}
        currentIndex={currentIndex}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />
  );
};

export default Recommendations;
