import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import MovieCard from '../MovieCard/MovieCard';
import { Loader } from '../../../../shared/ui/index';
import styles from './MovieList.module.scss';
import useFetchMovies from '../../../../shared/lib/hooks/useFetchMovies';
import useInfiniteScroll from '../../../../shared/lib/hooks/useInfiniteScroll';
import { v4 as uuidv4 } from 'uuid';
import emptyState from '../../../../shared/assets/images/EmptyState.png';
import { movieStore } from '../../Model/MovieStore';

interface MovieListProps {
    url: string;
}

const MovieList: React.FC<MovieListProps> = observer(({ url }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const { movies, loading, hasMore } = useFetchMovies(url, currentPage);

    const searchedMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(movieStore.searchTerm.toLowerCase())
    );

    useInfiniteScroll(loadMoreRef, loading, hasMore && searchedMovies.length > 0, setCurrentPage);


    useEffect(() => {
        setCurrentPage(1);
    }, [movieStore.filters]);

    return (
        <div className={styles.movies__container}>
            <div className={styles.movies__container_list}>
                {searchedMovies.length === 0 ? (
                    <div className={styles.empty}>
                        <img src={emptyState} alt={'EmptyState'} />
                    </div>
                ) : (
                    searchedMovies.map(movie => (
                        <MovieCard key={uuidv4()} data={movie} />
                    ))
                )}
            </div>
            {loading && <Loader className={styles.movies__container_loader} />}
            <div ref={loadMoreRef} style={{ height: '40px' }} />
        </div>
    );
});

export default MovieList;
