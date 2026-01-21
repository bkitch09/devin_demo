import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import { Driver } from '../../types/driver';

interface DriverDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  driver: Driver | null;
  isLoading?: boolean;
}

export const DriverDeleteDialog: React.FC<DriverDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  driver,
  isLoading = false,
}) => {
  if (!driver) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Driver</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {driver.firstName} {driver.lastName}? This action cannot
          be undone and will remove their access to all stations.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
