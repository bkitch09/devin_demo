import React, { useState } from 'react';
import { Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDrivers, useCreateDriver, useUpdateDriver, useDeleteDriver } from '../hooks/useDrivers';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { DriverList } from '../components/drivers/DriverList';
import { DriverForm } from '../components/drivers/DriverForm';
import { DriverDeleteDialog } from '../components/drivers/DriverDeleteDialog';
import { Driver, DriverFormData } from '../types/driver';

export const Drivers: React.FC = () => {
  const { data: drivers, isLoading, error } = useDrivers();
  const createDriver = useCreateDriver();
  const updateDriver = useUpdateDriver();
  const deleteDriver = useDeleteDriver();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const handleAddClick = () => {
    setSelectedDriver(null);
    setFormOpen(true);
  };

  const handleEditClick = (driver: Driver) => {
    setSelectedDriver(driver);
    setFormOpen(true);
  };

  const handleDeleteClick = (driver: Driver) => {
    setSelectedDriver(driver);
    setDeleteDialogOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedDriver(null);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedDriver(null);
  };

  const handleFormSubmit = async (data: DriverFormData) => {
    try {
      if (selectedDriver) {
        await updateDriver.mutateAsync({ id: selectedDriver.id, data });
        setSnackbar({
          open: true,
          message: 'Driver updated successfully',
          severity: 'success',
        });
      } else {
        await createDriver.mutateAsync(data);
        setSnackbar({
          open: true,
          message: 'Driver added successfully',
          severity: 'success',
        });
      }
      handleFormClose();
    } catch {
      setSnackbar({
        open: true,
        message: selectedDriver ? 'Failed to update driver' : 'Failed to add driver',
        severity: 'error',
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDriver) return;

    try {
      await deleteDriver.mutateAsync(selectedDriver.id);
      setSnackbar({
        open: true,
        message: 'Driver deleted successfully',
        severity: 'success',
      });
      handleDeleteDialogClose();
    } catch {
      setSnackbar({
        open: true,
        message: 'Failed to delete driver',
        severity: 'error',
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert />;
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Driver Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage drivers and their access to charging stations
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={handleAddClick}>
          Add Driver
        </Button>
      </Box>

      {drivers && (
        <DriverList
          drivers={drivers}
          onEditDriver={handleEditClick}
          onDeleteDriver={handleDeleteClick}
        />
      )}

      <DriverForm
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        driver={selectedDriver}
        isLoading={createDriver.isPending || updateDriver.isPending}
      />

      <DriverDeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
        driver={selectedDriver}
        isLoading={deleteDriver.isPending}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
