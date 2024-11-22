<h1>Верификация Email</h1>
<p>Здравствуйте, {{ $user->name }}!</p>
<p>Пожалуйста, перейдите по ссылке ниже, чтобы верифицировать ваш email:</p>
<a href="{{ $verificationUrl }}">{{ $verificationUrl }}</a>

