
import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import styles from './ContentSection.module.scss';
import {  useDisplay } from '../../../context/BurgerContext';


interface ContentSectionProps {
  defaultTab: string;
  ContentComponent: ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({ defaultTab, ContentComponent}) => {
  const { display } = useDisplay();

  return (
      <div className={styles.content__section}>
        <Header defaultTab={defaultTab} />
        <div className={styles.content__section_lower}> 
          {display === 'desktop' ? <Sidebar  activeTab={defaultTab} /> : ''}
          <div className={styles.content__section_lower_content}>
            {ContentComponent}
          </div>
        </div>
      </div>

  );
};

export default ContentSection;
