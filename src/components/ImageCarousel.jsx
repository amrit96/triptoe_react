import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import COLORS from '../constants/colors';

// 🔹 Styled Components
const CarouselContainer = styled(Box)(({dotColor}) => ({
  width: '100%',
  maxWidth: '100%',
  position: 'relative',
  overflow: 'visible',
  paddingBottom: '30px', // space for dots
  '.slick-dots li button:before': {
    color: dotColor || COLORS.light.TEXT,
    fontSize: '10px',
  },
  '.slick-dots li.slick-active button:before': {
    color: COLORS.common.TERTIARY,
  },
}));

const ImageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'carouselHeight',
})(({ carouselHeight }) => ({
  width: '100%',
  height: carouselHeight,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}));

const SlideImage = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
}));

const ArrowButton = styled(IconButton)(({ position }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 5,
  [position]: 10,
  color: '#fff',
  backgroundColor: 'rgba(0,0,0,0.6)',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
}));

// 🔹 Custom Arrows
const NextArrow = ({ onClick }) => (
  <ArrowButton onClick={onClick} position="right">
    <ArrowForwardIos fontSize="small" />
  </ArrowButton>
);

const PrevArrow = ({ onClick }) => (
  <ArrowButton onClick={onClick} position="left">
    <ArrowBackIos fontSize="small" />
  </ArrowButton>
);

// 🔹 Main Carousel Component
const ImageCarousel = ({ images = [], autoScroll = true, height = '500px' }) => {
  const sliderRef = useRef(null);
  const stateColors = useSelector((state) => state.theme.colors);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoScroll,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: false,
  };

  return (
    <CarouselContainer dotColor={stateColors.TEXT}>
      <Slider ref={sliderRef} {...settings}>
        {images.map((src, index) => (
          <ImageContainer key={`slide-${index}`} carouselHeight={height}>
            <SlideImage src={src} alt={`Slide ${index}`} />
          </ImageContainer>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default ImageCarousel;
