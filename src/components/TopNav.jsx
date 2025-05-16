import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import ThemeSwitch from './ThemeSwitch';
import ButtonMini from './ButtonMini';
import ProfileMenu from './ProfileMenu';
import LogInCard from './LogInCard';
import SignUpCard from './SingUpCard';
import COLORS from '../constants/colors';


// Replace with your SVG
const Logo = ({color = COLORS.light.TEXT}) => (
    <svg 
        fill={color} 
        height="40px" 
        width="40px" 
        version="1.1" 
        id="Layer_1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 512 512" 
        enable-background="new 0 0 512 512" 
        xml:space="preserve">
        <path d="M256,0C149.3,0,64,85.3,64,192c0,36.9,11,65.4,30.1,94.3l141.7,215v0c4.3,6.5,11.7,10.7,20.2,10.7c8.5,0,16-4.3,20.2-10.7l141.7-215C437,257.4,448,228.9,448,192C448,85.3,362.7,0,256,0z M256,298.6c-58.9,0-106.7-47.8-106.7-106.8c0-59,47.8-106.8,106.7-106.8c58.9,0,106.7,47.8,106.7,106.8C362.7,250.8,314.9,298.6,256,298.6z"/>
    </svg>
);

// Styled AppBar
const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#8C8A8A0B',
  color: '#000',
  zIndex: 1300,
  position: 'sticky',
  top: 0,
}));



const TopNav = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const stateColors = useSelector((state) => state.theme.colors);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    
    const handleOpenLogin = () => {
        setIsSignUpOpen(false)
        setIsLoginOpen(true);
    };

    const handleCloseLogin = () => {
        setIsLoginOpen(false);
    };

    const handleOpenSignUp = () => {
        setIsLoginOpen(false)
        setIsSignUpOpen(true)
    }

    const handleCloseSignUp = () => {
        setIsSignUpOpen(false)
    }

    return (
        <StyledAppBar>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Left Side */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Logo color={stateColors.TEXT}/>
            <Typography variant="h6"  sx={{ color: stateColors.TEXT }} >Trip Toe</Typography>
            </Box>

            {/* Right Side */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ThemeSwitch />
            { isLoggedIn 
                ? <ProfileMenu />
                : <>
                    <ButtonMini onClick={handleOpenLogin} displayText={"Log In"} />
                    <LogInCard isOpen={isLoginOpen} onClose={handleCloseLogin} signUp={handleOpenSignUp} />
                    <SignUpCard isOpen={isSignUpOpen} onClose={handleCloseSignUp} logIn={handleOpenLogin} />
                </>}
            </Box>
        </Toolbar>
        </StyledAppBar>
    );
};

export default TopNav;
