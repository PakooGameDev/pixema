import React from 'react';
import { useTheme } from '../../../app/providers/ThemeContext';
import styles from './ToggleSwitch.module.scss'; 

const ToggleSwitch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.toggle}>
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        id="theme-toggle"
        className={styles.toggle__checkbox}
      />
      <label htmlFor="theme-toggle" className={styles.toggle__label}>
        <span className={styles.toggle__slider}></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;



