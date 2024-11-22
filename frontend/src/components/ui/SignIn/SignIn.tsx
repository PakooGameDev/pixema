import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
import { login } from '../../../utils/api/auth';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); 
    const [sent, setSent] = useState(false); // Для уведомления о смене пароля
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const response = await login({ email, password });
            console.log(response.data.access_token, response.data.refresh_token)
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            navigate('/home');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
            console.error('Login failed:', error);
        } 
    };

    return (
        <div className={styles.auth__inputs}>
            <h2 className={styles.auth__inputs_header}>Sign In</h2>
            {error && <p className={styles.error}>{error}</p>} {/* Отображаем ошибки */}
            {sent && <div className={styles.auth__inputs_text}>Your password has been changed!</div>}
            <Input
                className={styles.auth__inputs_field_email}
                label='Email'
                placeholder='Your email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                className={styles.auth__inputs_field_password}
                label='Password'
                placeholder='Your password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Link className={styles.auth__inputs_forgot} to={'/reset'}>
                Forgot password?
            </Link>
            <button className={styles.auth__inputs_button} onClick={handleSignIn}>
                Sign In
            </button>
            <div className={styles.auth__inputs_signup}>
                <p>Don't have an account?</p>
                <Link to={'/register'} className={styles.auth__inputs_link}>
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default SignIn;

