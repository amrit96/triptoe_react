import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, IconButton, MenuItem, Divider, ListItemIcon } from '@mui/material';
import Menu from '@mui/material/Menu';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { logOut } from '../features/authSlice'; 
import Cookies from 'js-cookie';

const StyledAvatarButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
  borderRadius: '50%',
  overflow: 'hidden',
  border: `2px solid ${theme.palette.divider}`,
}));

const StyledMenu = styled(Menu)(({ theme, mode }) => ({
    '& .MuiPaper-root': {
      marginTop: theme.spacing(1.5),
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
      backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)', // Translucent white or black
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.7)', // Match with dropdown
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  }));

const ProfileMenu = () => {
    const mode = useSelector((state) => state.theme.mode);
    const stateColors = useSelector((state) => state.theme.colors);
    const stateUser = useSelector((state) => state.auth.user);
    const iconSx = { color: stateColors.TEXT };
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const goToProfile = () => {
        handleClose();
        navigate('/profile'); // adjust the route if needed
    };
    
    const goToPreferences = () => {
        handleClose();
        navigate('/preferences');
    };

    const goToTrips = () => {
        handleClose();
        navigate('/trips');
    };

    const goToWishlist = () => {
        handleClose();
        navigate('/wishlist');
    };

    const handleLogout = () => {
        Cookies.remove('token');
        dispatch(logOut());
        handleClose();
        navigate('/');
    };

    return (
        <>
            <StyledAvatarButton onClick={handleClick}>
                <Avatar sx={iconSx}/>
            </StyledAvatarButton>

            <StyledMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                mode={mode}
            >
                <MenuItem onClick={goToProfile} sx={iconSx} >
                    <ListItemIcon><Avatar src={stateUser?.profilePicture || null} sx={{...iconSx, width: 20, height: 20 }} /></ListItemIcon>
                    {stateUser.firstName} {stateUser.lastName}
                </MenuItem>
                <Divider />
                <MenuItem onClick={goToPreferences} sx={iconSx} >
                    <ListItemIcon><SettingsIcon sx={iconSx} fontSize="medium" /></ListItemIcon>
                    Preferences
                </MenuItem>
                <MenuItem onClick={goToTrips} sx={iconSx} >
                    <ListItemIcon><FlightTakeoffIcon sx={iconSx} fontSize="medium" /></ListItemIcon>
                    Trips
                </MenuItem>
                <MenuItem onClick={goToWishlist} sx={iconSx} >
                    <ListItemIcon><FavoriteBorderIcon sx={iconSx} fontSize="medium" /></ListItemIcon>
                    Wishlist
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={iconSx} >
                    <ListItemIcon><LogoutIcon sx={iconSx} fontSize="smamediumll" /></ListItemIcon>
                    Logout
                </MenuItem>
            </StyledMenu>
        </>
    );
};

export default ProfileMenu;
