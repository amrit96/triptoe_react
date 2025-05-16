import React from 'react';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import TopNav from '../../components/TopNav';
import ImageCarousel from '../../components/ImageCarousel';
import LogInCard from '../../components/LogInCard';

const LoggedOutHome = () => {
    const images = [
        '/banner/AllIndia.jpeg',
        '/banner/bengaluru.jpeg',
        '/banner/darjeeling.jpeg',
        '/banner/kerala.jpeg',
        '/banner/kolkata.jpeg',
        '/banner/VandeBharat.jpeg',
        '/banner/varanasi.jpeg',
    ]; // place these in `public/`

    const stateColors = useSelector((state) => state.theme.colors);

    const IntroTextStyle = styled('div')(({stateColors}) => ({
        color: stateColors.TEXT,
        padding: '1rem',
        textAlign: 'center',
    }));

    return (
        <div>
            <TopNav />
            {/* 🔹 Banner Carousel */}
            <ImageCarousel images={images} autoScroll={true} height={'650px'} />

            {/* 🔹 Intro Text */}
            <IntroTextStyle stateColors={stateColors}>
                <h2>Welcome to Trip Toe</h2>
                <p>
                Your personalized travel assistant. Explore destinations, pin your
                memories, and plan your next adventure all in one place.
                </p>
            </IntroTextStyle>
            <LogInCard />
        </div>
    );
};

export default LoggedOutHome;
