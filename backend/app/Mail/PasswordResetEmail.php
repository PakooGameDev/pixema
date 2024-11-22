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
    public $url;

    public function __construct($user, $url)
    {
        $this->user = $user;
        $this->url = $url;
    }


    public function build()
    {
        return $this->subject('Сброс пароля')
                    ->view('emails.password_reset')
                    ->with([
                        'user' => $this->user,
                        'url' => $this->url,
                    ]);
    }
}
