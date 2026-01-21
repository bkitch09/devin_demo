import React, { useState, useMemo } from 'react';
import { Grid, TextField, Box } from '@mui/material';
import { Driver } from '../../types/driver';
import { DriverCard } from './DriverCard';

interface DriverListProps {
  drivers: Driver[];
  onEditDriver?: (driver: Driver) => void;
  onDeleteDriver?: (driver: Driver) => void;
}

export const DriverList: React.FC<DriverListProps> = ({
  drivers,
  onEditDriver,
  onDeleteDriver,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = useMemo(() => {
    return drivers.filter(driver => {
      const searchLower = searchTerm.toLowerCase();
      return (
        driver.firstName.toLowerCase().includes(searchLower) ||
        driver.lastName.toLowerCase().includes(searchLower) ||
        driver.email.toLowerCase().includes(searchLower) ||
        driver.vehicleMake.toLowerCase().includes(searchLower) ||
        driver.vehicleModel.toLowerCase().includes(searchLower)
      );
    });
  }, [drivers, searchTerm]);

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Search drivers"
          variant="outlined"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
          placeholder="Search by name, email, or vehicle..."
        />
      </Box>

      <Grid container spacing={3}>
        {filteredDrivers.map(driver => (
          <Grid item xs={12} sm={6} md={4} key={driver.id}>
            <DriverCard
              driver={driver}
              onEdit={onEditDriver}
              onDelete={onDeleteDriver}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
