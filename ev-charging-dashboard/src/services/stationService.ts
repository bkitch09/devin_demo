import { api } from './api';
import { Station } from '../types/station';

export const stationService = {
  getAll: async (): Promise<Station[]> => {
    const response = await api.get<Station[]>('/stations');
    return response.data;
  },

  getById: async (id: string): Promise<Station> => {
    const response = await api.get<Station>(`/stations/${id}`);
    return response.data;
  },
};
