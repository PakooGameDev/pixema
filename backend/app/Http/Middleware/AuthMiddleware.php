<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use App\Services\TokenService;
use Illuminate\Support\Facades\Log;

class AuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $authorizationHeader = $request->header('Authorization');
           
            if ($authorizationHeader && preg_match('/Bearer\s(\S+)/', $authorizationHeader, $matches)) {
                $token = $matches[1]; // Токен будет в matches[1]
            } else {
                return response()->json(['error' => 'Пользователь не авторизован'], 401);
            }

            $userData = TokenService::validateAccessToken($token);
            if (!$userData) {
                return response()->json(['error' => 'Токен не валиден'], 401);
            }

            $request->attributes->add(['user' => $userData]);

            return $next($request);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
