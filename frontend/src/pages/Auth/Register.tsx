// src/pages/Auth/Auth.tsx
import React from 'react';
import  imgPath  from "../../assets/images/logo.png";
import styles from './Auth.module.scss'
import SignUp from '../../components/ui/SignUp/SignUp';
import { observer } from 'mobx-react-lite';

const Register: React.FC = () => {


  return (
    <div className={styles.auth}>
      <div className={styles.auth__logo}>
        <img src={imgPath} alt="Pixema" />
      </div>
      <div className={styles.auth__container}>
        <SignUp />
        <div className={styles.auth__footer}>© All Rights Reserved</div>
      </div>
    </div>
  );
};

export default observer(Register);
