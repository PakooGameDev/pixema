import React, { useState } from 'react';
import styles from './Switcher.module.scss';

interface ButtonsProps {
    firstBtn: string;
    secondBtn: string;
}


interface SwitcherProps {
  label?: string;
  buttons: ButtonsProps;
  className?: string;
  activeButton: string; // Добавьте это свойство
  onSortChange: (value: string) => void; // Добавьте это свойство
}
const Switcher: React.FC<SwitcherProps> = ({ label, buttons, className, activeButton, onSortChange }) => {
  return (
    <div className={`${styles.switcher} ${className}`}>
      {label && <label className={styles.switcher__label}>{label}</label>}
      <div className={styles.switcher__buttons}>
        <button
          className={activeButton === 'rating' ? `${styles.switcher__buttons_btn} ${styles.active}` : styles.switcher__buttons_btn}
          onClick={() => onSortChange('rating')} // Обновите обработчик
        >
          {buttons.firstBtn}
        </button>
        <button
          className={activeButton === 'years' ? `${styles.switcher__buttons_btn} ${styles.active}` : styles.switcher__buttons_btn}
          onClick={() => onSortChange('years')} // Обновите обработчик
        >
          {buttons.secondBtn}
        </button>
      </div>
    </div>
  );
};

export default Switcher;
