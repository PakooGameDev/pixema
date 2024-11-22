import React, {useState} from 'react';
import { Link } from 'react-router-dom'; 
import { ReactComponent as Favorites } from '../../../assets/svg/Favorites.svg';
import { ReactComponent as Trends } from '../../../assets/svg/Trends.svg';
import { ReactComponent as Home } from '../../../assets/svg/Home.svg';
import { ReactComponent as Settings } from '../../../assets/svg/Setting.svg';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  className?:string;
  activeTab: string; // Добавляем activeTab для определения активной вкладки
  isOpen?: boolean; 
  onClose?: () => void; 
}

const Sidebar: React.FC<SidebarProps> = ({ className,activeTab, isOpen, onClose }) => {

  return (
    <aside className={`${styles.sidebar} ${className} ${isOpen ? `${styles.open}` : ''}`}>
        <button className={styles.sidebar__close} onClick={onClose}>✖</button>
        <nav className={styles.sidebar__menu}>
          <ul>
            <li>
              <Link to="/" className={`${styles.sidebar__menu_link} ${activeTab === 'homes' ? `${styles.active}` : ''}`}>
                <Home className={styles.icon} />Home
              </Link>
            </li>
            <li>
              <Link to="/trends" className={`${styles.sidebar__menu_link} ${activeTab === 'trends' ? `${styles.active}` : ''}`}>
                <Trends className={styles.icon} />Trends
              </Link>
            </li>
            <li>
              <Link to="/favorites" className={`${styles.sidebar__menu_link} ${activeTab === 'favorites' ? `${styles.active}`: ''}`}>
                <Favorites className={styles.icon} />Favorites
              </Link>
            </li>
            <li>
              <Link to="/settings" className={`${styles.sidebar__menu_link} ${activeTab === 'settings' ? `${styles.active}` : ''}`}>
                <Settings className={styles.icon} />Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.sidebar__footer}>© All Rights Reserved</div>
    </aside>
  );
};

export default Sidebar;


