import React from 'react';
import { Typography, Box } from '@mui/material';
import { useStations } from '../hooks/useStations';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { StationList } from '../components/stations/StationList';

export const StationStatus: React.FC = () => {
  const { data: stations, isLoading, error } = useStations();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Charging Station Status
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Monitor and manage all charging stations in the network
      </Typography>
      {stations && <StationList stations={stations} />}
    </Box>
  );
};
