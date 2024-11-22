import React from 'react';
import styles from './GenreCard.module.scss';

interface GenreCardProps {
  id: string | number;
  text:string;
  className?: string;
  onClick?: () => void;
}

const GenreCard: React.FC<GenreCardProps> = ({ id, text, className, onClick }) => {
  return (
    <span key={id} className={`${styles.card} ${className}`}>
        {text} <span className={styles.card__close} onClick={onClick}>✖</span>
    </span>
  );
};

export default GenreCard;
