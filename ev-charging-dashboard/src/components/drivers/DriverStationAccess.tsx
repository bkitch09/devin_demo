import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useStations } from '../../hooks/useStations';

interface DriverStationAccessProps {
  selectedStations: string[];
  onChange: (stationIds: string[]) => void;
}

export const DriverStationAccess: React.FC<DriverStationAccessProps> = ({
  selectedStations,
  onChange,
}) => {
  const { data: stations, isLoading, error } = useStations();

  const handleToggle = (stationId: string) => {
    if (selectedStations.includes(stationId)) {
      onChange(selectedStations.filter(id => id !== stationId));
    } else {
      onChange([...selectedStations, stationId]);
    }
  };

  const handleSelectAll = () => {
    if (stations) {
      if (selectedStations.length === stations.length) {
        onChange([]);
      } else {
        onChange(stations.map(s => s.id));
      }
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 1 }}>
        Failed to load stations. Please try again.
      </Alert>
    );
  }

  if (!stations || stations.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No stations available.
      </Typography>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle2">
          Station Access ({selectedStations.length} of {stations.length} selected)
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedStations.length === stations.length}
              indeterminate={selectedStations.length > 0 && selectedStations.length < stations.length}
              onChange={handleSelectAll}
              size="small"
            />
          }
          label="Select All"
        />
      </Box>
      <Box
        sx={{
          maxHeight: 200,
          overflow: 'auto',
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          p: 1,
        }}
      >
        <FormGroup>
          {stations.map(station => (
            <FormControlLabel
              key={station.id}
              control={
                <Checkbox
                  checked={selectedStations.includes(station.id)}
                  onChange={() => handleToggle(station.id)}
                  size="small"
                />
              }
              label={
                <Typography variant="body2">
                  {station.name} - {station.location.city}, {station.location.state}
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
};
