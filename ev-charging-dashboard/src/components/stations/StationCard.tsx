import { Grid } from '@mui/material';
import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';

import { LocationOn, Bolt, AccessTime } from '@mui/icons-material';
import { Station } from '../../types/station';
import { StationStatusBadge } from './StationStatusBadge';
import { formatPower, formatRelativeTime, formatEnergy } from '../../utils/formatters';

interface StationCardProps {
  station: Station;
  onClick?: () => void;
}

export const StationCard: React.FC<StationCardProps> = ({ station, onClick }) => {
  return (
    <Card
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { boxShadow: 6 } : {},
        transition: 'box-shadow 0.3s',
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}
        >
          <Typography variant="h6" component="div">
            {station.name}
          </Typography>
          <StationStatusBadge status={station.status} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {station.location.city}, {station.location.state}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Bolt fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {formatPower(station.currentOutput)} / {formatPower(station.powerCapacity)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccessTime fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Last seen: {formatRelativeTime(station.lastHeartbeat)}
          </Typography>
        </Box>

        {station.session && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Active Session
            </Typography>
            <Grid container spacing={1} sx={{ mt: 0.5 }}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  Energy: {formatEnergy(station.session.energyDispensed)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  Power: {formatPower(station.session.currentPower)}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
};
