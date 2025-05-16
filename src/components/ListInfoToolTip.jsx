import React from 'react';
import { Tooltip, IconButton, Typography, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const ListInfoTooltip = ({ infoList }) => (
  <Tooltip
    arrow
    placement="top"
    title={
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant="body2">Password must contain:</Typography>
        <ul style={{ paddingLeft: '1.2em', margin: '0.4em 0' }}>
          {infoList.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </Box>
    }
  >
    <IconButton size="small" aria-label="password requirements">
      <InfoIcon fontSize="small" />
    </IconButton>
  </Tooltip>
);

export default ListInfoTooltip;
