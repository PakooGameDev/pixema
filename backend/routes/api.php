<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TrendController;
use App\Http\Controllers\MovieController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth.custom')->group(function () {  
    Route::post('/updateUserData', [AuthController::class, 'updateUserData']);
    Route::get('/getUserData', [AuthController::class, 'getUserName']);
    Route::post('/movies/favorites', [MovieController::class, 'fetchFavoritesMovies']);
    Route::post('/movies/toggle-favorites/{movieId}', [MovieController::class, 'toggleFavorite']);
    Route::post('/movie', [MovieController::class, 'getMovieByID']);
});

Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/activate/{activationToken}', [AuthController::class, 'activate']);
Route::get('/refresh', [AuthController::class, 'refresh']);


Route::post('/movie/recommendations', [MovieController::class, 'fetchRecommendations']);

Route::post('/movies/homes', [MovieController::class, 'fetchMovies']);
Route::post('/movies/trends', [MovieController::class, 'fetchTrendsMovies']);

Route::post('/password/reset/link', [AuthController::class, 'resetAcception']);
Route::post('/password/reset', [AuthController::class, 'updatePassword']);
Route::get('/password/reset/{token}', [AuthController::class, 'redirection']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
