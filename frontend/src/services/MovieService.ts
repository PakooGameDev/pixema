import $api from "../http"
import { AxiosResponse } from "axios"
import { IMovie } from "../models/IMovie"

export default class MovieService {

    static fetchMovies(): Promise<AxiosResponse<IMovie[]>> {
        return $api.get<IMovie[]>('/movies')
    }

    static fetchMovieById(id:string|number): Promise<AxiosResponse<IMovie>> {
        return $api.post<IMovie>('/movie', {id})
    }

    static fetchMovieByGenre(genre:string): Promise<AxiosResponse<IMovie[]>> {
        return $api.post<IMovie[]>('/movie/genre', {genre})
    }
}
