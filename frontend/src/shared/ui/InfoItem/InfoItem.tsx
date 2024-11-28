// src/components/InfoItem/InfoItem.tsx
import React from 'react';
import styles from './InfoItem.module.scss'; 

interface InfoItemProps {
    title: string;
    description: string | number; 
}

const InfoItem: React.FC<InfoItemProps> = ({ title, description }) => {
    return (
        <div className={styles.movie__info}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default InfoItem;
