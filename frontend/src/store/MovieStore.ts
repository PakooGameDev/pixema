import { makeAutoObservable } from 'mobx';
import MovieService from '../services/MovieService';
import { IMovie } from '../models/IMovie';

class MovieStore {
    movies: IMovie[] = [];
    loading: boolean = false;
    filters: any = {
        title: '',
        genre: '',
        country: '',
        years: [null, null],
        ratings: [null, null],
    };
    searchTerm: string = ''; // Состояние для поиска

    constructor() {
        makeAutoObservable(this);
    }

    async fetchMovies() {
        this.loading = true;
        try {
            const response = await MovieService.fetchMovies();
            this.movies = response.data;
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            this.loading = false;
        }
    }

    setSearchTerm(term: string) {
        this.searchTerm = term; // Установка значения поиска
    }

    async filterMovies() {
        this.loading = true;
        try {
            const response = await MovieService.filterMovies(this.filters);
            this.movies = response.data;

            // Сортировка по рейтингу или по годам
            if (this.filters.sortBy === 'rating') {
                this.movies.sort((a, b) => b.ratings - a.ratings); // Сортировка по убыванию рейтинга
            } else if (this.filters.sortBy === 'years') {
                this.movies.sort((a, b) => new Date(b.release_date).getFullYear() - new Date(a.release_date).getFullYear()); // Сортировка по убыванию года
            }
        } catch (error) {
            console.error('Error filtering movies:', error);
        } finally {
            this.loading = false;
        }
    }

    async fetchTrendingMovies() {
        this.loading = true;
        try {
            const response = await MovieService.fetchTrendingMovies(); 
            this.movies = response.data;
        } catch (error) {
            console.error('Error fetching trending movies:', error);
        } finally {
            this.loading = false;
        }
    }

    async fetchFavoritesMovies() {
        this.loading = true;
        try {
            const response = await MovieService.fetchFavoritesMovies(); 
            this.movies = response.data;
        } catch (error) {
            console.error('Error fetching trending movies:', error);
        } finally {
            this.loading = false;
        }
    }
    
    setFilters(newFilters: any) {
        this.filters = { ...this.filters, ...newFilters };
    }
}

export const movieStore = new MovieStore();
