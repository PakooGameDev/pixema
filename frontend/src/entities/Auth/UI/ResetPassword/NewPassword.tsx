import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NewPassword.module.scss';
import Input from '../../../../shared/ui/Input/Input';
import { Context } from '../../../../index';

const NewPassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmed, setNewPasswordConfirmed] = useState('');
    const [token, setToken] = useState(''); 
    
    const navigate = useNavigate();

    const {store} = useContext(Context);

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token'); 
        if (tokenFromUrl) {
          setToken(tokenFromUrl);
        } 
    }, [navigate]);


    const handleSubmit = () => {
        if (newPassword !== newPasswordConfirmed) {
            return;
        }

        store.updatePassword(token, newPassword, newPasswordConfirmed);   
        navigate('/login'); 
    };

    return (
        <div className={styles.auth__inputs}>
            <h2 className={styles.auth__inputs_header}>New password</h2>
            <Input className={styles.auth__inputs_field} label='Password' placeholder='Your password' type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <Input className={styles.auth__inputs_field} label='Confirm password' placeholder='Confirm your password' type='password' value={newPasswordConfirmed} onChange={(e) => setNewPasswordConfirmed(e.target.value)} />
            <button className={styles.auth__inputs_button} onClick={handleSubmit}>Set password</button>
        </div>
    );
};

export default NewPassword;
