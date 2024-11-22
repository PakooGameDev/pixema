<?php

namespace App\Listeners;


use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class SendEmailVerificationNotification implements ShouldQueue
{
    use InteractsWithQueue;


   public function handle(Registered $event)
   {
       if ($event->user instanceof MustVerifyEmail && ! $event->user->hasVerifiedEmail()) {
           $event->user->sendEmailVerificationNotification();
       }
   }

    protected function sendVerificationEmail($user)
    {
        $verificationToken = $this->generateVerificationToken();
        $user->update(['verification_token' => $verificationToken]);

        Mail::to($user)->send(new VerifyEmail($user, $verificationToken));
    }

    protected function generateVerificationToken()
    {
        return Str::uuid()->toString();
    }
}
