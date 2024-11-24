<?php

    namespace App\Mail;

    use Illuminate\Bus\Queueable;
    use Illuminate\Mail\Mailable;
    use Illuminate\Queue\SerializesModels;

    class UserVerificationMail extends Mailable
    {
        use Queueable, SerializesModels;

        public $user;
        public $activationLink;

        /**
         * Create a new message instance.
         *
         * @return void
         */
        public function __construct($user, $activationLink)
        {
            $this->user = $user;
            $this->activationLink = $activationLink;
        }

        /**
         * Build the message.
         *
         * @return $this
         */
        public function build()
        {
            return $this->view('emails.user_activation') // возвращает в письме шаблон /resources/views/email/user_activation.blade.php
                        ->subject('Верификация пользователя'); // задает тему письма
        }
    }
