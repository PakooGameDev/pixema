import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './FilterMenu.module.scss';
import Input from '../../ui/Input/Input';
import Genres from '../../ui/Genres/Genres';
import Switcher from '../../ui/Switcher/Switcher';
import DoubleInput from '../../ui/DoubleInputs/DoubleInputs';
import Selector from '../../ui/Selector/Selector';
import { movieStore } from '../../../store/MovieStore'; // Импортируйте ваше хранилище

interface FilterMenuProps { 
    isOpen?: boolean; 
    onClose?: () => void; 
}

const FilterMenu: React.FC<FilterMenuProps> = observer(({ isOpen = true, onClose }) => {
    const [movie, setMovie] = useState('');
    const [country, setCountry] = useState('');
    const [genre, setGenre] = useState<string[]>([]);
    const [years, setYears] = useState<[string | null, string | null]>([null, null]);
    const [ratings, setRatings] = useState<[string | null, string | null]>([null, null]);
    const [sortBy, setSortBy] = useState('rating'); // Добавьте состояние сортировки

    const handleShowResults = () => {
        // Обновляем фильтры в хранилище
        movieStore.setFilters({
            title: movie,
            genre: genre.join('|'), // Преобразуем массив жанров в строку
            country,
            years,
            ratings,
            sortBy, // Добавьте это свойство
        });
        movieStore.filterMovies(); // Не забудьте вызвать фильтрацию
        onClose && onClose(); // Закрываем меню фильтров после получения результатов
    };

    return (
        <div className={`${styles.filter} ${isOpen ? `${styles.open}` : ''}`}>
            <div className={styles.filter__container}>
                <div className={styles.filter__container_header}>
                    <h2>Filters</h2>
                    <button className={styles.filter__container_close} onClick={onClose}>✖</button>
                </div>
                <Switcher 
                    className={styles.filter__container_sort} 
                    label='Sort by' 
                    buttons={{ firstBtn: 'rating', secondBtn: 'years' }} 
                    activeButton={sortBy} // Передайте текущее состояние сортировки
                    onSortChange={setSortBy} // Передайте функцию для обновления состояния сортировки
                />
                <div className={styles.filter__container_fields}>
                    <Input placeholder="Your text" className={styles.filter__container_search} label="Full or short movie name" type="text" value={movie} onChange={(e) => setMovie(e.target.value)} />
                    <Selector label='Country' value={country} onChange={setCountry} />
                    <Genres label='Genre' value={genre} onChange={setGenre} />
                    <DoubleInput 
                        label='Years'
                        placeholders={{ first: 'From', second: 'To' }} 
                        types={{ first: 'number', second: 'number' }}
                        value={years}
                        onChange={(from, to) => setYears([from, to])}
                    />
                    <DoubleInput 
                        label='Rating'
                        placeholders={{ first: 'From', second: 'To' }} 
                        types={{ first: 'number', second: 'number' }}
                        value={ratings}
                        onChange={(from, to) => setRatings([from, to])}
                    />
                </div>
                <div className={styles.filter__buttons}>
                    <button className={styles.filter__buttons_btn} onClick={() => { /* Логика очистки фильтров */ }}>Clear filter</button>
                    <button className={styles.filter__buttons_btn} onClick={handleShowResults}>Show results</button>
                </div>
            </div>
        </div>
    );
});

export default FilterMenu;
