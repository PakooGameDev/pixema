<?php

namespace App\Http\Controllers;

use App\Models\Trend;
use App\Models\Movie;
use Illuminate\Http\Request;

class TrendController extends Controller
{
    public function index()
    {

        $movies = Movie::join('trends', 'movies.id', '=', 'trends.movie_id')
                       ->orderBy('trends.trend_score', 'desc')
                       ->select('movies.*') // выбираем все поля из таблицы movies
                       ->get();

        return response()->json($movies);
    }
}