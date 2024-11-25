<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Trend;
use App\Models\UserMovie;
use Illuminate\Support\Facades\Log;
use App\Services\MovieService;

class MovieController extends Controller
{
    // Получение фильма по ID
    public function getMovieByID(Request $request)
    {
        $request->validate(['id' => 'required|integer|exists:movies,id',]);
        $user = $request->attributes->get('user');                   
        if (!$user) {
            return response()->json(['error' => 'Unauthorized.'], 401);
        }
        try {        
            $movie = Movie::findOrFail($request->id); 
            MovieService::incrementPageViews($request->id); 
            $userMovie = UserMovie::where('user_id', $user->data->id)
                                  ->where('movie_id', $request->id)
                                  ->first();
            if ($userMovie) {
                return response()->json(['exists' => true, 'movie' => $movie], 200);
            } else {
                return response()->json(['exists' => false, 'movie' => $movie], 200); 
            } 
            return response()->json([$movie, ], 200); 
        } catch (\Exception $e) {
            return response()->json(['error' => 'Movie not found.'], 404); 
        }
    }

    public function fetchRecommendations(Request $request)
    {
        $genres = $request->input('genre'); 

        if (!$genres) {
            return response()->json(['error' => 'Genres are required'], 400);
        }

        $genresArray = explode('|', $genres);

        $movies = Movie::where(function($query) use ($genresArray) {
            foreach ($genresArray as $genre) {
                $query->orWhere('genre', 'LIKE', '%' . trim($genre) . '%');
            }
        })->inRandomOrder() 
          ->take(10) 
          ->get();

        if ($movies->isEmpty()) {
            return response()->json(['message' => 'No movies found for the specified genres.'], 404);
        }

        return response()->json($movies->unique('id'));
    }

    public function fetchMovies(Request $request)
    {
        // Создаем начальный запрос
        $query = Movie::query();
    
        // Применяем фильтрацию
        $query = MovieService::applyFilters($request, $query);
 
        // Пагинация
        $movies = MovieService::paginate($query, $request->input('page', 1));
    
        return response()->json($movies->unique('id'), 200);
    }
    
    public function fetchTrendsMovies(Request $request)
    {
        /* есть костыль - если не передавать на фронте в качестве ключа 
        уникальное генерируемое uuid значение, а передавать id из таблицы - 
        вылазит ошибка с дубликатами ключей. РЕШИТЬ ПОЗЖЕ*/
        $query = Movie::select('movies.*') 
        ->join('trends', 'movies.id', '=', 'trends.movie_id')
        ->orderBy('trends.trend_score', 'desc'); 

        $query = MovieService::applyFilters($request, $query);
    
        $movies = MovieService::paginate($query, $request->input('page', 1));
    
        return response()->json($movies, 200);
    }
    
    public function fetchFavoritesMovies(Request $request)
    {
        $user = $request->attributes->get('user');                   
        if (!$user) {
            return response()->json(['error' => 'Unauthorized.'], 401);
        }
    
        $query = Movie::select('movies.*') // Select only columns from the movies table
                      ->join('user_movies', 'movies.id', '=', 'user_movies.movie_id')
                      ->where('user_movies.user_id', $user->data->id);

        $query = MovieService::applyFilters($request, $query);
        
        $userMovies = MovieService::paginate($query, $request->input('page', 1));
    
    
        return response()->json($userMovies, 200);
    }

    public function toggleFavorite(Request $request, $movieId)
    {
        $user = $request->attributes->get('user');
        if (!$user) {
            return response()->json(['error' => 'Unauthorized.'], 401);
        }

        $movie = Movie::find($movieId);
        if (!$movie) {
            return response()->json(['error' => 'Movie not found.'], 404);
        }
        
        $userMovie = UserMovie::where('user_id', $user->data->id)->where('movie_id', $movieId)->first();
        
        if ($userMovie) {
            $userMovie->delete();
            return response()->json(['message' => 'Movie removed from favorites.'], 200);
        } else {
            UserMovie::create([
                'user_id' => $user->data->id,
                'movie_id' => $movieId,
            ]);
            return response()->json(['message' => 'Movie added to favorites.'], 201);
        }
    }
}