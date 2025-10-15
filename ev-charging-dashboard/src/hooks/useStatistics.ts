import { useQuery } from '@tanstack/react-query';
import { statisticsService } from '../services/statisticsService';

export const useNetworkStatistics = (period: 'day' | 'week' | 'month' = 'week') => {
  return useQuery({
    queryKey: ['statistics', period],
    queryFn: () => statisticsService.getNetworkStatistics(period),
    refetchInterval: 60000,
  });
};
