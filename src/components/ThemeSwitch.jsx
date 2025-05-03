import React from 'react';
import CustomSwitch from './CustomSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/themeSlice';

import ICONS from '../constants/icons'

const ThemeSwitch = () => {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <CustomSwitch
        checked={mode === 'dark'}
        onChange={() => dispatch(toggleTheme())}
        icons={{ 
            checked: ICONS.moonIcon, 
            unchecked: ICONS.sunIcon 
        }}
        trackImages={{
            checked: ICONS.starIcon,
            unchecked: ICONS.cloudIcon,
        }}    
      color={{ checked: '#333', unchecked: '#fbc02d' }}
    />
  );
};

export default ThemeSwitch;