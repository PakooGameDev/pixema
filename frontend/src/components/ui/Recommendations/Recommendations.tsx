import React, { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { ReactComponent as ArrowLeft } from '../../../assets/svg/ArrowLeft.svg';
import { ReactComponent as ArrowRight } from '../../../assets/svg/ArrowRight.svg';
import styles from './Recommendations.module.scss';

interface Movie {
  id: string;
  title: string;
  genres: string[];
  imageUrl: string;
  rating: number;
}

interface RecommendationSliderProps {
  movies: Movie[];
  classname?: string;
}

const Recommendations: React.FC<RecommendationSliderProps> = ({ movies, classname }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4); // Начальное значение

  const updateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width >= 1560) {
      setSlidesToShow(4);
    } else if (width >= 900) {
      setSlidesToShow(3);
    } else if (width >= 600) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(1);
    }
  };

  useEffect(() => {
    updateSlidesToShow(); // Устанавливаем начальное значение
    window.addEventListener('resize', updateSlidesToShow); // Добавляем обработчик события

    return () => {
      window.removeEventListener('resize', updateSlidesToShow); // Убираем обработчик события при размонтировании
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(movies.length / slidesToShow));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(movies.length / slidesToShow)) % Math.ceil(movies.length / slidesToShow));
  };

  return (
    <div className={`${styles.recommendations} ${classname}`}>
      <div className={styles.recommendations__header}>
        <h2>Recommendations</h2>
        <div className={styles.recommendations__slider}>
          <button onClick={prevSlide} className={styles.recommendations__arrow}>
            <ArrowLeft className={styles.recommendations__arrow_icon} />
          </button>
          <button onClick={nextSlide} className={styles.recommendations__arrow}>
            <ArrowRight className={styles.recommendations__arrow_icon} />
          </button>
        </div>
      </div>
      <div className={styles.recommendations__content}
        style={{
          transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,

        }}>
        {movies.map((movie) => (
          <MovieCard className={styles.recommendations__card} key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
