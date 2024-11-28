// src/components/Slider.tsx
import React from 'react';
import styles from './Slider.module.scss'; 
import { ReactComponent as ArrowLeft } from '../../../shared/assets/svg/ArrowLeft.svg';
import { ReactComponent as ArrowRight } from '../../../shared/assets/svg/ArrowRight.svg';

interface SliderProps {
  title?: string;
  items: React.ReactNode[];
  slidesToShow: number;
  currentIndex: number;
  sliderClassName?: string;
  contentClassName?: string;
  nextSlide: () => void;
  prevSlide: () => void;
}

const Slider: React.FC<SliderProps> = ({ title,contentClassName, sliderClassName, items, slidesToShow, currentIndex, nextSlide, prevSlide }) => {
  return (
    <div className={`${styles.slider} ${sliderClassName}`}>
      <div className={styles.slider__header}>
        <h2 className={styles.slider__header_title}>{title}</h2>
        <div className={styles.slider__header_controls}>
          <button onClick={prevSlide} className={styles.slider__arrow}>
            <ArrowLeft className={styles.slider__arrow_icon} />
          </button>
          <button onClick={nextSlide} className={styles.slider__arrow}>
            <ArrowRight className={styles.slider__arrow_icon} />
          </button>
        </div>
      </div>
      <div className={`${styles.slider__content} ${contentClassName}`} style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}>
        {items}
      </div>
    </div>
  );
};

export default Slider;
