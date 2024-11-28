import React, { useState, useContext } from 'react';
import styles from './Reset.module.scss';
import Input from '../../../../shared/ui/Input/Input';
import { Context } from '../../../../index';

const Reset: React.FC = () => {
    const [email, setEmail] = useState('');

    const {store} = useContext(Context);

    const handleReset = () => {
        store.resetPassword(email);
    };

    return (
        <div className={styles.auth__inputs}>
            <h2 className={styles.auth__inputs_header}>Reset password</h2>
            <Input className={styles.auth__inputs_field} label='Email' placeholder='Your email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className={styles.auth__inputs_button} onClick={handleReset}>Reset</button>
        </div>
    );
};

export default Reset;
