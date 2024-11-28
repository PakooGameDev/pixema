// src/hooks/useSlider.ts
import { useState, useEffect } from 'react';

const useSlider = (items: any[], initialSlidesToShow: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(initialSlidesToShow);

  const updateSlidesToShow = () => {
    const width = window.innerWidth;
    if (width >= 1560) {
      setSlidesToShow(4);
    } else if (width >= 900) {
      setSlidesToShow(3);
    } else if (width >= 600) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(1);
    }
  };

  useEffect(() => {
    updateSlidesToShow(); 
    window.addEventListener('resize', updateSlidesToShow);

    return () => {
      window.removeEventListener('resize', updateSlidesToShow); 
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(items.length / slidesToShow));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(items.length / slidesToShow)) % Math.ceil(items.length / slidesToShow));
  };

  return { currentIndex, slidesToShow, nextSlide, prevSlide };
};

export default useSlider;
