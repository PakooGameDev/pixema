import React from 'react';
import styles from './Selector.module.scss';

interface SelectorProps {
  label?: string;
  className?: string;
  value?: string;
  selections?: string[];  
  onChange?: (value: string) => void; // Добавляем обработчик изменений
}

const Selector: React.FC<SelectorProps> = ({ label, className, value, selections, onChange }) => {

 // Пример списка стран

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`${styles.selector} ${className}`}>
      {label && <label className={styles.selector__label}>{label}</label>}
      <select className={styles.selector__select} value={value} onChange={handleChange}>
        <option className={styles.selector__option} value="">Select country</option>
        {selections?.map((country, index) => (
          <option key={index} className={styles.selector__option} value={country}>{country}</option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
