import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7, ElectricBolt } from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <AppBar position="static" sx={{ width: '100vw' }}>
      <Toolbar>
        <ElectricBolt sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EV Charging Network Manager
        </Typography>
        <Box>
          <IconButton color="inherit" onClick={toggleTheme} aria-label="toggle theme">
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
