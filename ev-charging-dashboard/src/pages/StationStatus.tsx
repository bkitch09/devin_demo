import React, { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useStations } from '../hooks/useStations';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { StationList } from '../components/stations/StationList';
import { AddStationDialog } from '../components/stations/AddStationDialog';

export const StationStatus: React.FC = () => {
  const { data: stations, isLoading, error } = useStations();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Charging Station Status
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor and manage all charging stations in the network
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsAddDialogOpen(true)}
        >
          Add Station
        </Button>
      </Box>
      {stations && <StationList stations={stations} />}
      <AddStationDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
    </Box>
  );
};
