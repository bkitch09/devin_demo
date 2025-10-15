import { api } from './api';
import { DiagnosticData, ActionRequest, ActionResult } from '../types/troubleshooting';

export const troubleshootingService = {
  getDiagnostics: async (stationId: string): Promise<DiagnosticData> => {
    const response = await api.get<DiagnosticData>(`/stations/${stationId}/diagnostics`);
    return response.data;
  },

  executeAction: async (request: ActionRequest): Promise<ActionResult> => {
    const response = await api.post<ActionResult>(
      `/stations/${request.stationId}/actions`,
      request
    );
    return response.data;
  },
};
