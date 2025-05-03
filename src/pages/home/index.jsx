// src/components/Home.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

import LoggedOutHome from './LoggedOutHome';
import LoggedInHome from './LoggedInHome';

const BaseCanvas = styled('div')(({stateColors}) => ({
    backgroundColor: stateColors.PRIMARY,
    height: '100%',
    width: '100%',
}));

const Home = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const stateColors = useSelector((state) => state.theme.colors);

    return (
        <BaseCanvas stateColors={stateColors}>
            {isLoggedIn ? <LoggedInHome /> : <LoggedOutHome />}
        </BaseCanvas>
    );
};

export default Home;
