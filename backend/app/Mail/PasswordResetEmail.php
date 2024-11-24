<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $resetUrl;

    public function __construct($user, $resetUrl)
    {
        $this->user = $user;
        $this->resetUrl = $resetUrl;
    }


    public function build()
    {
        return $this->subject('Сброс пароля')
                    ->view('emails.password_reset')
                    ->with([
                        'user' => $this->user,
                        'resetUrl' => $this->resetUrl,
                    ]);
    }
}
