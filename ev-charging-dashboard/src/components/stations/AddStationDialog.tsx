import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  powerCapacity: 50,
  hardwareVersion: '',
  firmwareVersion: '',
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
    if (!formData.hardwareVersion.trim()) {
      newErrors.hardwareVersion = 'Hardware version is required';
    }
    if (!formData.firmwareVersion.trim()) {
      newErrors.firmwareVersion = 'Firmware version is required';
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
            <FormControl fullWidth disabled={isPending}>
              <InputLabel>Power Capacity</InputLabel>
              <Select
                value={formData.powerCapacity}
                label="Power Capacity"
                onChange={e => setFormData(prev => ({ ...prev, powerCapacity: e.target.value as number }))}
              >
                <MenuItem value={50}>50 kW</MenuItem>
                <MenuItem value={100}>100 kW</MenuItem>
                <MenuItem value={150}>150 kW</MenuItem>
                <MenuItem value={250}>250 kW</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Hardware Version"
              value={formData.hardwareVersion}
              onChange={e => setFormData(prev => ({ ...prev, hardwareVersion: e.target.value }))}
              error={!!errors.hardwareVersion}
              helperText={errors.hardwareVersion}
              disabled={isPending}
              placeholder="e.g., HW-2.5"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Firmware Version"
              value={formData.firmwareVersion}
              onChange={e => setFormData(prev => ({ ...prev, firmwareVersion: e.target.value }))}
              error={!!errors.firmwareVersion}
              helperText={errors.firmwareVersion}
              disabled={isPending}
              placeholder="e.g., FW-3.10"
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
