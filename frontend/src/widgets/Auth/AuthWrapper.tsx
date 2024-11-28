// src/components/AuthWrapper.tsx
import React from 'react';
import imgPath from "../../shared/assets/images/logo.png";
import styles from './AuthWrapper.module.scss';
import { observer } from 'mobx-react-lite';

interface AuthWrapperProps {
    children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    return (
        <div className={styles.auth}>
            <div className={styles.auth__logo}>
                <img src={imgPath} alt="Pixema" />
            </div>
            <div className={styles.auth__container}>
                {children}
                <div className={styles.auth__footer}>© All Rights Reserved</div>
            </div>
        </div>
    );
};

export default observer(AuthWrapper);
