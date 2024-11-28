import { makeAutoObservable } from 'mobx';
import { IMovie } from '../../../shared/api/models/IMovie';

class MovieStore {
    movies: IMovie[] = [];
    loading: boolean = false;
    totalCount: number = 0; 
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
        this.searchTerm = term;
    }
 
    setFilters(newFilters: any) {
        this.filters = { ...this.filters, ...newFilters };
    }
}

export const movieStore = new MovieStore();
