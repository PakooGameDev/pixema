<?php

   namespace App\Services;
   use Illuminate\Support\Facades\Auth;
   use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
   use App\Models\Token;
   use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

   class TokenService
   {
       public static function generateTokens(array $data)
       {
           try {
                // Генерация access токена
                $accessPayload = [
                    'iss' => 'pixema', // Издатель токена
                    'aud' => env('FRONTEND_URL'), // Аудитория токена
                    'iat' => time(), // Время создания токена
                    'exp' => time() + 3600, // Время истечения токена (1 час)
                    'data' => [
                        'id' => $data['id'], 
                        'email' =>  $data['email'],
                        'isActivated' => $data['isActivated']
                    ],
                ];
                $accessToken = JWT::encode($accessPayload, env('JWT_ACCESS_SECRET'), 'HS256');
                // Генерация refresh токена
                $refreshPayload = [
                    'iss' => 'pixema', // Издатель токена
                    'aud' => env('APP_URL'), // Аудитория токена
                    'iat' => time(), // Время создания токена
                    'exp' => time() + 604800, // Время истечения токена (7 дней)
                    'data' => [
                        'id' => $data['id'], 
                        'email' =>  $data['email'],
                        'isActivated' => $data['isActivated']
                    ],
                ];
                $refreshToken = JWT::encode($refreshPayload, env('JWT_REFRESH_SECRET'), 'HS256'); // 7 дней (604800 секунд)
                // Возвращаем токены
                return [
                    'accessToken' => $accessToken,
                    'refreshToken' => $refreshToken,
                ];
           } catch (JWTException $e) {
               return response()->json(['error' => 'Could not create token'], 500);
           }
       }

       public static function saveToken($userID, $refreshToken) 
       {
            $tokenData = Token::where('userID', $userID)->first();
            if ($tokenData) {
                $tokenData->refreshToken = $refreshToken;
                return $tokenData->save();
            }
            return Token::create([
                'userID' => $userID,
                'refreshToken' => $refreshToken,
            ]); 
       }

       public static function validateAccessToken($token)
       {
           try {
               $decoded = JWT::decode($token, new Key(env('JWT_ACCESS_SECRET'), 'HS256'));
               return $decoded;
           } catch (\Throwable $th) {
             return null;
           }
       }
   
       public static function validateRefreshToken($token)
       {
           try {
               $decoded = JWT::decode($token, new Key(env('JWT_REFRESH_SECRET'), 'HS256'));      
               return $decoded;
           } catch (\Throwable $th) {
                return null;
           }
       }

       public static function removeToken($refreshToken) 
       {
            Token::where('refreshToken', $refreshToken)->first()->delete();
       }

       public static function findToken($refreshToken) 
       {
            $token = Token::where('refreshToken', $refreshToken)->first();
            if (!$token) {
                return null;
            } 
            return $token;
       }
   }
   
   