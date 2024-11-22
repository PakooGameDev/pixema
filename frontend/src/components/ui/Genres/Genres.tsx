import React, { useState, useRef } from 'react';
import styles from './Genres.module.scss';
import GenreCard from '../GenreCard/GenreCard';

interface GenresProps {
    label?: string;
    className?: string;
}
  
const Genres: React.FC<GenresProps> = ({ label,className }) => {
   
    const [genres, setGenres] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const addGenre = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !genres.includes(trimmedValue)) {
            setGenres([...genres, trimmedValue]);
            setInputValue('');
            inputRef.current?.focus();
        }
    };

    const removeGenre = (genre: string) => {
        setGenres(genres.filter(g => g !== genre));
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
            {genres.map((genre, index) => (
                <GenreCard id={index} text={genre} onClick={() => removeGenre(genre)}/>
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
