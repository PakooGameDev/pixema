<?php

   namespace App\Services;

   use Illuminate\Support\Facades\Mail;
   use App\Mail\UserVerificationMail; 
   use App\Mail\PasswordResetEmail; 

   interface EmailType
   {
       const VERIFICATION = 'verification';
       const PASSWORD_RESET = 'password_reset';
   }

   class EmailService {

        public static  function sendEmail($userToRecieve, $typeOfMessage, $urlToSend) {
            $mailClass = null;
        
            switch ($typeOfMessage) {
                case EmailType::VERIFICATION:
                    $mailClass = new UserVerificationMail($userToRecieve, $urlToSend);
                    break;
                case EmailType::PASSWORD_RESET:
                    $mailClass = new PasswordResetEmail($userToRecieve, $urlToSend);
                    break;
                default:
                    throw new \InvalidArgumentException("Invalid email type specified");
            }
        
            Mail::to($userToRecieve->email)->send($mailClass);
        }
   }