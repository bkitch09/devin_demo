import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import { Email, DirectionsCar, Edit, Delete } from '@mui/icons-material';
import { Driver } from '../../types/driver';

interface DriverCardProps {
  driver: Driver;
  onEdit?: (driver: Driver) => void;
  onDelete?: (driver: Driver) => void;
}

export const DriverCard: React.FC<DriverCardProps> = ({ driver, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Typography variant="h6" component="div">
            {driver.firstName} {driver.lastName}
          </Typography>
          <Box>
            {onEdit && (
              <IconButton
                size="small"
                onClick={e => {
                  e.stopPropagation();
                  onEdit(driver);
                }}
                aria-label="edit driver"
              >
                <Edit fontSize="small" />
              </IconButton>
            )}
            {onDelete && (
              <IconButton
                size="small"
                onClick={e => {
                  e.stopPropagation();
                  onDelete(driver);
                }}
                aria-label="delete driver"
                color="error"
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Email fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {driver.email}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DirectionsCar fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {driver.vehicleMake} {driver.vehicleModel}
          </Typography>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            Station Access
          </Typography>
          <Chip
            label={`${driver.stationAccess.length} station${driver.stationAccess.length !== 1 ? 's' : ''}`}
            size="small"
            color={driver.stationAccess.length > 0 ? 'primary' : 'default'}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
