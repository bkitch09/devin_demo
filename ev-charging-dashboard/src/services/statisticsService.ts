import { api } from './api';
import { NetworkStatistics, StatisticsSummary } from '../types/statistics';

export const statisticsService = {
  getSummary: async (period: 'day' | 'week' | 'month' = 'week'): Promise<StatisticsSummary> => {
    const response = await api.get<StatisticsSummary>('/statistics/summary', {
      params: { period },
    });
    return response.data;
  },

  getNetworkStatistics: async (
    period: 'day' | 'week' | 'month' = 'week'
  ): Promise<NetworkStatistics> => {
    const response = await api.get<NetworkStatistics>('/statistics/network', {
      params: { period },
    });
    return response.data;
  },
};
