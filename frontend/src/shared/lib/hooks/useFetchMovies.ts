import { useState, useEffect } from 'react';
import MovieService from '../../../entities/Movie/Api/MovieService';
import { movieStore } from '../../../entities/Movie/Model/MovieStore';
import { IMovie } from '../../api/models/IMovie';

const useFetchMovies = (url: string, currentPage: number) => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchMovies = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const response = await MovieService.fetchMovies(url, currentPage, movieStore.filters);
            setMovies((prev) => [...prev, ...response.data]);
            setHasMore(response.data.length >= 10);
        } catch (error) {
            console.error('Ошибка при загрузке фильмов:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setMovies([]);
        setHasMore(true);

    }, [movieStore.filters]);

    useEffect(() => {
        fetchMovies();
    }, [currentPage, movieStore.filters, url]);

    return { movies, loading, hasMore };
};

export default useFetchMovies;
