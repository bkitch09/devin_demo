import React from 'react';
import { Chip } from '@mui/material';
import { StationStatus } from '../../types/station';

interface StationStatusBadgeProps {
  status: StationStatus;
}

const statusConfig = {
  [StationStatus.AVAILABLE]: { label: 'Available', color: 'success' as const },
  [StationStatus.IN_USE]: { label: 'In Use', color: 'primary' as const },
  [StationStatus.OFFLINE]: { label: 'Offline', color: 'default' as const },
  [StationStatus.ERROR]: { label: 'Error', color: 'error' as const },
  [StationStatus.MAINTENANCE]: { label: 'Maintenance', color: 'warning' as const },
};

export const StationStatusBadge: React.FC<StationStatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  return <Chip label={config.label} color={config.color} size="small" />;
};
