<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\Trend;
use App\Models\UserMovie;
use Illuminate\Support\Facades\Log;

class MovieController extends Controller
{
    public function getMovies()
    {
        try {
            $movies = Movie::inRandomOrder()->get(); // Получаем все фильмы в случайном порядке
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

            $trend = Trend::where('movie_id', $request->id)->first();

            if ($trend) {
                $trend->increment('current_views'); // Увеличиваем current_views на 1
            } else {
                // Если запись в таблице trends не найдена, можно создать новую
                Trend::create([
                    'movie_id' => $request->id,
                    'current_views' => 1,
                    'previous_views' => 0, // Или другое значение по умолчанию
                    'trend_score' => 0, // Или другое значение по умолчанию
                ]);
            }
            $trend->save(); // Сохраняем изменения

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

    public function fetchFavorites (Request $request)
    {
        // Получаем авторизованного пользователя
        $user = $request->attributes->get('user');
    
        // Извлекаем фильмы из библиотеки пользователя
        $userMovies = UserMovie::where('user_id', $user->data->id)->with('movie')->get();
    
        // Формируем массив фильмов
        $movies = $userMovies->map(function ($userMovie) {
            return $userMovie->movie; // Возвращаем только фильмы
        });
    
        return response()->json($movies, 200);
    }

    public function toggleFavorite(Request $request, $movieId)
    {
        // Получаем авторизованного пользователя из атрибутов запроса
        $user = $request->attributes->get('user');
        // Проверяем, существует ли фильм
        $movie = Movie::find($movieId);
        if (!$movie) {
            return response()->json(['error' => 'Movie not found.'], 404);
        }
        
        // Проверяем, есть ли фильм в библиотеке пользователя
        $userMovie = UserMovie::where('user_id', $user->data->id)->where('movie_id', $movieId)->first();
        
        if ($userMovie) {
            // Если фильм уже в библиотеке, удаляем его
            $userMovie->delete();
            return response()->json(['message' => 'Movie removed from favorites.'], 200);
        } else {
            // Если фильма нет в библиотеке, добавляем его
            UserMovie::create([
                'user_id' => $user->data->id,
                'movie_id' => $movieId,
            ]);
            return response()->json(['message' => 'Movie added to favorites.'], 201);
        }
    }

}
