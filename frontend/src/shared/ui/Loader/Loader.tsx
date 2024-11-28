import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string; 
}

const Loader: React.FC<LoaderProps> = ({className}) => {
  return (
    <div className={`${styles.loader} ${className}`}>
      <span className={styles.loader__text}>Show More</span>
      <div className={styles.loader__circle}></div>
    </div>
  );
};

export default Loader;
