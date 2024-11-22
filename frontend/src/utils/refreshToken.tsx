import { useEffect } from 'react';
import { refreshAccessToken } from './api/auth'; // Путь к вашему API файлу

const useAuth = () => {
    useEffect(() => {
        const checkToken = async () => {
            const accessToken = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token');

            if (accessToken) {
                // Проверка срока действия токена (например, через декодирование)
                const tokenExpiry = decodeToken(accessToken).exp; // Напишите функцию decodeToken
                const isExpired = Date.now() >= tokenExpiry * 1000;

                if (isExpired && refreshToken) {
                    const newAccessToken = await refreshAccessToken(refreshToken);
                    if (newAccessToken) {
                        localStorage.setItem('access_token', newAccessToken);
                    } else {
                        // Обработка ошибки (например, перенаправление на страницу входа)
                    }
                }
            }
        };

        checkToken();
    }, []);
};