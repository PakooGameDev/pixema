<!DOCTYPE html>
<html>
<head>
    <title>Сброс пароля</title>
</head>
<body>
    <h1>Сброс пароля</h1>
    <form id="resetPasswordForm">
        <input type="hidden" name="token" value="{{ $token }}">
        <input type="hidden" name="email" value="{{ $email }}">
        <label for="password">Новый пароль:</label>
        <input type="password" id="password" name="password"><br><br>
        <label for="confirmPassword">Подтвердите пароль:</label>
        <input type="password" id="confirmPassword" name="confirmPassword"><br><br>
        <button type="submit">Сбросить пароль</button>
    </form>
    <script>
        const form = document.getElementById('resetPasswordForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const response = await fetch('/api/password/reset/' + data.get('token'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest', // Это важно для Laravel
                },
                body: JSON.stringify({
                    token: data.get('token'),
                    email: data.get('email'),
                    password: data.get('password'),
                    password_confirmation: data.get('confirmPassword')
                }),
            });
            const result = await response.json();
            if (response.ok) {
                alert('Пароль успешно изменен!');
                window.location.href = '/login'; // Перенаправление на страницу входа
            } else {
                alert('Ошибка: ' + result.error);
            }
        });
    </script>
</body>
</html>