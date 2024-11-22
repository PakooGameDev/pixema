import React, { useState } from 'react';
import styles from './Reset.module.scss';
import Input from '../Input/Input';
import { sendResetLink } from '../../../utils/api/auth'; // Импорт функции из api.ts


const Reset: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Добавлено состояние загрузки

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Устанавливаем состояние загрузки
        try {
            await sendResetLink(email);
            // После успешной отправки, перенаправить пользователя на страницу с сообщением об успехе
            // Например, используя useNavigate:
            // const navigate = useNavigate();
            // navigate('/password-reset-success');
            alert("Ссылка для сброса пароля отправлена!"); //Временное решение
        } catch (error: any) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false); // Снимаем состояние загрузки, независимо от успеха/неудачи
        }
    };

    return (
        <div className={styles.auth__inputs}>
            <h2 className={styles.auth__inputs_header}>Reset password</h2>
            {error && <div className={styles.error}>{error}</div>}
            <Input className={styles.auth__inputs_field} label='Email' placeholder='Your email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className={styles.auth__inputs_button} onClick={handleReset} disabled={loading}>
                {loading ? 'Отправка...' : 'Reset'} {/* Изменение текста кнопки во время загрузки */}
            </button>
        </div>
    );
};

export default Reset;
