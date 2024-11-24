<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;



class MovieController extends Controller
{
    public function getMovies()
    {
        try {
            $movies = Movie::all(); // Получаем все фильмы из базы данных
            return response()->json($movies, 200); // Возвращаем фильмы в формате JSON с кодом 200
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to fetch movies.'], 500); // Обработка ошибок
        }
    }

    // Получение фильма по ID
    public function getMovieByID(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:movies,id', // Валидация ID
        ]);

        try {
            $movie = Movie::findOrFail($request->id); // Получаем фильм по ID
            return response()->json($movie, 200); // Возвращаем фильм в формате JSON с кодом 200
        } catch (\Exception $e) {
            return response()->json(['error' => 'Movie not found.'], 404); // Обработка ошибок
        }
    }

    public function fetchMoviesByGenre(Request $request)
    {
        $genres = $request->input('genre'); // Ожидаем строку жанров, например, "Comedy|Drama|Romance"

        if (!$genres) {
            return response()->json(['error' => 'Genres are required'], 400);
        }

        // Разделяем жанры на массив
        $genresArray = explode('|', $genres);

        // Ищем фильмы по каждому жанру
        $movies = Movie::where(function($query) use ($genresArray) {
            foreach ($genresArray as $genre) {
                $query->orWhere('genre', 'LIKE', '%' . trim($genre) . '%');
            }
        })->inRandomOrder() // Перемешиваем результаты
          ->take(10) // Ограничиваем до 10
          ->get();

        if ($movies->isEmpty()) {
            return response()->json(['message' => 'No movies found for the specified genres.'], 404);
        }

        return response()->json($movies);
    }

}
