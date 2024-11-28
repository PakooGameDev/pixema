import $api from "../../../shared/api/client"
import { AxiosResponse } from "axios"
import { IMovie } from "../../../shared/api/models/IMovie"

export default class MovieService {

    static toggleFavorite(id: string | number): Promise<AxiosResponse<IMovie>> {
        return $api.post<IMovie>(`/movies/toggle-favorites/${id}`);
    }

    static fetchMovieById(id:string|number): Promise<AxiosResponse<IMovie|any>> {
        return $api.post<IMovie|any>('/movie', {id})
    }

    static fetchRecommendations(genre:string): Promise<AxiosResponse<IMovie[]>> {
        return $api.post<IMovie[]>('/movie/recommendations', {genre})
    }
    
    static fetchMovies(url:string,page:number, filters: {
        title?: string;
        genre?: string;
        country?: string;
        years?: [string | null, string | null];
        ratings?: [string | null, string | null];
        sortBy?: string;
    }): Promise<AxiosResponse<IMovie[]>> {
        return $api.post<IMovie[]>(`/movies/${url}?page=${page}`, filters);
    }

}
