import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import imgPath from "../../../assets/images/logo.png";
import imgLightPath from "../../../assets/images/pixema_light.png";
import { ReactComponent as Arrow } from '../../../assets/svg/ArrowDown.svg';
import { ReactComponent as Filter } from '../../../assets/svg/Filter.svg';
import { ReactComponent as Burger } from '../../../assets/svg/Burger.svg';
import FilterMenu from '../FilterMenu/FilterMenu'; 
import { useTheme } from '../../../context/ThemeContext';
import { useDisplay } from '../../../context/BurgerContext';
import Sidebar from '../Sidebar/Sidebar';
import { logout } from '../../../utils/api/auth';


interface HeaderProps {
    defaultTab: string;
}

const Header: React.FC<HeaderProps> = ({defaultTab}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [profileAction, setProfileAction] = useState('');
    const { display, setDisplay } = useDisplay(); // Изменено на setDisplay
    const { theme } = useTheme();
    const navigate = useNavigate();
    const access_token = localStorage.getItem('access_token');

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth <= 640){
                setDisplay('mobile'); 
            } else if (window.innerWidth <= 1280) {
                setDisplay('smallDesktop');
            } else {
                setIsSidebarOpen(false)
                setDisplay('desktop')          
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 
        return () => window.removeEventListener('resize', handleResize);
    }, [setDisplay]);


    const handleProfileClick = () => {
        isProfileOpen ? setIsProfileOpen(false) : setIsProfileOpen(true)
    }

    useEffect(() => {
     if (!access_token) {
      setProfileAction('Log In');
     } else {
      setProfileAction('Log Out');
     }
    }, [access_token]); // Зависимость от token



    const handleLogout = async () => {
        try {
         if (access_token) { 
          await logout();
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          navigate('/login');
         } else {
          navigate('/login'); 
         }
        } catch (error) {
         console.error('Error logging out:', error);
        }
       };

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
                              <input type="text" className={styles.header__search_input} placeholder="Search" />
                              <button className={styles.header__search_btn} onClick={() => setIsFilterOpen(true)}>
                                  <Filter />
                              </button>
                              <FilterMenu isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} /> 
                              <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} className={styles.header__container_sidebar} activeTab={defaultTab} />
                          </div>
                    </div>
            ) : (
                <div className={styles.header}>  
                    <div className={styles.header__logo}>
                        <img src={theme === 'dark' ? imgPath : imgLightPath} alt="Pixema" />
                    </div>
                    <div className={styles.header__container}>
                        <div className={styles.header__search}>
                            <input type="text" className={styles.header__search_input} placeholder="Search" />
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
                                <div className={styles.header__profile_logo}>AL</div>
                                <span className={styles.header__profile_username}>Artem Lapitsky</span>
                                <Arrow className={styles.header__profile_arrow} onClick={() => handleProfileClick()}/>
                                <button className={isProfileOpen ? styles.logout_open : styles.logout} onClick={() => handleLogout()}>{profileAction}</button>
                            </div>
                        )}
                        <FilterMenu isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} /> 
                        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} className={styles.header__container_sidebar} activeTab={defaultTab} />
                    </div>
                </div>
            ) }
        </>

    );
};

export default Header;
