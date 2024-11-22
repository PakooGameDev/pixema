import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Reset.module.scss';
import Input from '../Input/Input';
import { sendResetPasswordEmail } from '../../../utils/api/auth'; // Импорт функции из api.ts


const Reset: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Очищаем предыдущие ошибки
        try {
            const response = await sendResetPasswordEmail({ email });
            if (response.status === 200) {
                const { token, email: userEmail } = response.data;
                navigate({
                    pathname: '/NewPassword',
                    search: `?token=${token}&email=${userEmail}`,
                });
            } else {
                setError(response.data.message || 'An error occurred.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred.');
        }
    };

    return (
        <div className={styles.auth__inputs}>
            <h2 className={styles.auth__inputs_header}>Reset password</h2>
            {error && <div className={styles.error}>{error}</div>}
            <Input className={styles.auth__inputs_field} label='Email' placeholder='Your email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className={styles.auth__inputs_button} onClick={handleReset}>Reset</button>
        </div>
    );
};

export default Reset;
