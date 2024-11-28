import React from 'react';
import { Link } from 'react-router-dom'; 
import { ReactComponent as Favorites } from '../../shared/assets/svg/Favorites.svg';
import { ReactComponent as Trends } from '../../shared/assets/svg/Trends.svg';
import { ReactComponent as Home } from '../../shared/assets/svg/Home.svg';
import { ReactComponent as Settings } from '../../shared/assets/svg/Setting.svg';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  className?:string;
  activePage: string; // Добавляем activeTab для определения активной вкладки
  isOpen?: boolean; 
  onClose?: () => void; 
}

const Sidebar: React.FC<SidebarProps> = ({ className,activePage, isOpen, onClose }) => {

  return (
    <aside className={`${styles.sidebar} ${className} ${isOpen ? `${styles.open}` : ''}`}>
        <button className={styles.sidebar__close} onClick={onClose}>✖</button>
        <nav className={styles.sidebar__menu}>
          <ul>
            <li>
              <Link to="/" className={`${styles.sidebar__menu_link} ${activePage === 'homes' ? `${styles.active}` : ''}`}>
                <Home className={styles.icon} />Home
              </Link>
            </li>
            <li>
              <Link to="/trends" className={`${styles.sidebar__menu_link} ${activePage === 'trends' ? `${styles.active}` : ''}`}>
                <Trends className={styles.icon} />Trends
              </Link>
            </li>
            <li>
              <Link to="/favorites" className={`${styles.sidebar__menu_link} ${activePage === 'favorites' ? `${styles.active}`: ''}`}>
                <Favorites className={styles.icon} />Favorites
              </Link>
            </li>
            <li>
              <Link to="/settings" className={`${styles.sidebar__menu_link} ${activePage === 'settings' ? `${styles.active}` : ''}`}>
                <Settings className={styles.icon} />Settings
              </Link>
            </li>
          </ul>
        </nav>
        <footer className={styles.sidebar__footer}>© All Rights Reserved</footer>
    </aside>
  );
};

export default Sidebar;


