import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ResetRedirect: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    useEffect(() => {
        if (token) {
            // Перенаправляем на страницу ввода нового пароля, передавая токен как параметр в URL
            navigate(`/NewPassword?token=${token}`);
        } else {
            // Обработка случая, когда токен не найден
            console.error("Token not found in URL!");
            // Перенаправление на страницу с ошибкой или главную страницу
            navigate('/'); // Или на другую страницу обработки ошибок
        }
    }, [token, navigate]);

    return (
        <div>Redirecting... </div>
    );
};

export default ResetRedirect;


