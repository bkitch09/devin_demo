import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { troubleshootingService } from '../services/troubleshootingService';
import { ActionRequest } from '../types/troubleshooting';

export const useDiagnostics = (stationId: string) => {
  return useQuery({
    queryKey: ['diagnostics', stationId],
    queryFn: () => troubleshootingService.getDiagnostics(stationId),
    enabled: !!stationId,
    refetchInterval: 15000,
  });
};

export const useTroubleshootingAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: ActionRequest) => troubleshootingService.executeAction(request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['diagnostics', variables.stationId] });
      queryClient.invalidateQueries({ queryKey: ['station', variables.stationId] });
      queryClient.invalidateQueries({ queryKey: ['stations'] });
    },
  });
};
