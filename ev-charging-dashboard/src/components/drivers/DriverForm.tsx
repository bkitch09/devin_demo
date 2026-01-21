import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material';
import { Driver, DriverFormData } from '../../types/driver';
import { DriverStationAccess } from './DriverStationAccess';

interface DriverFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: DriverFormData) => void;
  driver?: Driver | null;
  isLoading?: boolean;
}

const initialFormData: DriverFormData = {
  firstName: '',
  lastName: '',
  email: '',
  vehicleMake: '',
  vehicleModel: '',
  stationAccess: [],
};

export const DriverForm: React.FC<DriverFormProps> = ({
  open,
  onClose,
  onSubmit,
  driver,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<DriverFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof DriverFormData, string>>>({});

  useEffect(() => {
    if (driver) {
      setFormData({
        firstName: driver.firstName,
        lastName: driver.lastName,
        email: driver.email,
        vehicleMake: driver.vehicleMake,
        vehicleModel: driver.vehicleModel,
        stationAccess: driver.stationAccess,
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [driver, open]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof DriverFormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.vehicleMake.trim()) {
      newErrors.vehicleMake = 'Vehicle make is required';
    }
    if (!formData.vehicleModel.trim()) {
      newErrors.vehicleModel = 'Vehicle model is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof DriverFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleStationAccessChange = (stationIds: string[]) => {
    setFormData(prev => ({ ...prev, stationAccess: stationIds }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const isEditing = !!driver;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{isEditing ? 'Edit Driver' : 'Add New Driver'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Vehicle Make"
                  value={formData.vehicleMake}
                  onChange={handleChange('vehicleMake')}
                  error={!!errors.vehicleMake}
                  helperText={errors.vehicleMake}
                  fullWidth
                  required
                  placeholder="e.g., Tesla"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Vehicle Model"
                  value={formData.vehicleModel}
                  onChange={handleChange('vehicleModel')}
                  error={!!errors.vehicleModel}
                  helperText={errors.vehicleModel}
                  fullWidth
                  required
                  placeholder="e.g., Model 3"
                />
              </Grid>
              <Grid item xs={12}>
                <DriverStationAccess
                  selectedStations={formData.stationAccess}
                  onChange={handleStationAccessChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isEditing ? 'Save Changes' : 'Add Driver'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
