import React from 'react';
import { Box } from '@mui/material';
import { Header } from './Header';
import { Navigation } from './Navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Navigation />
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto', width: '100%' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
