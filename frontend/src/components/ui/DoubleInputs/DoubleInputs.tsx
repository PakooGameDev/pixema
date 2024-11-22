import React, {useState} from 'react';
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
  types:InputTypeProps;
  placeholders?:InputPlaceholdersProps;
  className?: string;
}

const DoubleInput: React.FC<DoubleInputProps> = ({ label,types,placeholders={first:'',second:''},className }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  return (
    <div className={styles.double}>
         {label && <label className={styles.double__label}>{label}</label>}
        <div className={styles.double__fields}>
            <Input 
                className={`${styles.double__fields_input} ${className}`} 
                placeholder={placeholders.first}
                type={types.first} 
                value={from} 
                onChange={(e) => setFrom(e.target.value)} />
            <Input 
                className={`${styles.double__fields_input} ${className}`} 
                placeholder={placeholders.second} 
                type={types.second} 
                value={to} 
                onChange={(e) => setTo(e.target.value)} />
        </div>
    </div>
  );
};

export default DoubleInput;
