import { useQuery } from '@tanstack/react-query';
import { stationService } from '../services/stationService';

export const useStations = () => {
  return useQuery({
    queryKey: ['stations'],
    queryFn: stationService.getAll,
    refetchInterval: 30000,
  });
};

export const useStation = (id: string) => {
  return useQuery({
    queryKey: ['station', id],
    queryFn: () => stationService.getById(id),
    enabled: !!id,
    refetchInterval: 10000,
  });
};
