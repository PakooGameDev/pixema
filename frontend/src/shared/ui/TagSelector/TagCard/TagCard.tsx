// src/components/TagCard/TagCard.tsx
import React from 'react';
import styles from './TagCard.module.scss';

interface TagCardProps {
  id: string | number;
  text: string;
  className?: string;
  onClick?: () => void;
}

const TagCard: React.FC<TagCardProps> = ({ id, text, className, onClick }) => {
  return (
    <span key={id} className={`${styles.card} ${className}`}>
        {text} <span className={styles.card__close} onClick={onClick}>✖</span>
    </span>
  );
};

export default TagCard;
