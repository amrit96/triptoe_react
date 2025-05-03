import React from "react";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const StyledSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
    ({ thumbColor, thumbIconChecked, thumbIconUnchecked, trackImages }) => ({
      width: 50,
      height: 28,
      padding: 0,
      display: 'flex',
      '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
          transform: 'translateX(22px)',
          color: '#fff',
          '& + .MuiSwitch-track': {
            backgroundImage: trackImages?.checked ? `url("data:image/svg+xml;utf8,${encodeURIComponent(trackImages.checked)}")` : 'none',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'transparent',
          },
          '& .MuiSwitch-thumb': {
            backgroundColor: thumbColor?.checked || '#333',
            backgroundImage: thumbIconChecked ? `url("data:image/svg+xml;utf8,${encodeURIComponent(thumbIconChecked)}")` : 'none',
          },
        },
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: thumbColor?.unchecked || '#ccc',
        width: 24,
        height: 24,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: thumbIconUnchecked ? `url("data:image/svg+xml;utf8,${encodeURIComponent(thumbIconUnchecked)}")` : 'none',
      },
      '& .MuiSwitch-track': {
        borderRadius: 28 / 2,
        opacity: 1,
        backgroundImage: trackImages?.unchecked ? `url("data:image/svg+xml;utf8,${encodeURIComponent(trackImages.unchecked)}")` : 'none',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
      },
    })
  );

  const CustomSwitch = ({ checked, onChange, icons = {}, color = {}, trackImages = {} }) => {
    return (
      <StyledSwitch
        checked={checked}
        onChange={onChange}
        thumbIconChecked={icons.checked}
        thumbIconUnchecked={icons.unchecked}
        thumbColor={color}
        trackImages={trackImages}
      />
    );
  };
  
  export default CustomSwitch;