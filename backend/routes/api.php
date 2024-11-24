<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TrendController;
use App\Http\Controllers\MovieController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth.custom')->group(function () {  
    Route::post('/updateUserData', [AuthController::class, 'updateUserData']);
    Route::get('/getUserData', [AuthController::class, 'getUserName']);
    Route::get('/movies/favorites', [MovieController::class, 'fetchFavorites']);
    Route::post('/movies/toggle-favorites/{movieId}', [MovieController::class, 'toggleFavorite']);
});

Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/activate/{activationToken}', [AuthController::class, 'activate']);
Route::get('/refresh', [AuthController::class, 'refresh']);

Route::get('/movies', [MovieController::class, 'getMovies']);
Route::get('/movies/trends', [TrendController::class, 'index']);

Route::post('/movie', [MovieController::class, 'getMovieByID']);
Route::post('/movie/genre', [MovieController::class, 'fetchMoviesByGenre']);
Route::post('/movies/filter', [MovieController::class, 'filterMovies']);
Route::post('/password/reset/link', [AuthController::class, 'resetAcception']);
Route::post('/password/reset', [AuthController::class, 'updatePassword']);
Route::get('/password/reset/{token}', [AuthController::class, 'redirection']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
