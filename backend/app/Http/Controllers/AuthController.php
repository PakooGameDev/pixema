<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Services\TokenService;
use App\Services\UserService;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Redirect;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'string', 'min:8', 'confirmed'],
            ]);
            $userData = UserService::registration($request->name, $request->email, $request->password);
            if(!$userData) {
                return response()->json(['error' => 'ошибка регистрации'], 422);
            }
            return response()->json($userData, 200)->withCookie(cookie('refreshToken', $userData['refreshToken'], 60 * 24 * 7, null, null, null, true, false, null));
        } catch (\Throwable $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error'], 500);
        }              
    }

    public function activate($activationToken)
    {
        try {
            UserService::activate($activationToken);
            return Redirect::to(env('FRONTEND_URL') . '/login'); 
        } catch(\Throwable $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password'); // вытаскиваем только эти два поля

        try {
            $userData = UserService::login($credentials['email'], $credentials['password']);
            if(!$userData) {
                 return response()->json(['error' => 'Неверные данные или аккаунт не активирован'], 422);
            }
            return response()->json($userData, 200)->withCookie(cookie('refreshToken', $userData['refreshToken'], 60 * 24 * 7, null, null, null, true, false, null));
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        } 
    }

    public function logout(Request $request)
    {
        try {
            $refreshToken = $request->cookie('refreshToken');
            if (!$refreshToken) {
                return response()->json(['error' => 'unauthorized'], 401);
            }
            UserService::logout($refreshToken);
            return response()->json(['message' => 'Кука удалена'])->withoutCookie('refreshToken');
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        } 
    }

    public function refresh(Request $request)
    {
        try {
            $refreshToken = $request->cookie('refreshToken');
            if (!$refreshToken) {
                return response()->json(['error' => 'unauthorized'], 401);
            }
            $userData = UserService::refresh($refreshToken);
            if (!$userData) {
                return response()->json(['error' => 'unauthorized'], 401);
            }
            return response()->json($userData, 200)->withCookie(cookie('refreshToken', $userData['refreshToken'], env('JWT_REFRESH_TOKEN_EXPIRATION_TIME')/60, null, null, null, true, false, null));
        } catch (\Throwable $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        }
    }

    public function resetAcception(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);
        
        try {
            UserService::resetAcception($request->email);
            return response()->json(['message' => 'Ссылка на сброс пароля отправлена на вашу электронную почту'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function redirection($token)
    {
        try {
            return Redirect::to(env('FRONTEND_URL') . '/reset-redirect?token=' . $token);
        } catch(\Throwable $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        }
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:8',
            'password_confirmation' => 'required|string|same:password', 
        ]);
        try {
            $userData = UserService::updatePassword($request->token,$request->password);
            if(!$userData) {
                return response()->json(['error' => 'Неверный токен или пароль'], 422);
            }
            return response()->json($userData, 200)->withCookie(cookie('refreshToken', $userData['refreshToken'], 60 * 24 * 7, null, null, null, true, false, null));
        } catch(\Throwable $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        }

    }

    public function updateUserData(Request $request)
    {
        $userData = $request->attributes->get('user');
        if(!$userData){
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        // Validate the request
        $request->validate([
            'name' => 'sometimes|string|max:50|nullable',
            'email' => 'sometimes|nullable|email|max:255|unique:users,email,' . $userData->data->id,
            'currentPassword' => 'nullable|required_with:newPassword|string',
            'newPassword' => 'sometimes|string|min:8|confirmed|nullable', 
        ]);

        $userInDB = User::find($userData->data->id);

        if ($request->filled('name')) {
            $userData = UserService::updateName($userInDB, $request->name);
        }
        
        if ($request->filled('email')) {
            $userData = UserService::updateEmail($userInDB, $request->email);
        } 
        
        if ($request->filled('newPassword')) {
            $userData = UserService::updatePasswordFromPage($userInDB, $request->currentPassword, $request->newPassword);
        }

        return response()->json($userData, 200)->withCookie(cookie('refreshToken', $userData['refreshToken'], 60 * 24 * 7, null, null, null, true, false, null));   
    }

    public function getUserName(Request $request)
    {
            $authorizedUser = $request->attributes->get('user');
            if(!$authorizedUser){
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            $userInDB = User::find($authorizedUser->data->id);

            return response()->json($userInDB->name, 200);
    }
}
