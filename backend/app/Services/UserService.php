<?php

   namespace App\Services;

    use App\Models\User;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Str;
    use App\Services\EmailService;
    use App\Services\TokenService;
    use App\DTOs\UserDto;

    class UserService {

        
        private static function refreshUserAndTokens($user) 
        {
            $userDTO = new UserDto($user);
            $tokensPair = TokenService::generateTokens($userDTO->toArray());

            $refreshToken = $tokensPair['refreshToken'];
            $accessToken = $tokensPair['accessToken'];

            TokenService::saveToken($userDTO->id, $refreshToken);

            return ['refreshToken'=>$refreshToken,'accessToken'=>$accessToken,'user'=>$userDTO];
        }

        public static function registration($name, $email, $password) 
        {
                
                $candidate = User::where('email', $email)->first();
                if ($candidate) {
                    return null;
                }
                $hashedPassword = Hash::make($password); 
                $activationToken = Str::uuid()->toString(); 

                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'password' => $hashedPassword,
                    'activationToken' => $activationToken,
                    'isActivated' => false,
                ]);                                          

                $activationUrl = env('APP_URL') . '/api/activate/' . $activationToken;  
                EmailService::sendEmail($user, EmailType::VERIFICATION, $activationUrl);  

                return self::refreshUserAndTokens($user);
        }

        public static function activate($activationToken)
        {
            $user = User::where('activationToken', $activationToken)->first(); 
            if (!$user) {
                return null;
            }
    
            $user->isActivated = true; 
            $user->activationToken = null; 
            $user->save(); 
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
                        ->where('resetTokenExpires', '>', now()) 
                        ->first();

            if (!$user) {
                return null;
            }

            $user->password = Hash::make($newPassword);
            $user->resetToken = null;
            $user->resetTokenExpires = null;
            $user->save();

            return self::refreshUserAndTokens($user);
        }

        public static function updatePasswordFromPage($user, $password, $newPassword)
        {
            if(!Hash::check($password, $user->password)) {
                return null;
            }  

            $user->password = Hash::make($newPassword);
            $user->save();

            return self::refreshUserAndTokens($user);
        }

        public static function updateEmail($user, $email)
        {
            $candidate = User::where('email', $email)->first();
            if ($candidate) {
                return null;
            }
            $user->email = $email;
            $user->save();

            return self::refreshUserAndTokens($user);
        }
        public static function updateName($user, $name)
        {
            $user->name = $name;
            $user->save();

            return self::refreshUserAndTokens($user);
        }

        public static function login($email, $password) 
        {    
            $user = User::where('email', $email)->first();
            if (!$user || !Hash::check($password, $user->password) || $user->isAcivated) {
                return null;
            }                      
            if(!($user->isActivated)){
                return null;
            }
            return self::refreshUserAndTokens($user);
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

            $user = User::find($validatedToken->data->id);
            if (!$user) {
                return null;
            }
        
            return self::refreshUserAndTokens($user);
        }         
        
    }