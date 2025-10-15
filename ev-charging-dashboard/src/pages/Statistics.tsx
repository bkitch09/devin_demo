import React, { useState } from 'react';
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
} from '@mui/material';
import { useNetworkStatistics } from '../hooks/useStatistics';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { MetricCard } from '../components/statistics/MetricCard';
import { EnergyChart } from '../components/statistics/EnergyChart';
import { UserActivityChart } from '../components/statistics/UserActivityChart';
import { Bolt, People, CheckCircle, Timer } from '@mui/icons-material';
import { formatEnergy } from '../utils/formatters';

export const Statistics: React.FC = () => {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
  const { data: stats, isLoading, error } = useNetworkStatistics(period);

  const handlePeriodChange = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as 'day' | 'week' | 'month');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <Typography variant="h4" gutterBottom>
            Network Statistics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comprehensive analytics and performance metrics
          </Typography>
        </div>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Period</InputLabel>
          <Select value={period} label="Period" onChange={handlePeriodChange}>
            <MenuItem value="day">Today</MenuItem>
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {stats && (
        <>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Total Energy Dispensed"
                value={formatEnergy(stats.summary.totalEnergyDispensed)}
                icon={<Bolt />}
                subtitle={`Peak: ${formatEnergy(stats.energy.peak)}`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Active Users"
                value={stats.summary.activeUsers}
                icon={<People />}
                subtitle={`Total: ${stats.users.totalUsers}`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Completed Sessions"
                value={stats.summary.completedSessions}
                icon={<CheckCircle />}
                subtitle={`In Progress: ${stats.summary.inProgressSessions}`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Average Uptime"
                value={`${stats.summary.averageStationUptime}%`}
                icon={<Timer />}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <EnergyChart data={stats.energy} />
            </Grid>
            <Grid item xs={12} md={6}>
              <UserActivityChart data={stats.users} />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};
