import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
import { Context } from '../../../index';


const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {store} = useContext(Context);

    const handleLogin = () =>{
 
        console.log(store.user.isActivated,store.user)
      
        store.login(email, password)
        navigate('/')
    }


    return (
        <div className={styles.auth__inputs}>
            <h2 className={styles.auth__inputs_header}>Sign In</h2>
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
            <Link className={styles.auth__inputs_forgot} to={'/reset'}>Forgot password?</Link>
            <button className={styles.auth__inputs_button} onClick={handleLogin}>Sign In</button>
            <div className={styles.auth__inputs_signup}>
                <p>Don't have an account?</p>
                <Link to={'/register'} className={styles.auth__inputs_link}>Sign Up</Link>
            </div>
        </div>
    );
};

export default SignIn;

