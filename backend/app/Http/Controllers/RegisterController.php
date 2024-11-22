<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Services\EmailService;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use PDOException;

class RegisterController extends Controller
{
    public function register(Request $request, EmailService $emailService)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'verification_token' => Str::uuid()->toString(),
              ]);
            
              // проверка на успешное создание пользователя
              if (!$user) {
                throw new \Exception('Failed to create user.');
              }
            
              if ($user && $user->verification_token) {
                  $verificationUrl = route('verification.verify', ['token' => $user->verification_token]);
                  $emailService->sendVerificationEmail($user, $verificationUrl);
                  return response()->json(['message' => 'Registration successful. Please check your email to verify.'], 201);
              } else {
                  Log::error("Verification token is null for user ID: {$user->id}");
                  return response()->json(['error' => 'Registration failed.'], 500);
              }  
          } catch (QueryException $e) { // Для ошибок БД
            Log::error('Database error during registration: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['error' => 'Database error.'], 500);
          } catch (PDOException $e) { //Для ошибок PDO
            Log::error('Database error (PDO): ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['error' => 'Database error.'], 500);
          } catch (ValidationException $e) {
            Log::error('Validation error during registration: ' . $e->getMessage(), ['errors' => $e->errors()]);
            return response()->json(['error' => 'Validation failed', 'errors' => $e->errors()], 422);
          } catch (\Exception $e) {
            Log::error('Registration failed: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['error' => 'Registration failed: ' . $e->getMessage()], 500); // более информативное сообщение
          }                
    }
}

