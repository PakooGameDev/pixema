<?php
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MovieController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/activate/{activationToken}', [AuthController::class, 'activate']);
Route::get('/refresh', [AuthController::class, 'refresh']);
Route::get('/password/reset/{token}', [AuthController::class, 'redirection']);
Route::get('/movies', [MovieController::class, 'getMovies']);

Route::post('/movie', [MovieController::class, 'getMovieByID']);
Route::post('/movie/genre', [MovieController::class, 'fetchMoviesByGenre']);
Route::post('/updateUserData', [AuthController::class, 'updateUserData']);
Route::post('/password/reset/link', [AuthController::class, 'resetAcception']);
Route::post('/password/reset', [AuthController::class, 'updatePassword']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);