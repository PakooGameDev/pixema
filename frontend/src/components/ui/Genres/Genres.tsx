import React, { useState, useRef } from 'react';
import styles from './Genres.module.scss';
import GenreCard from '../GenreCard/GenreCard';

interface GenresProps {
    label?: string;
    className?: string;
    value?: string[]; // Массив выбранных жанров
    onChange?: (genres: string[]) => void; // Обработчик изменений
}
  
const Genres: React.FC<GenresProps> = ({ label, className, value = [], onChange }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const addGenre = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !value.includes(trimmedValue)) {
            const newGenres = [...value, trimmedValue];
            setInputValue('');
            inputRef.current?.focus();
            if (onChange) {
                onChange(newGenres); // Передаем изменения родительскому компоненту
            }
        }
    };

    const removeGenre = (genre: string) => {
        const newGenres = value.filter(g => g !== genre);
        if (onChange) {
            onChange(newGenres); // Передаем изменения родительскому компоненту
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addGenre();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className={styles.genre__container}>
            {label && <label className={styles.genre__label}>{label}</label>}
            <div className={`${styles.genre} ${className}`}>
                {value.map((genre, index) => (
                    <GenreCard key={index} id={index} text={genre} onClick={() => removeGenre(genre)} />
                ))}
                <input 
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                    className={styles.genre__input}
                    placeholder="Your genre"
                />
            </div>
        </div>
    );
};

export default Genres;
