// src/pages/Auth/Auth.tsx
import React from 'react';
import  imgPath  from "../../assets/images/logo.png";
import styles from './Auth.module.scss'
import SignIn from '../../components/ui/SignIn/SignIn';
import { observer } from 'mobx-react-lite';

const Login: React.FC = () => {

  return (
    <div className={styles.auth}>
      <div className={styles.auth__logo}>
        <img src={imgPath} alt="Pixema" />
      </div>
      <div className={styles.auth__container}>
        <SignIn />
        <div className={styles.auth__footer}>© All Rights Reserved</div>
      </div>
    </div>
  );
};

export default observer(Login);
