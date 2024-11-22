import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  label?: string;
  type:string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label,type, placeholder, value, onChange, className }) => {
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
