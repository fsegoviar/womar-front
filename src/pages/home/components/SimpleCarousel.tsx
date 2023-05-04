import { current } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

export const SimpleCarousel = () => {
  const slides = [
    {
      url: require('../../../assets/images/banner-1.png')
    },
    {
      url: require('../../../assets/images/banner-2.png')
    },
    {
      url: require('../../../assets/images/banner-3.png')
    },
    {
      url: require('../../../assets/images/banner-4.png')
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

	setTimeout(nextSlide, 4000);

  return (
    <div className=" m-auto relative h-[220px] sm:h-[520px] w-screen z-1">
      {/* Contenedor de imagene slide */}
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-no-repeat bg-cover sm:bg-contain duration-500 lg:bg-cover"
      ></div>
      {/* Flecha izquierda */}
      <div className=" absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Flecha derecha */}
      <div className=" group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      {/* Buttons down */}
      <div className="absolute translate-x-[0] -translate-y-[100%] w-full flex justify-center py-2 ">
        {slides.map((slide, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className="text-2xl cursor-pointer"
          >
            {currentIndex === index ? (
              <RxDotFilled size={40} color={'white'} />
            ) : (
              <RxDotFilled size={40} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
