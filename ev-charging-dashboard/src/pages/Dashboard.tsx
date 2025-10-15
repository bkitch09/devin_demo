import React from 'react';
import { Typography, Box, Grid } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useStations } from '../hooks/useStations';
import { useNetworkStatistics } from '../hooks/useStatistics';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { MetricCard } from '../components/statistics/MetricCard';
import { Bolt, People, EvStation, TrendingUp } from '@mui/icons-material';
import { formatEnergy, formatPower } from '../utils/formatters';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: stations, isLoading: stationsLoading, error: stationsError } = useStations();
  const { data: stats, isLoading: statsLoading, error: statsError } = useNetworkStatistics('day');

  if (stationsLoading || statsLoading) {
    return <LoadingSpinner />;
  }

  if (stationsError || statsError) {
    return <ErrorAlert />;
  }

  const activeStations = stations?.filter(s => s.status === 'in_use').length || 0;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Network Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Energy Today"
            value={formatEnergy(stats?.summary.totalEnergyDispensed || 0)}
            icon={<Bolt />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Users"
            value={stats?.summary.activeUsers || 0}
            icon={<People />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Stations"
            value={activeStations}
            subtitle={`of ${stations?.length || 0} total`}
            icon={<EvStation />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Current Consumption"
            value={formatPower(stats?.summary.activeConsumption || 0)}
            icon={<TrendingUp />}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box
          sx={{
            flex: 1,
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            cursor: 'pointer',
            '&:hover': { bgcolor: 'action.hover' },
          }}
          onClick={() => navigate('/stations')}
        >
          <Typography variant="h6">Station Status</Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage charging stations
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            cursor: 'pointer',
            '&:hover': { bgcolor: 'action.hover' },
          }}
          onClick={() => navigate('/troubleshooting')}
        >
          <Typography variant="h6">Troubleshooting</Typography>
          <Typography variant="body2" color="text.secondary">
            Diagnose and fix station issues
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            cursor: 'pointer',
            '&:hover': { bgcolor: 'action.hover' },
          }}
          onClick={() => navigate('/statistics')}
        >
          <Typography variant="h6">Statistics</Typography>
          <Typography variant="body2" color="text.secondary">
            View detailed analytics
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
