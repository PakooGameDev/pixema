import React from 'react';
import styles from './Switcher.module.scss';

interface ButtonProps {
    value: string; // Значение кнопки
    label: string; // Подпись кнопки
}

interface SwitcherProps<T> {
    label?: string;
    buttons: ButtonProps[]; 
    className?: string;
    activeButton: T; 
    onChange: (value: T) => void; 
}

const Switcher = <T extends string>({ label, buttons, className, activeButton, onChange }: SwitcherProps<T>) => {
    return (
        <div className={`${styles.switcher} ${className}`}>
            {label && <label className={styles.switcher__label}>{label}</label>}
            <div className={styles.switcher__buttons}>
                {buttons.map((button) => (
                    <button
                        key={button.value}
                        className={activeButton === button.value ? `${styles.switcher__buttons_btn} ${styles.active}` : styles.switcher__buttons_btn}
                        onClick={() => onChange(button.value as T)}
                    >
                        {button.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Switcher;
