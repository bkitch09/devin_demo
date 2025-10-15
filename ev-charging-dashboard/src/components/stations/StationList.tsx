import React, { useState, useMemo } from 'react';
import {
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Station, StationStatus } from '../../types/station';
import { StationCard } from './StationCard';

interface StationListProps {
  stations: Station[];
  onStationClick?: (station: Station) => void;
}

export const StationList: React.FC<StationListProps> = ({ stations, onStationClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredStations = useMemo(() => {
    return stations.filter(station => {
      const matchesSearch =
        station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.location.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || station.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [stations, searchTerm, statusFilter]);

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Search stations"
          variant="outlined"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Status Filter</InputLabel>
          <Select value={statusFilter} label="Status Filter" onChange={handleStatusChange}>
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value={StationStatus.AVAILABLE}>Available</MenuItem>
            <MenuItem value={StationStatus.IN_USE}>In Use</MenuItem>
            <MenuItem value={StationStatus.OFFLINE}>Offline</MenuItem>
            <MenuItem value={StationStatus.ERROR}>Error</MenuItem>
            <MenuItem value={StationStatus.MAINTENANCE}>Maintenance</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredStations.map(station => (
          <Grid item xs={12} sm={6} md={4} key={station.id}>
            <StationCard
              station={station}
              onClick={onStationClick ? () => onStationClick(station) : undefined}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
