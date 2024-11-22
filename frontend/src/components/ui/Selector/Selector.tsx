import React, {useState} from 'react';
import styles from './Selector.module.scss';

interface SelectorProps {
  label?: string;
  className?: string;
}

const Selector: React.FC<SelectorProps> = ({ label,className }) => {
  return (
    <div className={`${styles.selector} ${className}`}>
        {label && <label className={styles.selector__label}>{label}</label>}
        <select className={styles.selector__select}>
            <option className={styles.selector__option}>Select country</option>
            {/* Добавьте другие страны */}
        </select>
    </div>
  );
};

export default Selector;
