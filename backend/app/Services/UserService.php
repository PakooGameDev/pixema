<?php

   namespace App\Services;

    use App\Models\User;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Str;
    use App\Services\EmailService;
    use App\Services\TokenService;
    use App\DTOs\UserDto;
    use Illuminate\Support\Facades\Log;

    class UserService {
        public static function registration($name, $email, $password) {
                
                $candidate = User::where('email', $email)->first();
                if ($candidate) {
                    return null;
                }
                $hashedPassword = Hash::make($password);  // хэшируем пароль
                $activationToken = Str::uuid()->toString(); // создаем уникальное окночание ссылки

                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'password' => $hashedPassword,
                    'activationToken' => $activationToken,
                    'isActivated' => false,
                ]);                                             // заполняем поля в БД

                $activationUrl = env('APP_URL') . '/api/activate/' . $activationToken;  // генерируем ссылку для письма, опираясь на наш Роут
                EmailService::sendEmail($user, EmailType::VERIFICATION, $activationUrl);   // отправляем письмо с помощью нашего сервиса, передавая тип письма

                $userDTO = new UserDto($user);
                $tokens = TokenService::generateTokens($userDTO->toArray());
                $refreshToken = $tokens['refreshToken'];
                TokenService::saveToken($userDTO->id, $refreshToken);
                return ['refreshToken'=>$refreshToken,'accessToken'=>$tokens['accessToken'],'user'=>$userDTO];
        }

        public static function activate($activationToken)
        {
            $user = User::where('activationToken', $activationToken)->first(); // находим пользователя в бд по активационной ссылке
            if (!$user) {
                return null;
            }
    
            $user->isActivated = true; // меняем статус активации
            $user->activationToken = null; // очищаем активационный токен
            $user->save(); // сохраняем бд
        }

        public static function resetAcception($email) {
            $user = User::where('email', $email)->first();
            if (!$user) {
                return null;
            }
        
            $resetToken = Str::uuid()->toString(); 
            $expiresAt = now()->addHours(1);
        
            $user->update([
                'resetToken' => $resetToken,
                'resetTokenExpires' => $expiresAt,
            ]); 
        
            $resetUrl = env('APP_URL') . '/api/password/reset/' . $resetToken;  
            EmailService::sendEmail($user, EmailType::PASSWORD_RESET, $resetUrl);   
        
            return $resetToken;
        }
        
        public static function updatePassword($resetToken, $newPassword)
        {
            $user = User::where('resetToken', $resetToken)
                        ->where('resetTokenExpires', '>', now()) // Проверяем срок действия токена
                        ->first();
            if (!$user) {
                return null;
            }

            $user->password = Hash::make($newPassword);
            $user->resetToken = null;
            $user->resetTokenExpires = null; // Очищаем время истечения
            $user->save();

            $userDTO = new UserDto($user);
            $tokens = TokenService::generateTokens($userDTO->toArray());
            $refreshToken = $tokens['refreshToken'];
            TokenService::saveToken($userDTO->id, $refreshToken);
            return ['refreshToken'=>$refreshToken,'accessToken'=>$tokens['accessToken'],'user'=>$userDTO];
        }

        public static function updatePasswordFromPage($user, $password, $newPassword)
        {
            if(!Hash::check($password, $user->password)) {
                return null;
            }  

            $user->password = Hash::make($newPassword);
            $user->save();

            $userDTO = new UserDto($user);
            $tokens = TokenService::generateTokens($userDTO->toArray());
            $refreshToken = $tokens['refreshToken'];
            TokenService::saveToken($userDTO->id, $refreshToken);
            return ['refreshToken'=>$refreshToken,'accessToken'=>$tokens['accessToken'],'user'=>$userDTO];
        }

        public static function updateEmail($user, $email)
        {
            $candidate = User::where('email', $email)->first();
            if ($candidate) {
                return null;
            }
            $user->email = $email;
            $user->save();

            $userDTO = new UserDto($user);
            $tokens = TokenService::generateTokens($userDTO->toArray());
            $refreshToken = $tokens['refreshToken'];
            TokenService::saveToken($userDTO->id, $refreshToken);
            return ['refreshToken'=>$refreshToken,'accessToken'=>$tokens['accessToken'],'user'=>$userDTO];
        }
        public static function updateName($user, $name)
        {
            $user->name = $name;
            $user->save();

            $userDTO = new UserDto($user);
            $tokens = TokenService::generateTokens($userDTO->toArray());
            $refreshToken = $tokens['refreshToken'];
            TokenService::saveToken($userDTO->id, $refreshToken);
            return ['refreshToken'=>$refreshToken,'accessToken'=>$tokens['accessToken'],'user'=>$userDTO];
        }

        public static function login($email, $password) {
            
            $user = User::where('email', $email)->first();
            if (!$user) {
                return null;
            }
            if(!Hash::check($password, $user->password)) {
                return null;
            }     
            if ($user->isAcivated) {
                return null;
            }                        

            $userDTO = new UserDto($user);
            $tokens = TokenService::generateTokens($userDTO->toArray());
            $refreshToken = $tokens['refreshToken'];
            TokenService::saveToken($userDTO->id, $refreshToken);
            return ['refreshToken'=>$refreshToken,'accessToken'=>$tokens['accessToken'],'user'=>$userDTO];
        }

        public static function logout($refreshToken) {  
            TokenService::removeToken($refreshToken);
        }

        public static function refresh($refreshToken)
        {

            if (!$refreshToken) {
                return null;
            }

            $validatedToken = TokenService::validateRefreshToken($refreshToken);
            $tokenFromDB = TokenService::findToken($refreshToken);

            if (!$validatedToken || !$tokenFromDB) {
                return null;
            }
            $userId = $validatedToken->data->id; 

            $user = User::find($userId);
            if (!$user) {
                Log::warning('Пользователь не найден.', ['userId' => $userId]);
                return null;
            }
        
            $userDTO = new UserDto($user);
            $tokens = TokenService::generateTokens($userDTO->toArray());
            $refreshToken = $tokens['refreshToken'];
            TokenService::saveToken($userDTO->id, $refreshToken);
            return ['refreshToken'=>$refreshToken,'accessToken'=>$tokens['accessToken'],'user'=>$userDTO];
        }         
        
    }