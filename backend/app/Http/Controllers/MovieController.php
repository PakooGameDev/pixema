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


    public function filterMovies(Request $request)
    {
        $query = Movie::query();
    
        // Фильтрация по названию фильма
        if ($request->has('title') && !empty($request->input('title'))) {
            $query->where('title', 'LIKE', '%' . $request->input('title') . '%');
        }
    
        // Фильтрация по жанру
        if ($request->has('genre') && !empty($request->input('genre'))) {
            $genres = explode('|', $request->input('genre'));
            $query->where(function ($q) use ($genres) { // Используем замыкание для группировки условий AND
              foreach ($genres as $genre) {
                $q->where('genre', 'LIKE', '%' . trim($genre) . '%');
              }
            });
          }
    
        // Фильтрация по стране
        if ($request->has('country') && !empty($request->input('country'))) {
            $query->where('country', 'LIKE', '%' . $request->input('country') . '%');
        }
    
        if ($request->has('years') && is_array($request->input('years')) && count($request->input('years')) === 2) {
            $startYear = $request->input('years')[0];
            $endYear = $request->input('years')[1];
        
            // Установка значений по умолчанию, если значения не установлены
            if (empty($startYear)) {
                $startYear = 1900;
            }
            if (empty($endYear)) {
                $endYear = 2024;
            }
        
            $query->whereBetween('release_date', ["{$startYear}-01-01", "{$endYear}-12-31"]);
        }
        
        // Фильтрация по рейтингу
        if ($request->has('ratings') && is_array($request->input('ratings')) && count($request->input('ratings')) === 2) {
            $minRating = $request->input('ratings')[0];
            $maxRating = $request->input('ratings')[1];
        
            // Установка значений по умолчанию, если значения не установлены
            if (empty($minRating)) {
                $minRating = 0;
            }
            if (empty($maxRating)) {
                $maxRating = 10;
            }
        
            $query->whereBetween('ratings', [$minRating, $maxRating]);
        }
    // Логируем сгенерированный SQL-запрос
    Log::info($query->toSql(), $query->getBindings());

    $movies = $query->get();

    // Логируем результат
    Log::info('Filtered movies', $movies->toArray());
    
        return response()->json($movies);
    }
}
