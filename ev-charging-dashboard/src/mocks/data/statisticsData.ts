import {
  NetworkStatistics,
  StatisticsSummary,
  EnergyStatistics,
  UserStatistics,
  StationUtilization,
  TimeSeriesDataPoint,
} from '../../types/statistics';

const generateTimeSeriesData = (
  days: number,
  minValue: number,
  maxValue: number
): TimeSeriesDataPoint[] => {
  const data: TimeSeriesDataPoint[] = [];
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const value = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    data.push({
      timestamp: timestamp.toISOString(),
      value,
    });
  }

  return data;
};

const generateSummary = (period: 'day' | 'week' | 'month'): StatisticsSummary => {
  const multiplier = period === 'day' ? 1 : period === 'week' ? 7 : 30;

  return {
    totalEnergyDispensed: Math.floor(Math.random() * 5000 * multiplier) + 1000 * multiplier,
    activeUsers: Math.floor(Math.random() * 150) + 50,
    activeConsumption: Math.floor(Math.random() * 500) + 100,
    completedSessions: Math.floor(Math.random() * 200 * multiplier) + 50 * multiplier,
    inProgressSessions: Math.floor(Math.random() * 20) + 5,
    averageStationUptime: Math.floor(Math.random() * 10) + 90,
    period,
  };
};

const generateEnergyStatistics = (): EnergyStatistics => {
  const data = generateTimeSeriesData(30, 500, 3000);
  const values = data.map(d => d.value);

  return {
    data,
    total: values.reduce((sum, val) => sum + val, 0),
    average: Math.floor(values.reduce((sum, val) => sum + val, 0) / values.length),
    peak: Math.max(...values),
  };
};

const generateUserStatistics = (): UserStatistics => {
  const userActivity = generateTimeSeriesData(30, 20, 150);

  return {
    totalUsers: Math.floor(Math.random() * 5000) + 1000,
    activeUsers: Math.floor(Math.random() * 150) + 50,
    newUsers: Math.floor(Math.random() * 50) + 10,
    userActivity,
  };
};

const generateStationUtilization = (): StationUtilization[] => {
  const stations: StationUtilization[] = [];

  for (let i = 1; i <= 10; i++) {
    stations.push({
      stationId: `station-${i}`,
      stationName: `Charging Station ${i}`,
      utilizationRate: Math.floor(Math.random() * 40) + 60,
      totalSessions: Math.floor(Math.random() * 500) + 100,
      totalEnergy: Math.floor(Math.random() * 10000) + 2000,
    });
  }

  return stations.sort((a, b) => b.utilizationRate - a.utilizationRate);
};

export const generateNetworkStatistics = (
  period: 'day' | 'week' | 'month' = 'week'
): NetworkStatistics => ({
  summary: generateSummary(period),
  energy: generateEnergyStatistics(),
  users: generateUserStatistics(),
  topStations: generateStationUtilization(),
});

export const mockStatistics = generateNetworkStatistics();
