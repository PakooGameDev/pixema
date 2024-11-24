import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
import { Context } from '../../../index';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const {store} = useContext(Context);

    const handleSubmit = () => {
        store.registration(name, email, password, confirmPassword)
        navigate('/login')
    }

    return (
        <div className={styles.auth__inputs}>
            <h2 className={styles.auth__inputs_header}>Sign Up</h2>
            <Input className={styles.auth__inputs_field} label='Name' placeholder='Your name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
            <Input className={styles.auth__inputs_field} label='Email' placeholder='Your email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input className={styles.auth__inputs_field} label='Password' placeholder='Your password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input className={styles.auth__inputs_field} label='Confirm password' placeholder='Confirm password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button className={styles.auth__inputs_button} onClick={handleSubmit}>Sign Up</button>
            <div className={styles.auth__inputs_signup}>
                <p>Already have an account?</p>
                <Link to={'/login'} className={styles.auth__inputs_link}>Sign In</Link>
            </div>
        </div>
    );
};

export default SignUp;
