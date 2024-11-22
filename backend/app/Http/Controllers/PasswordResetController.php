<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Services\EmailService; // Импорт вашего сервиса EmailService
use Illuminate\Support\Facades\Mail; // Или используйте Mail facade напрямую
use Illuminate\Support\Facades\Redirect;

class PasswordResetController extends Controller
{
    public function sendResetLinkEmail(Request $request, EmailService $emailService)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $request->email)->first();

        $token = Str::random(60);
        $user->update(['remember_token' => $token]);


        $url = route('password.reset.form', ['token' => $token]); // Маршрут к форме сброса

        $emailService->sendPasswordResetEmail($user, $url); // Или используйте Mail::to($user)->send(new PasswordResetEmail($user, $url));

        return response()->json(['message' => 'Ссылка для сброса пароля отправлена на вашу почту.'], 200);
    }


    public function showResetForm($token)
    {
        $user = User::where('remember_token', $token)->first();
        if (!$user) {
            abort(404); // Или перенаправление на страницу ошибки
        }

        // Редирект на React-страницу с токеном в URL
        return Redirect::to(env('FRONTEND_URL') . '/reset-redirect?token=' . $token); 
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::where('remember_token', $request->token)->first();

        if (!$user) {
            return response()->json(['error' => 'Неверный токен.'], 400);
        }

        $user->update([
            'password' => Hash::make($request->password),
            'remember_token' => null,
        ]);

        return response()->json(['message' => 'Пароль успешно изменен.'], 200);
    }
}
