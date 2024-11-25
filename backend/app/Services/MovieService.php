<?php

   namespace App\Services;

   use Illuminate\Http\Request;
   use App\Models\Trend;
   use Illuminate\Support\Facades\DB;

   class MovieService {
    public static function applyFilters(Request $request, $query){
        if ($request->has('title') && !empty($request->input('title'))) {
            $query->where('title', 'LIKE', '%' . $request->input('title') . '%');
        }
    
        // Фильтрация по жанру
        if ($request->has('genre') && !empty($request->input('genre'))) {
            $genres = explode('|', $request->input('genre'));
            $query->where(function ($q) use ($genres) {
                foreach ($genres as $genre) {
                    $q->orWhere('genre', 'LIKE', '%' . trim($genre) . '%'); // Используем orWhere для фильтрации по нескольким жанрам
                }
            });
        }
    
        // Фильтрация по стране
        if ($request->has('country') && !empty($request->input('country'))) {
            $query->where('country', 'LIKE', '%' . $request->input('country') . '%');
        }
    
        // Фильтрация по году выпуска
        if ($request->has('years') && is_array($request->input('years')) && count($request->input('years')) === 2) {
            $startYear = $request->input('years')[0] ?? 1900; // Значение по умолчанию
            $endYear = $request->input('years')[1] ?? 2024; // Значение по умолчанию
    
            $query->whereBetween('release_date', ["{$startYear}-01-01", "{$endYear}-12-31"]);         
        }
    
        // Фильтрация по рейтингу
        if ($request->has('ratings') && is_array($request->input('ratings')) && count($request->input('ratings')) === 2) {
            $minRating = $request->input('ratings')[0] ?? 0; // Значение по умолчанию
            $maxRating = $request->input('ratings')[1] ?? 10; // Значение по умолчанию
    
            $query->whereBetween('ratings', [$minRating, $maxRating]);
        }
    
        // Сортировка
        $sortBy = $request->input('sortBy');
        if ($sortBy === 'rating') {
            $query->orderBy('ratings', 'desc');
        } elseif ($sortBy === 'years') {
            $query->orderBy(DB::raw('EXTRACT(YEAR FROM release_date)'), 'desc'); 
        } elseif ($sortBy === 'none') {
            return $query;
        }
    
        return $query;
    }
    

    public static function paginate($data, $page = 1, $limit = 10 ){       
        $offset = ($page - 1) * $limit;   
        return $data->skip($offset)->take($limit)->get();
    }

    public static function incrementPageViews($id){       
        $trend = Trend::where('movie_id', $id)->first();
        if ($trend) {
            $trend->increment('current_views'); 
        } else {  
            Trend::create([
                'movie_id' => $id,
                'current_views' => 1,
                'previous_views' => 0, 
                'trend_score' => 0, 
            ]);
        }
        $trend->save(); 
    }
}