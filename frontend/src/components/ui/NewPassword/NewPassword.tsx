import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NewPassword.module.scss';
import Input from '../Input/Input';
import { resetPassword } from '../../../utils/api/auth'; // Импорт функции для сброса пароля

const NewPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Добавлено состояние загрузки
    const [token, setToken] = useState(''); // Добавлено состояние для хранения токена
    const navigate = useNavigate();

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token'); // Получение токена из URL
        if (tokenFromUrl) {
          setToken(tokenFromUrl);
        } else {
          navigate('/'); // Или перенаправление на другую страницу, если токена нет
        }
    }, [navigate]);


    const handleNewPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Устанавливаем состояние загрузки

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false); // Снимаем состояние загрузки
            return;
        }

        try {
            await resetPassword({ token, password, password_confirmation: password });
            navigate('/login'); // Перенаправление на страницу успеха
        } catch (error: any) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false); // Снимаем состояние загрузки
        }
    };

    return (
        <div className={styles.auth__inputs}>
            <h2 className={styles.auth__inputs_header}>New password</h2>
            {error && <div className={styles.error}>{error}</div>}
            <Input className={styles.auth__inputs_field} label='Password' placeholder='Your password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input className={styles.auth__inputs_field} label='Confirm password' placeholder='Confirm your password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button className={styles.auth__inputs_button} onClick={handleNewPassword} disabled={loading}>
                {loading ? 'Установка...' : 'Set password'} {/* Изменение текста кнопки во время загрузки */}
            </button>
        </div>
    );
};

export default NewPassword;
