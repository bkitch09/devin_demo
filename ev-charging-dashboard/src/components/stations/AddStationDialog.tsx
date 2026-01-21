import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import { CreateStationRequest, Location } from '../../types/station';
import { useCreateStation } from '../../hooks/useStations';

interface AddStationDialogProps {
  open: boolean;
  onClose: () => void;
}

const initialFormState: CreateStationRequest = {
  name: '',
  location: {
    address: '',
    city: '',
    state: '',
    zipCode: '',
    coordinates: {
      lat: 0,
      lng: 0,
    },
  },
  amps: 0,
  volts: 0,
  power: 0,
};

export const AddStationDialog: React.FC<AddStationDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState<CreateStationRequest>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate: createStation, isPending, error, reset } = useCreateStation();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Station name is required';
    }
    if (!formData.location.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.location.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.location.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.location.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    if (formData.amps <= 0) {
      newErrors.amps = 'Amps must be greater than 0';
    }
    if (formData.volts <= 0) {
      newErrors.volts = 'Volts must be greater than 0';
    }
    if (formData.power <= 0) {
      newErrors.power = 'Power must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    createStation(formData, {
      onSuccess: () => {
        setFormData(initialFormState);
        setErrors({});
        reset();
        onClose();
      },
    });
  };

  const handleClose = () => {
    setFormData(initialFormState);
    setErrors({});
    reset();
    onClose();
  };

  const updateLocation = (field: keyof Location, value: string | { lat: number; lng: number }) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  const updateCoordinates = (field: 'lat' | 'lng', value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: {
          ...prev.location.coordinates,
          [field]: numValue,
        },
      },
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Charging Station</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to create station. Please try again.
          </Alert>
        )}

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Station Name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              error={!!errors.name}
              helperText={errors.name}
              disabled={isPending}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              value={formData.location.address}
              onChange={e => updateLocation('address', e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
              disabled={isPending}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              value={formData.location.city}
              onChange={e => updateLocation('city', e.target.value)}
              error={!!errors.city}
              helperText={errors.city}
              disabled={isPending}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="State"
              value={formData.location.state}
              onChange={e => updateLocation('state', e.target.value)}
              error={!!errors.state}
              helperText={errors.state}
              disabled={isPending}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="ZIP Code"
              value={formData.location.zipCode}
              onChange={e => updateLocation('zipCode', e.target.value)}
              error={!!errors.zipCode}
              helperText={errors.zipCode}
              disabled={isPending}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Latitude"
              type="number"
              value={formData.location.coordinates.lat}
              onChange={e => updateCoordinates('lat', e.target.value)}
              disabled={isPending}
              inputProps={{ step: 'any' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Longitude"
              type="number"
              value={formData.location.coordinates.lng}
              onChange={e => updateCoordinates('lng', e.target.value)}
              disabled={isPending}
              inputProps={{ step: 'any' }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Amps"
              type="number"
              value={formData.amps}
              onChange={e => setFormData(prev => ({ ...prev, amps: parseFloat(e.target.value) || 0 }))}
              error={!!errors.amps}
              helperText={errors.amps}
              disabled={isPending}
              inputProps={{ min: 0, step: 'any' }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Volts"
              type="number"
              value={formData.volts}
              onChange={e => setFormData(prev => ({ ...prev, volts: parseFloat(e.target.value) || 0 }))}
              error={!!errors.volts}
              helperText={errors.volts}
              disabled={isPending}
              inputProps={{ min: 0, step: 'any' }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Power (kW)"
              type="number"
              value={formData.power}
              onChange={e => setFormData(prev => ({ ...prev, power: parseFloat(e.target.value) || 0 }))}
              error={!!errors.power}
              helperText={errors.power}
              disabled={isPending}
              inputProps={{ min: 0, step: 'any' }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isPending}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isPending}
          startIcon={isPending ? <CircularProgress size={20} /> : null}
        >
          {isPending ? 'Adding...' : 'Add Station'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
