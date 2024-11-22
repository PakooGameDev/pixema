<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        try {
            if (! $token = Auth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
            $user = Auth::user();
            if (!$user->email_verified_at) {
                return response()->json(['error' => 'Email verification required'], 401);
            }
            $refreshToken = Auth::refresh(Auth::getToken()); 
            return response()->json(['access_token' => $token, 'refresh_token' => $refreshToken], 200);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        }
    }
}