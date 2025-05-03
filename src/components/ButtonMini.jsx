import React from "react";
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledMini = styled(Button)(({stateColors}) => ({
    color: stateColors.TEXT_SECONDARY,
    borderColor: stateColors.SECONDARY,
    backgroundColor: stateColors.SECONDARY,
    '&:hover': {
        backgroundColor: stateColors.TERTIARY,
    },
}));

const ButtonMini = ({displayText="Submit", onClick}) => {
    const colorMode = useSelector((state) => state.theme.mode);
    const stateColors = useSelector((state) => state.theme.colors);
    console.log("colorMode", colorMode)
    return (
        <StyledMini 
            variant={"contained"} 
            stateColors={stateColors} 
            onClick={onClick}
        >
            {displayText}
        </StyledMini>
    );
};

export default ButtonMini;