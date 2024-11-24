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
                return response()->json(['error' => 'ошибка регистрации'], 404);
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
                 return response()->json(['error' => 'Неверный email или пароль'], 401);
            }
            return response()->json($userData, 200)->withCookie(cookie('refreshToken', $userData['refreshToken'], 60 * 24 * 7, null, null, null, true, false, null));
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        } catch (\Exception $e) { 
            return response()->json(['error' =>  $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $refreshToken = $request->cookie('refreshToken');
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
                return response()->json(['error' => 'Не передан токен'], 401);
            }
            $userData = UserService::refresh($refreshToken);
            if (!$userData) {
                return response()->json(['error' => 'Токен не найден'], 401);
            }
            return response()->json($userData, 200)->withCookie(cookie('refreshToken', $userData['refreshToken'], 60 * 24 * 7, null, null, null, true, false, null));
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
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
            'password' => 'required|string|min:8', // Минимальная длина пароля
            'password_c' => 'required|string|same:password', // Проверка на совпадение с паролем
        ]);
        try {
            $userData = UserService::updatePassword($request->token,$request->password);
            return response()->json($userData, 200)->withCookie(cookie('refreshToken', $userData['refreshToken'], 60 * 24 * 7, null, null, null, true, false, null));
        } catch(\Throwable $e) {
            return response()->json(['error' =>  $e->getMessage()], 500);
        }

    }

    public function updateUserData(Request $request)
    {
            $authorizedUser = $request->attributes->get('user');
            
            $userInDB = User::find($authorizedUser->data->id);

            // Обновляем имя, если оно передано
            if ($request->has('name')) {
                $request->validate(['name' => ['nullable','string', 'max:255'],]);
                $userData = UserService::updateName($userInDB, $request->name);
            }

            // Обновляем email, если он передан
            if ($request->has('email')) {
                $request->validate(['email' => ['nullable','string', 'email', 'max:255', 'unique:users'],]);
                $userData = UserService::updateEmail($userInDB, $request->email);
            }

            // Обновляем пароль, если новое значение пароля передано
            if ($request->filled('newPassword')) {
                $request->validate([
                    'currentPassword' => 'required_with:newPassword|string|min:8',
                    'newPassword' => 'nullable|string|min:8', 
                    'newPassword_c' => 'required_with:newPassword|nullable|string|same:newPassword', 
                ]);
                $userData = UserService::updatePasswordFromPage($userInDB, $request->currentPassword, $request->newPassword);
            }

            return response()->json($userData, 200)->withCookie(cookie('refreshToken', $userData['refreshToken'], 60 * 24 * 7, null, null, null, true, false, null));
    }

    public function getUserName(Request $request)
    {
            $authorizedUser = $request->attributes->get('user');
            
            $userInDB = User::find($authorizedUser->data->id);

            return response()->json($userInDB->name, 200);
    }
}
