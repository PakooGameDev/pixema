// src/widgets/Content/ContentWrapper.tsx
import React from 'react';
import { Sidebar, Header } from '../index';
import styles from './ContentWrapper.module.scss';
import { useDisplay } from '../../app/providers/BurgerContext';
import { observer } from 'mobx-react-lite';

interface ContentWrapperProps {
  activePage: string;
  children: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ activePage, children }) => {
  const { display } = useDisplay();

  return (
    <div className={styles.wrapper}>
      <Header activePage={activePage} />
      {display === 'desktop' && <Sidebar activePage={activePage} />}
      <div className={styles.wrapper__content}>    
        <div className={styles.wrapper__children}>{children}</div>
      </div>
    </div>
  );
};

export default observer(ContentWrapper);
