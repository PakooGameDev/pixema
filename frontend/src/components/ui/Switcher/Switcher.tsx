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
}

const Switcher: React.FC<SwitcherProps> = ({ label,buttons,className }) => {
  const [activeButton, setActiveButton] = useState('a');

  const handleButtonClick = (buttonValue: string) => {
    setActiveButton(buttonValue);
  };

  return (
    <div className={`${styles.switcher} ${className}`}>
       {label && <label className={styles.switcher__label}>{label}</label>}
      <div className={styles.switcher__buttons}>
        <button
          className={activeButton === 'a'? `${styles.switcher__buttons_btn} ${styles.active}` : styles.switcher__buttons_btn}
          onClick={() => handleButtonClick('a')}
        >{buttons.firstBtn}
        </button>
        <button
          className={activeButton === 'b'? `${styles.switcher__buttons_btn} ${styles.active}` : styles.switcher__buttons_btn}
          onClick={() => handleButtonClick('b')}
        >{buttons.secondBtn}
        </button>
      </div>
    </div>
  );
};

export default Switcher;