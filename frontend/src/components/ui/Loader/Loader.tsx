import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <span className={styles.loader__text}>Show More</span>
      <div className={styles.loader__circle}></div>
    </div>
  );
};

export default Loader;
