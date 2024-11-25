import React from 'react';
import styles from './LoadingScreen.module.scss';
import { observer } from 'mobx-react-lite';

const LoadingScreen = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default observer(LoadingScreen);
