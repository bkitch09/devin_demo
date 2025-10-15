export interface StatisticsSummary {
  totalEnergyDispensed: number;
  activeUsers: number;
  activeConsumption: number;
  completedSessions: number;
  inProgressSessions: number;
  averageStationUptime: number;
  period: 'day' | 'week' | 'month';
}

export interface TimeSeriesDataPoint {
  timestamp: string;
  value: number;
}

export interface EnergyStatistics {
  data: TimeSeriesDataPoint[];
  total: number;
  average: number;
  peak: number;
}

export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  userActivity: TimeSeriesDataPoint[];
}

export interface StationUtilization {
  stationId: string;
  stationName: string;
  utilizationRate: number;
  totalSessions: number;
  totalEnergy: number;
}

export interface NetworkStatistics {
  summary: StatisticsSummary;
  energy: EnergyStatistics;
  users: UserStatistics;
  topStations: StationUtilization[];
}

export interface StatisticsFilters {
  startDate: string;
  endDate: string;
  granularity?: 'hour' | 'day' | 'week' | 'month';
}
