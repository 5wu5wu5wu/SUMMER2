import React, { useState } from 'react';
import '../styles/Slider.css';

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  

  return (
    <div className="slider">
      <button className="slider-button prev" onClick={prevSlide}>&#10094;</button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="slider-image" />
      <button className="slider-button next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default Slider;