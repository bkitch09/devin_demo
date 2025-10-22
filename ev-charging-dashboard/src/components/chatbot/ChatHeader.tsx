import React from 'react';
import { Box, Typography, IconButton, Chip, Divider } from '@mui/material';
import { Close, Minimize } from '@mui/icons-material';
import { Station } from '../../types/station';
import { StationStatusBadge } from '../stations/StationStatusBadge';

interface ChatHeaderProps {
  station?: Station;
  onClose: () => void;
  onMinimize?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ station, onClose, onMinimize }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            AI Troubleshooting Assistant
          </Typography>
          {station && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Typography variant="body2">{station.name}</Typography>
              <Chip
                label={station.location.city}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'inherit',
                  height: 20,
                  fontSize: '0.7rem',
                }}
              />
              <Box sx={{ ml: 1 }}>
                <StationStatusBadge status={station.status} />
              </Box>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {onMinimize && (
            <IconButton size="small" onClick={onMinimize} sx={{ color: 'inherit' }}>
              <Minimize />
            </IconButton>
          )}
          <IconButton size="small" onClick={onClose} sx={{ color: 'inherit' }}>
            <Close />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </>
  );
};
