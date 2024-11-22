import React, { useState } from 'react';
import  styles from './FilterMenu.module.scss';
import Input from '../../ui/Input/Input';
import Genres from '../../ui/Genres/Genres';
import Switcher from '../../ui/Switcher/Switcher';
import DoubleInput from '../../ui/DoubleInputs/DoubleInputs';
import Selector from '../../ui/Selector/Selector';


interface FilterMenuProps { 
    isOpen?: boolean; 
    onClose?: () => void; 
}

const FilterMenu: React.FC<FilterMenuProps> = ({ isOpen = true, onClose }) => {

    const [movie, setMovie] = useState('');


    return (
        <div className={`${styles.filter} ${isOpen ? `${styles.open}` : ''}`}>
            <div className={styles.filter__container}>
                <div className={styles.filter__container_header}>
                    <h2>Filters</h2>
                    <button className={styles.filter__container_close} onClick={onClose}>✖</button>
                </div>
                <Switcher className={styles.filter__container_sort} label='Sort by' buttons={{firstBtn:'rating', secondBtn:'years'}}/>
                <div className={styles.filter__container_fields}>
                    <Input placeholder="Your text" className={styles.filter__container_search} label="Full or short movie name" type="text" value={movie} onChange={(e) => setMovie(e.target.value)}></Input>
                    <Selector label='Country'/>
                    <Genres label='Genre'/>
                    <DoubleInput 
                        label='Years'
                        placeholders={{first:'From', second:'To'}} 
                        types={{first:'number', second:'number'}}
                    />
                    <DoubleInput 
                        label='Rating'
                        placeholders={{first:'From', second:'To'}} 
                        types={{first:'number', second:'number'}}
                    />
                </div>
                <div className={styles.filter__buttons}>
                    <button className={styles.filter__buttons_btn}>Clear filter</button>
                    <button className={styles.filter__buttons_btn}>Show results</button>
                </div>
            </div>
        </div>
    );
};

export default FilterMenu;



