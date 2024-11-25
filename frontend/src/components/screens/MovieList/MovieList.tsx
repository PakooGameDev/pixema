import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import MovieCard from '../../ui/MovieCard/MovieCard';
import Loader from '../../ui/Loader/Loader';
import styles from './MovieList.module.scss';
import { movieStore } from '../../../store/MovieStore';
import MovieService from '../../../services/MovieService';
import { IMovie } from '../../../models/IMovie';
import emptyState from '../../../assets/images/EmptyState.png';
import { v4 as uuidv4 } from 'uuid';

interface MovieListProps {
  url: string;
}

const MovieList: React.FC<MovieListProps> = observer(({ url }) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchMovies = async (page: number) => {
    if (loading || !hasMore) return; // предотвращение нескольких запросов
    setLoading(true);
    try {
        const response = await MovieService.fetchMovies(url, page, movieStore.filters);
        setMovies((prev) => [...prev, ...response.data]);
        setHasMore(response.data.length >= 10); // проверка на наличие еще данных
    } catch (error) {
        console.error('Ошибка при загрузке фильмов:', error);
    } finally {
      setLoading(false);
    }
};

useEffect(() => {
  const handleScroll = () => {
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    const mainElement = document.querySelector('main');

    if (mainElement) {
      const scrollTop = window.scrollY;
      const opacity = Math.max(0, 1 - (scrollTop / headerHeight)); // Adjust opacity based on scroll
      mainElement.style.opacity = opacity.toString();
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
// здесь есть сложный и глубокий баг из-за пересечения и перерндеров 

  useEffect(() => {
    // Сбрасываем состояние при изменении фильтров
    console.log('clear')
    setMovies([]);
    setCurrentPage(1);
    setHasMore(true);
  }, [movieStore.filters]);

  useEffect(() => {
    console.log('fetch')
    fetchMovies(currentPage);
  }, [currentPage,movieStore.filters,url]);

  useEffect(() => {
    console.log('observe')
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        setCurrentPage((prev) => prev + 1); // Увеличиваем номер страницы, если элемент пересекается с отслеживаемым
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loading, hasMore]);


  const searchedMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(movieStore.searchTerm.toLowerCase())
  );

  
  return (
    <div className={styles.movies__container}>
      <div className={styles.movies__container_list}>
        {movies.length === 0 ? (
          <div className={styles.empty}>
            <img src={emptyState} alt={'EmptyState'} />
          </div>
        ) : (
          searchedMovies.map(movie => (
            <MovieCard key={uuidv4()} data={movie} /> // не использовать id из массива -вызывает ошибки. 
          ))
        )}
      </div>
      {loading && <Loader className={styles.movies__container_loader} />}
      <div ref={loadMoreRef} style={{ height: '40px' }} /> {/* элемент для отслеживания */}
    </div>
  );
});

export default MovieList;

