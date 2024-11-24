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

    async filterMovies() {
        this.loading = true;
        try {
            const response = await MovieService.filterMovies(this.filters);
            console.log(response.data);
            this.movies = response.data;
        } catch (error) {
            console.error('Error filtering movies:', error);
        } finally {
            this.loading = false;
        }
    }

    setFilters(newFilters: any) {
        this.filters = { ...this.filters, ...newFilters };
    }
}

export const movieStore = new MovieStore();
