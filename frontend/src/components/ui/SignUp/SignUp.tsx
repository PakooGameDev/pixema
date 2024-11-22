import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
import { register } from '../../../utils/api/auth';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState<string | null>(null); // Для хранения ошибок
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            await register({ name, email, password, password_confirmation: confirmPassword });
            setSuccess("Registration successful! Please check your email to verify your account."); // Уведомление об успешной регистрации
            navigate('/login'); 
        } catch (err: any) {
            console.log(err)
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        }   
    };

    return (
        <div className={styles.auth__inputs}>
            <h2 className={styles.auth__inputs_header}>Sign Up</h2>
            {error && <p className={styles.error}>{error}</p>} {/* Отображаем ошибки */}
            {success && <p className={styles.success}>{success}</p>} {/* Отображаем ошибки */}
            <Input className={styles.auth__inputs_field} label='Name' placeholder='Your name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
            <Input className={styles.auth__inputs_field} label='Email' placeholder='Your email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input className={styles.auth__inputs_field} label='Password' placeholder='Your password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input className={styles.auth__inputs_field} label='Confirm password' placeholder='Confirm password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button className={styles.auth__inputs_button} onClick={handleSignUp}>Sign Up</button>
            <div className={styles.auth__inputs_signup}>
                <p>Already have an account?</p>
                <Link to={'/login'} className={styles.auth__inputs_link}>Sign In</Link>
            </div>
        </div>
    );
};

export default SignUp;
