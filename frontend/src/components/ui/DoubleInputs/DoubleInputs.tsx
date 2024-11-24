import React, { useState } from 'react';
import styles from './DoubleInputs.module.scss';
import Input from '../Input/Input';

interface InputTypeProps {
    first: string;
    second: string;
}

interface InputPlaceholdersProps {
    first: string;
    second: string;
}

interface DoubleInputProps {
    label?: string;
    types: InputTypeProps;
    placeholders?: InputPlaceholdersProps;
    className?: string;
    value: [string | null, string | null];
    onChange: (from: string | null, to: string | null) => void;
}

const DoubleInput: React.FC<DoubleInputProps> = ({ label, types, placeholders = { first: '', second: '' }, className, value, onChange }) => {
    const [from, setFrom] = useState(value[0]);
    const [to, setTo] = useState(value[1]);

    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFrom(newValue);
        onChange(newValue, to);
    };

    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setTo(newValue);
        onChange(from, newValue);
    };

    return (
        <div className={styles.double}>
            {label && <label className={styles.double__label}>{label}</label>}
            <div className={styles.double__fields}>
                <Input 
                    className={`${styles.double__fields_input} ${className}`} 
                    placeholder={placeholders.first}
                    type={types.first} 
                    value={from || ''} 
                    onChange={handleFromChange} 
                />
                <Input 
                    className={`${styles.double__fields_input} ${className}`} 
                    placeholder={placeholders.second} 
                    type={types.second} 
                    value={to || ''} 
                    onChange={handleToChange} 
                />
            </div>
        </div>
    );
};

export default DoubleInput;
