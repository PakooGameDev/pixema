<?php

   namespace App\Services;

   use Illuminate\Support\Facades\Mail;
   use App\Mail\UserVerificationMail; 
   use App\Mail\PasswordResetEmail; 


   class EmailService {
        public function sendVerificationEmail($user, $verificationUrl) {
            Mail::to($user->email)->send(new UserVerificationMail($user, $verificationUrl));
        }
        public function sendPasswordResetEmail($user, $url)
        {
            Mail::to($user->email)->send(new PasswordResetEmail($user, $url));
        }
   }
