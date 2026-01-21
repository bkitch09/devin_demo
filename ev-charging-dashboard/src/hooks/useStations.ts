import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { stationService } from '../services/stationService';
import { CreateStationRequest } from '../types/station';

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

export const useCreateStation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStationRequest) => stationService.createStation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] });
    },
  });
};
