import { makeAutoObservable } from 'mobx';
import MovieService from '../services/MovieService';
import { IMovie } from '../models/IMovie';

class MovieStore {
    movies: IMovie[] = [];
    loading: boolean = false;
    totalCount: number = 0; // Общее количество фильмов
    filters: any = {
        title: '',
        genre: '',
        country: '',
        years: [null, null],
        ratings: [null, null],
        sortBy: 'none',
    };
    searchTerm: string = ''; 

    constructor() {
        makeAutoObservable(this);
    }

    setSearchTerm(term: string) {
        this.searchTerm = term; // Установка значения поиска
    }
 
    setFilters(newFilters: any) {
        this.filters = { ...this.filters, ...newFilters };
    }
}

export const movieStore = new MovieStore();
