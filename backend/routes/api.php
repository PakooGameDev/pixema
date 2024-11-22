<?php
   use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\RefreshTokenController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

  
Route::post('/logout', [AuthController::class, 'logout']);

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

Route::get('/verify/{token}', [VerificationController::class, 'verify'])->name('verification.verify');
Route::post('/refresh', [RefreshTokenController::class, 'refresh']);

Route::post('/password/reset/link', [PasswordResetController::class, 'sendResetLinkEmail']);
Route::get('/password/reset/{token}', [PasswordResetController::class, 'showResetForm'])->name('password.reset.form');
Route::post('/password/reset', [PasswordResetController::class, 'resetPassword']);

