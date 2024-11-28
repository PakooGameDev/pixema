import React, { useState, useEffect,useContext } from 'react';
import styles from './Header.module.scss';

import imgPath from "../../shared/assets/images/logo.png";
import imgLightPath from "../../shared/assets/images/pixema_light.png";

import { ReactComponent as Filter } from '../../shared/assets/svg/Filter.svg';
import { ReactComponent as Burger } from '../../shared/assets/svg/Burger.svg';
import FilterMenu from '../../features/FilterMenu/FilterMenu'; 
import { useTheme } from '../../app/providers/ThemeContext';
import { useDisplay } from '../../app/providers/BurgerContext';
import Sidebar from '../Sidebar/Sidebar';
import { observer } from 'mobx-react-lite';
import { movieStore } from '../../entities/Movie/Model/MovieStore';
import { Context } from '../../index';


interface HeaderProps {
    activePage: string;
}

const Header: React.FC<HeaderProps> = observer(({ activePage }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userName, setUserName] = useState<string>('Аноним'); // Состояние для имени пользователя


    const { display, setDisplay } = useDisplay();
    const { theme } = useTheme();
    const {store} = useContext(Context);

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth <= 640){
                setDisplay('mobile'); 
            } else if (window.innerWidth <= 1280) {
                setDisplay('smallDesktop');
            } else {
                setIsSidebarOpen(false);
                setDisplay('desktop');          
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 
        return () => window.removeEventListener('resize', handleResize);
    }, [setDisplay]);

    useEffect(() => {
        if(store.user){
            setUserName(store.user?.name); 
        } else {
            setUserName('Аноним'); 
        }
    }, [store.user?.name]);
    

    return (
        <>
        {display === 'mobile' ? (
            <div className={styles.header}>  
                <div className={styles.header__container}>
                    <div className={styles.header__logo}>
                        <img src={theme === 'dark' ? imgPath : imgLightPath} alt="Pixema" />
                    </div>
                    <button className={styles.header__burger} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <Burger />
                    </button>
                </div>
                <div className={styles.header__search}>
                    <input 
                        type="text" 
                        className={styles.header__search_input} 
                        placeholder="Search" 
                        value={movieStore.searchTerm} 
                        onChange={(e) => movieStore.setSearchTerm(e.target.value)} // Обновляем состояние поиска
                    />
                    <button className={styles.header__search_btn} onClick={() => setIsFilterOpen(true)}>
                        <Filter />
                    </button>
                    <FilterMenu isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} /> 
                    <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} className={styles.header__container_sidebar} activePage={activePage} />
                </div>
            </div>
        ) : (
            <div className={styles.header}>  
                <div className={styles.header__logo}>
                    <img src={theme === 'dark' ? imgPath : imgLightPath} alt="Pixema" />
                </div>
                <div className={styles.header__container}>
                    <div className={styles.header__search}>
                        <input 
                            type="text" 
                            className={styles.header__search_input} 
                            placeholder="Search" 
                            value={movieStore.searchTerm} 
                            onChange={(e) => movieStore.setSearchTerm(e.target.value)} // Обновляем состояние поиска
                        />
                        <button className={styles.header__search_btn} onClick={() => setIsFilterOpen(true)}>
                            <Filter />
                        </button>
                    </div>
                    {display === 'smallDesktop' ? ( 
                        <button className={styles.header__burger} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <Burger />
                        </button>
                    ) : (
                        <div className={styles.header__profile}>
                            <div className={styles.header__profile_logo}>{userName?.charAt(0)}</div>
                            <span className={styles.header__profile_username}>{userName}</span>
                        </div>
                    )}
                    <FilterMenu isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} /> 
                    <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} className={styles.header__container_sidebar} activePage={activePage} />
                </div>
            </div>
        )}
        </>
    );
});

export default Header;
